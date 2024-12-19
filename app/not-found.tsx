import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileSearch, Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <FileSearch className="w-24 h-24 text-primary mb-8" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Oops! It seems this page is as elusive as the perfect job. Let&apos;s
        get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/sign-up">
            Sign Up <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <p className="mt-12 text-center text-muted-foreground max-w-lg">
        Remember, every setback is a setup for a comeback. Let ResuMate help you
        optimize your CV and land your dream job!
      </p>
    </div>
  );
}
