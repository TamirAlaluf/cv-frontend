import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, interested, tier } = await request.json();

    console.log("Feedback request:", { email, interested, tier });
    // Validate required fields
    if (typeof interested !== "boolean") {
      return NextResponse.json(
        { error: "Interest status is required and must be a boolean" },
        { status: 400 }
      );
    }

    //check if user already submitted feedback with the same tier
    const existingFeedback = await prisma.feedback.findFirst({
      where: { email: email?.trim() || null, tier: tier },
    });

    if (existingFeedback) {
      return NextResponse.json(
        { error: "Feedback already submitted for this tier" },
        { status: 409 }
      );
    }

    // Create feedback entry
    const feedback = await prisma.feedback.create({
      data: {
        interested,
        email: email?.trim() || null,
        tier,
      },
    });

    return NextResponse.json({ success: true, feedback }, { status: 201 });
  } catch (error) {
    console.error("Error saving feedback:", error);

    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}
