"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload } from "lucide-react";

const countTokens = (text: string): number => {
  // Rough approximation of GPT tokenization
  // 1. Split on whitespace and punctuation
  // 2. Count each piece as a token
  // 3. For longer words, estimate additional tokens (every ~4 characters)
  const pieces = text
    .toLowerCase()
    .split(/[\s,.!?;:()\[\]{}'"\/\\|<>+=\-~`@#$%^&*]+/)
    .filter(Boolean);

  let tokenCount = 0;
  for (const piece of pieces) {
    // Count basic token
    tokenCount += 1;
    // Add extra tokens for longer words (every 4 characters after the first 4)
    if (piece.length > 4) {
      tokenCount += Math.floor((piece.length - 1) / 4);
    }
  }
  return tokenCount;
};

export default function ResumeOptimizer({
  LAMBDA_URL = "",
}: {
  LAMBDA_URL?: string;
}) {
  const clerk = useClerk();
  const { user } = useUser();
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [usageLeft, setUsageLeft] = useState<number | null>(null);
  const [outputFileName, setOutputFileName] = useState("optimized_resume");

  useEffect(() => {
    const fetchUsageLeft = async () => {
      if (user?.emailAddresses?.[0]?.emailAddress) {
        try {
          const response = await fetch(
            `/api/users?email=${user?.emailAddresses?.[0]?.emailAddress}`
          );
          if (response.ok) {
            const userData = await response.json();
            setUsageLeft(userData?.number_usage_left ?? 0);
          }
        } catch (error) {
          console.error("Failed to fetch usage count:", error);
        }
      }
    };

    fetchUsageLeft();
  }, [user?.emailAddresses?.[0]?.emailAddress]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    setError(null);
  };

  const handleSubmit = async () => {
    const tokens = countTokens(jobDescription);
    if (tokens > 2000) {
      setError("Job description must be 2000 tokens or less");
      return;
    }

    // throw new Error("Failed to optimize resume"); // shut down the server
    if (usageLeft === 0) {
      setError("You have reached the limit of usage. Please upgrade.");
      return;
    }
    if (!selectedFile) {
      setError("Please select a PDF file");
      return;
    }
    if (!jobDescription) {
      setError("Please enter a job description");
      return;
    }
    if (!user) {
      setIsLoading(true);
      // Simulate a brief loading state
      setTimeout(() => {
        // Redirect to sign-in page
        clerk.redirectToSignIn();
      }, 1000); // 1 second delay
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Convert PDF to base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String.split(",")[1]);
        };
        reader.readAsDataURL(selectedFile);
      });

      // Send directly to Lambda
      const response = await fetch(LAMBDA_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_description: jobDescription,
          pdf_base64: base64,
        }),
      });

      if (!response.ok) throw new Error("Failed to optimize resume");

      const data = await response.json();

      // Convert base64 back to PDF and download
      const pdfContent = atob(data.pdf_base64);
      const pdfBlob = new Blob(
        [
          new Uint8Array(
            pdfContent.split("").map((char) => char.charCodeAt(0))
          ),
        ],
        { type: "application/pdf" }
      );
      const downloadUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${outputFileName.trim() || "optimized_resume"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      await fetch("/api/updateUsage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.emailAddresses?.[0]?.emailAddress,
        }),
      });
      setUsageLeft((prev) => (prev ? prev - 1 : 0));
    } catch (err) {
      setError("Failed to optimize resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900 dark:to-cyan-900">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-blue-700 dark:text-blue-300">
          Resume Optimizer
        </CardTitle>
        {user?.username && (
          <div className="text-sm text-blue-600 dark:text-blue-300">
            Hello {user.username}, you have {usageLeft ?? "..."} optimizations
            left.
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="job-description"
            className="text-blue-700 dark:text-blue-300"
          >
            Job Description
          </Label>
          <Textarea
            id="job-description"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            className="resize-none bg-white/50 dark:bg-blue-800/50 border-blue-200 dark:border-blue-700 focus:border-blue-400 dark:focus:border-blue-500"
          />
          <div className="text-sm text-blue-600 dark:text-blue-300">
            {countTokens(jobDescription)}/2000 tokens
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="resume-upload"
            className="text-blue-700 dark:text-blue-300"
          >
            Upload Resume (PDF)
          </Label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-grow">
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
              <div className="flex items-center justify-between px-4 py-2 border border-blue-200 dark:border-blue-700 rounded-md bg-white/50 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300">
                <span className="truncate">
                  {selectedFile ? selectedFile.name : "Choose a PDF file"}
                </span>
                <Upload className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="output-filename"
            className="text-blue-700 dark:text-blue-300"
          >
            Output File Name
          </Label>
          <Input
            id="output-filename"
            type="text"
            value={outputFileName}
            onChange={(e) => setOutputFileName(e.target.value)}
            placeholder="Enter output file name"
            className="bg-white/50 dark:bg-blue-800/50 border-blue-200 dark:border-blue-700 focus:border-blue-400 dark:focus:border-blue-500"
          />
        </div>
        {error && (
          <Alert
            variant="destructive"
            className="bg-red-100 dark:bg-red-900 border-red-200 dark:border-red-700"
          >
            <AlertDescription className="text-red-700 dark:text-red-300">
              {error}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={isLoading || !jobDescription || !selectedFile}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Optimizing...
            </>
          ) : (
            "Optimize Resume"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
