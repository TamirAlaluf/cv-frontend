"use client";
import Demo from "./(components)/Demo";
import FAQ from "./(components)/FAQ";
import Pricing from "./(components)/Pricing";
import Main from "./(components)/Main";
import ProblemSection from "@/app/(pages)/(main page)/(components)/Problem";
import SolutionSection from "@/app/(pages)/(main page)/(components)/Solution";
const LAMBDA_URL =
  process.env.NEXT_PUBLIC_LAMBDA_URL || "http://localhost:4000/";

export default function Home() {
  return (
    <>
      <Main LAMBDA_URL={LAMBDA_URL} />
      <ProblemSection />
      <SolutionSection />
      <Demo />
      <FAQ />
      <Pricing />
    </>
  );
}
