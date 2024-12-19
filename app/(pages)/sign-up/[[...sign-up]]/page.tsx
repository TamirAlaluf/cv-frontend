import { SignUp } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | ResuMate",
  description:
    "Create your ResuMate account to start optimizing your CV with AI technology.",
  keywords: ["sign up", "register", "create account", "ResuMate registration"],
  openGraph: {
    title: "Sign Up | ResuMate",
    description:
      "Create your ResuMate account to start optimizing your CV with AI technology.",
    type: "website",
    url: "https://resumateapp.com/sign-up",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up | ResuMate",
    description:
      "Create your ResuMate account to start optimizing your CV with AI technology.",
  },
};

export default function Signup() {
  return (
    <>
      <NavBar />
      <div className="flex pt-40 pb-20 h-screen w-full items-center justify-center px-4">
        {/* Disable automatic redirection */}
        <SignUp fallbackRedirectUrl="/" />
      </div>
    </>
  );
}
