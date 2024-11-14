"use client";

import { useState } from "react";
import Login from "../components/Login";
import Signup from "./components/Signup";
import NavBar from "../components/NavBar";
import Demo from "../components/Demo";
import FAQ from "../components/FAQ";
import Pricing from "../components/Pricing";
import Main from "../components/Main";
// const LAMBDA_URL = 'https://i3wu518pne.execute-api.us-east-1.amazonaws.com/'
const LAMBDA_URL = "http://localhost:4000/";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  if (!true) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto p-8 flex flex-col items-center justify-center min-h-screen">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Resume Optimizer
            </h1>
            <p className="text-gray-600">
              Upload your resume and job description to get a tailored match
            </p>
          </div>

          {showLogin ? <Login /> : <Signup />}

          <button
            onClick={() => setShowLogin(!showLogin)}
            className="mt-4 text-gray-600 hover:text-gray-800"
          >
            {showLogin
              ? "Need an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <NavBar />
      <Main LAMBDA_URL={LAMBDA_URL} />
      <Demo />
      <FAQ />
      <Pricing />
    </>
  );
}
