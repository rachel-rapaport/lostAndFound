import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/lib/models/user";
import connect from "@/app/lib/db/mongo";

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    await connect(); // Connect to database

    const { email } = params; // Extract email from dynamic route
    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Query the database for the user
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user data 
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error finding user:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    );
  }
}