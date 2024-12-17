import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadToS3 } from "@/lib/s3";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-js";
import { HttpRequest } from "@aws-sdk/protocol-http";

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

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    } else if (updatedUser.number_usage_left < 0) {
      // Rollback usage if limit is exceeded
      await prisma.user.update({
        where: { email },
        data: {
          number_usage_left: {
            increment: 1,
          },
        },
      });
      return NextResponse.json(
        { error: "Usage limit exceeded" },
        { status: 403 }
      );
    }

    // Prepare the signed request
    const apiGatewayUrl = new URL(process.env.API_GATEWAY_URL || "");
    const requestBody = JSON.stringify({
      job_description: job_description,
      pdf_base64: pdf_base64,
    });

    const signer = new SignatureV4({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
      region: process.env.AWS_REGION || "",
      service: "execute-api", // Important for API Gateway
      sha256: Sha256,
    });

    const httpRequest = new HttpRequest({
      method: "POST",
      hostname: apiGatewayUrl.hostname,
      path: apiGatewayUrl.pathname,
      headers: {
        "Content-Type": "application/json",
        Host: apiGatewayUrl.hostname,
      },
      body: requestBody,
    });

    // Sign the request
    const signedRequest = await signer.sign(httpRequest);

    // Send the signed request
    const lambdaResponse = await fetch(process.env.API_GATEWAY_URL || "", {
      method: "POST",
      headers: signedRequest.headers,
      body: requestBody,
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

      const errorText = await lambdaResponse.text();
      console.error("API Gateway error response:", errorText);

      throw new Error("API Gateway request failed");
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
