import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    console.log("Email:", email);
    if (email) {
      // Find single user by username
      const user = await prisma.user.findUnique({
        where: { email },
      });
      console.log("User:", user);
      return NextResponse.json(user);
    }

    // Existing code for fetching all users
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.log("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Body:", body);
    const { name: username, email: email_addresses } = body.data;
    console.log("Username:", username);

    const user = await prisma.user.create({
      data: { name: username, email: email_addresses },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
