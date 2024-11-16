"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";

export default function NavBar() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md fixed w-full top-0 z-50 bg-white">
      {/* Logo */}
      <Link href="/#main">
        <div className="text-xl">ResuMate</div>
      </Link>

      {/* Hamburger Menu Icon */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="block md:hidden focus:outline-none"
      >
        <span className="sr-only">Toggle menu</span>
        <div className="space-y-2">
          <span className="block w-8 h-1 bg-gray-800"></span>
          <span className="block w-8 h-1 bg-gray-800"></span>
          <span className="block w-8 h-1 bg-gray-800"></span>
        </div>
      </button>

      {/* Links */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-white md:static md:flex md:items-center md:space-x-4 md:w-auto`}
      >
        <Link
          href="/#demo"
          className="block px-4 py-2 hover:text-gray-800 transition-colors md:inline"
        >
          Demo
        </Link>
        <Link
          href="/#faq"
          className="block px-4 py-2 hover:text-gray-800 transition-colors md:inline"
        >
          FAQ
        </Link>
        <Link
          href="/#pricing"
          className="block px-4 py-2 hover:text-gray-800 transition-colors md:inline"
        >
          Pricing
        </Link>
        {!isSignedIn && (
          <Link
            href="/sign-in"
            className="block px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-opacity-80 transition-colors md:inline"
          >
            Login
          </Link>
        )}
        {isSignedIn && (
          <button
            onClick={() => signOut()}
            className="block px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-opacity-80 transition-colors md:inline"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
