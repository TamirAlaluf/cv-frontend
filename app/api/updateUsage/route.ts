import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Handle POST request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Update the usage count in the database
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

    return NextResponse.json(
      {
        message: "Usage updated successfully",
        remainingUsage: updatedUser.number_usage_left,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating usage:", error);
    return NextResponse.json(
      { error: "Failed to update usage" },
      { status: 500 }
    );
  }
}
