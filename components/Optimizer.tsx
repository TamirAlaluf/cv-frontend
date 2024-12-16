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
import { saveAs } from "file-saver";

const countTokens = (text: string): number => {
  // Count all non-whitespace characters
  return text.replace(/\s/g, "").length;
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

  const handleValidate = () => {
    if (countTokens(jobDescription) > 4000) {
      setError("Job description must be 4000 characters or less");
      return false;
    }

    if (usageLeft === 0) {
      setError("You have reached the limit of usage. Please upgrade.");
      return false;
    }

    if (!selectedFile) {
      setError("Please select a PDF file");
      return false;
    }

    if (!jobDescription) {
      setError("Please enter a job description");
      return false;
    }

    return true;
  };

  const pdfToBase64 = (pdf: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(pdf);
    });
  };

  const handleSubmit = async () => {
    if (!handleValidate()) return;
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
      const base64 = await pdfToBase64(selectedFile as File);

      // Send directly to Lambda
      const response = await fetch("/api/optimize-resume", {
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
      const data = await response.json();
      console.log(data);

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
      // saveAs(pdfBlob, `${outputFileName.trim() || "optimized_resume"}.pdf`);

      const downloadUrl = URL.createObjectURL(pdfBlob);
      console.log(downloadUrl);
      const link = document.createElement("a");
      link.style.display = "none"; // Hide the link
      link.href = downloadUrl;
      link.download = `${outputFileName.trim() || "optimized_resume"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
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
            {countTokens(jobDescription)}/4000 characters
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
