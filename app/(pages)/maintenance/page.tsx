import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, PenToolIcon as Tool, CheckCircle } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mr-2" />
            <CardTitle className="text-3xl font-bold text-center">
              We&apos;ll be back soon!
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-xl">
            ResuMate is currently undergoing scheduled maintenance to improve
            our services.
          </p>
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Tool className="h-5 w-5" />
            <p>Estimated downtime: 4 hours</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">What is ResuMate?</h2>
            <p className="text-lg">
              ResuMate optimizes your CV for ATS by adding hidden keywords
              tailored to the job description, increasing your chances of
              passing automated filters.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <p>We&apos;re working hard to get back online!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
