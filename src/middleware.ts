import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import userStore from "./app/store/userStore";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  let isAdmin = false;

  console.log(`Request to: ${pathname}`);

  // Exclude login route and Next.js-specific static files
  if (pathname.startsWith("/api/") || pathname.startsWith("/reset-password")|| pathname.startsWith("foundItems-list")) {
    return NextResponse.next();
  }

  // Tokens from cookies
  const token = req.cookies.get("token")?.value;
  // If token exists and user is trying to access the login page, redirect to home
  if (token && pathname === "/login") {
    try {
      // Verify the token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret); // No need to decode here, just verify
      console.log("Token is valid, redirecting to /home");
      return NextResponse.redirect(new URL("/home", req.url));
    } catch (error) {
      console.error("Token verification failed:", error);
      userStore.getState().clearUser();
    }
  }

  // If token does not exist and user is trying to access a protected page, redirect to login
  if (!token && pathname !== "/login") {
    console.log("No token, redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    try {
      // Verify the token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      const decoded = payload as { email: string };

      // Check if the email matches the admin email
      if (decoded.email === "lostandfound.assistance@gmail.com") {
        isAdmin = true;
      } else {
        // If not admin, redirect to home page, but avoid infinite redirects
        // if (pathname !== "/home") {
        //   return NextResponse.redirect(new URL("/home", req.url));
        // }
      }
    } catch (error) {
      console.error("Invalid token:", error);
      // Redirect to login page if token is invalid
      if (pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  } else {
    // If no token, redirect to login page
    if (pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Restrict access based on the `isAdmin` flag
  if (pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.json(
      { message: "Access Denied - Admin only" },
      { status: 403 }
    );
  }

  // Allow access if valid tokens are present
  return NextResponse.next();
}

// Configuring middleware to specific paths
export const config = {
  matcher: ["/((?!login|_next).*)"], // Exclude "/login" and Next.js static files
};
