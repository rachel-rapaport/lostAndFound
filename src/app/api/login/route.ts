import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connect from "@/app/lib/db/mongo";
import UserModel from "@/app/lib/models/user";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export async function POST(request: NextRequest) {
  console.log('in api/login before');
  
  // Add CORS headers
  const origin = request.headers.get("origin");
  const allowedOrigins = [baseUrl]; 
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

  // Check if token exists in cookies (the user might already be logged in)
  const token = request.cookies.get("token");

  if (token) {
    try {
      // Token already exists, so skip login flow
      return NextResponse.json({
        message: "User already logged in",
      });
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }
  }

  // continue with login if no token is found
  const { email, password } = await request.json();

  await connect();

  // Check if the user exists in the database
  const user = await UserModel.findOne({ email });

  if (user) {
    if (email === user.email && password === user.password) {
      const token = jwt.sign(
        { email, id: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      // Set the token in a cookie
      const headers = new Headers();
      headers.append(
        "Set-Cookie",
        `token=${token}; path=/; HttpOnly; Secure; SameSite=None`
      );
console.log("in api.login success");

      return NextResponse.json(
        { message: "Login successful", token },
        { headers }
      );
    } else {
      console.log('in api/login invalid credentilas');

      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } else {
    console.log('in api/login user not exist');

    return NextResponse.json(
      { message: "User does not exist" },
      { status: 404 }
    );
  }
}
