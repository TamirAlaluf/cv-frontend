import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadToS3 } from "@/lib/s3";

export async function POST(req: NextRequest) {
  console.log("optimize-resume POST request");
  try {
    const body = await req.json();
    const { job_description, pdf_base64, email } = body;
    // Validate inputs
    if (!job_description || !pdf_base64 || !email) {
      return NextResponse.json(
        { error: "Job description, PDF, and email are required" },
        { status: 400 }
      );
    }

    // First, update usage
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        number_usage_left: {
          decrement: 1,
        },
      },
    });

    // Check if user has reached their usage limit
    if (updatedUser.number_usage_left < 0) {
      return NextResponse.json(
        { error: "Usage limit exceeded" },
        { status: 403 }
      );
    }

    // Proceed with Lambda optimization
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
      // Rollback usage if Lambda fails
      await prisma.user.update({
        where: { email },
        data: {
          number_usage_left: {
            increment: 1,
          },
        },
      });
      throw new Error("Lambda request failed");
    }

    const data = await lambdaResponse.json();
    // Upload optimized PDF to S3
    const s3Result = await uploadToS3(data.pdf_base64, email);
    return NextResponse.json({
      ...data,
      remainingUsage: updatedUser.number_usage_left,
    });
  } catch (error) {
    console.error("Error optimizing resume:", error);
    return NextResponse.json(
      { error: "Failed to optimize resume" },
      { status: 500 }
    );
  }
}
