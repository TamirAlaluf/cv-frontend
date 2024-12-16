import { NextRequest, NextResponse } from "next/server";

// Handle POST request
export async function POST(req: NextRequest) {
  console.log("optimize-resume POST request");
  try {
    const body = await req.json();
    const { job_description, pdf_base64 } = body;
    if (!job_description || !pdf_base64) {
      return NextResponse.json(
        { error: "Job description and PDF are required" },
        { status: 400 }
      );
    }
    const LAMBDA_URL =
      process.env.NEXT_PUBLIC_LAMBDA_URL || "http://localhost:4000/";
    const lambdaResponse = await fetch(LAMBDA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job_description: job_description,
        pdf_base64: pdf_base64,
      }),
    });
    if (!lambdaResponse.ok) {
      throw new Error("Lambda request failed");
    }
    const data = await lambdaResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error optimizing resume:", error);
    return NextResponse.json(
      { error: "Failed to optimize resume" },
      { status: 500 }
    );
  }
}
