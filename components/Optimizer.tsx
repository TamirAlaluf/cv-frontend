import { useState } from "react";

export default function Optimizer({ LAMBDA_URL }: { LAMBDA_URL: string }) {
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Please select a PDF file");
      return;
    }
    if (!jobDescription) {
      setError("Please enter a job description");
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
      link.download = "resume.pdf";
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
    <div className="py-12 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg p-8 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 
                    focus:ring-blue-500 focus:border-blue-500 transition-all
                    text-gray-800 placeholder-gray-400"
            rows={6}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Resume (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2.5 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100 
                    border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-[#1468EF] text-white rounded-md
                  hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed
                  transition-colors duration-200 font-medium shadow-sm"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
              Optimizing...
            </div>
          ) : (
            "Optimize Resume"
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
