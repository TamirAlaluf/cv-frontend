import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, interested } = await request.json();

    console.log("Feedback request:", { email, interested });
    // Validate required fields
    if (typeof interested !== "boolean") {
      return NextResponse.json(
        { error: "Interest status is required and must be a boolean" },
        { status: 400 }
      );
    }

    // Create feedback entry
    const feedback = await prisma.feedback.create({
      data: {
        interested,
        email: email?.trim() || null,
      },
    });

    console.log("Feedback created:", feedback);
    return NextResponse.json({ success: true, feedback }, { status: 201 });
  } catch (error) {
    console.error("Error saving feedback:", error);

    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}
