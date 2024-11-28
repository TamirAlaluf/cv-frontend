"use client";
import Demo from "../components/Demo";
import FAQ from "../components/FAQ";
import Pricing from "../components/Pricing";
import Main from "../components/Main";
import Footer from "@/components/Footer";
const LAMBDA_URL = "https://i3wu518pne.execute-api.us-east-1.amazonaws.com/";
// const LAMBDA_URL = "http://localhost:4000/";

export default function Home() {
  return (
    <>
      <Main LAMBDA_URL={LAMBDA_URL} />
      <Demo />
      <FAQ />
      <Pricing />
    </>
  );
}
