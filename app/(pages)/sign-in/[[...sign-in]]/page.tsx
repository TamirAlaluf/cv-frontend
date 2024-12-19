import NavBar from "@/components/NavBar";
import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | ResuMate",
  description:
    "Sign in to your ResuMate account to access our AI-powered CV optimization tools.",
  keywords: ["sign in", "login", "ResuMate account", "CV optimization"],
  openGraph: {
    title: "Sign In | ResuMate",
    description:
      "Sign in to your ResuMate account to access our AI-powered CV optimization tools.",
    type: "website",
    url: "https://resumateapp.com/sign-in",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In | ResuMate",
    description:
      "Sign in to your ResuMate account to access our AI-powered CV optimization tools.",
  },
};

export default function Page() {
  return (
    <>
      <NavBar />
      {/* <div className="flex pt-20 h-screen w-full items-center justify-center px-4">
        <LoginForm />
      </div> */}
      <div className="flex pt-20 h-screen w-full items-center justify-center px-4">
        <SignIn />
      </div>
    </>
  );
}
