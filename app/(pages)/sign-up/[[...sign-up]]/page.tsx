"use client";
import { useEffect } from "react";
import { SignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

export default function Signup() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  // useEffect(() => {
  //   const handleSignup = async () => {
  //     console.log("User:", user);
  //     if (user && isSignedIn) {
  //       console.log("User signed in");
  //       try {
  //         // Extract user details
  //         const { username, emailAddresses } = user;
  //         const email = emailAddresses[0]?.emailAddress;
  //         console.log("User details:", { username, email });
  //         // Make the POST request to save the user
  //         const response = await fetch("/api/users", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             name: username,
  //             email,
  //           }),
  //         });

  //         if (!response.ok) {
  //           throw new Error("Failed to save user details");
  //         }

  //         console.log("User details saved successfully");

  //         // Redirect after successful save
  //         router.push("/");
  //       } catch (error: unknown) {
  //         if (error instanceof Error) {
  //           console.error("Error saving user details:", error.message);
  //         } else {
  //           console.error("An unknown error occurred");
  //         }
  //       }
  //     }
  //   };

  //   handleSignup();
  // }, [user, isSignedIn, router]);

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
