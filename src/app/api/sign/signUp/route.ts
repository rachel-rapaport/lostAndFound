import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connect from "@/app/lib/db/mongo";
import UserModel from "@/app/lib/models/user";
import axios from "axios";
// import { createUser } from "@/app/services/userService";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
// const vercelUrl = "https://lost-and-found-sage.vercel.app"; // הכתובת ב-Vercel (שנה לפי הצורך)

export async function POST(request: NextRequest) {
  const vercelUrl = globalThis.vercelUrl
  

  // Add CORS headers
  const origin = request.headers.get("origin");
  const allowedOrigins = [baseUrl, vercelUrl];  // הוספתי את Vercel כ-Origin מותר
  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { message: "Origin not allowed" },
      { status: 403 }
    );
  }

  // Handle preflight requests for CORS
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }
  try {
    const { fullName, email, password, phone } = await request.json();
    console.log("in sign up ");
    console.log("Payload being sent:", {
      fullName,
      email,
      password,
      phone,
    });

    await connect();
    console.log("in sign up api");

    const existingUser = await UserModel.findOne({ email });
    console.log(existingUser, "existuser");

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      ); 
    }

    const response = await axios.post(`${baseUrl}/api/user`, {
      fullName,
      email,
      password,
      phone,
    });
    console.log(response);

    const token = jwt.sign({ email, password }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `token=${token}; path=/; HttpOnly: Secure; SameSite=None;`
    );

    return NextResponse.json(
      { message: "Signup successful", token },
      { headers }
    );
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
