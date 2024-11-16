"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";

export default function NavBar() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md fixed w-full top-0 z-50 bg-white">
      <Link href="/#main">
        <div className="text-xl">ResuMate</div>
      </Link>
      <div className="space-x-4">
        <Link
          href="/#demo"
          className="px-4 py-2 hover:text-gray-200 transition-colors"
        >
          Demo
        </Link>
        <Link
          href="/#faq"
          className="px-4 py-2 hover:text-gray-200 transition-colors"
        >
          FAQ
        </Link>
        <Link
          href="/#pricing"
          className="px-4 py-2 hover:text-gray-200 transition-colors"
        >
          Pricing
        </Link>
        {!isSignedIn && (
          <Link
            href="/sign-in"
            className="inline-flex items-center px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-opacity-80 transition-colors"
          >
            Login
          </Link>
        )}
        {isSignedIn && (
          <button
            onClick={() => signOut()}
            className="inline-flex items-center px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-opacity-80 transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
