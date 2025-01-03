import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import userStore from "./app/store/userStore";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  let isAdmin = false;

  console.log(`Request to: ${pathname}`);

  // Exclude specific routes and Next.js static files
  if (pathname.startsWith("/api/") || pathname.startsWith("/reset-password")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  // If a token exists, verify its validity
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      // If valid and user is on the login page, redirect to home
      if (pathname === "/login") {
        console.log("Valid token, redirecting to /home");
        return NextResponse.redirect(new URL("/home", req.url));
      }

      // Check for admin access
      const decoded = payload as { email: string };
      if (decoded.email === "lostandfound.assistance@gmail.com") {
        isAdmin = true;
      }
    } catch (error) {
      console.error("Invalid token:", error);

      // Clear global store and token on failure
      userStore.getState().clearUser();
      userStore.getState().setAlerts([]);

      // Save the current URL before redirecting to login
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.set("redirectUrl", req.url); // Save the current URL in a cookie
      res.cookies.delete("token");

      return res;
    }
  } else {
    // If no token and not on the login page, redirect to login
    userStore.getState().clearUser();
    userStore.getState().setAlerts([]);

    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.set("redirectUrl", req.url); // Save the current URL in a cookie
    return res;
  }

  if (pathname === "/login" && token) {
    console.log("Token exists, redirecting to /home");
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Restrict access to admin-only pages
  if (pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.json(
      { message: "Access Denied - Admin only" },
      { status: 403 }
    );
  }

  return NextResponse.next();
}
