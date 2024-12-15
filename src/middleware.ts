import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  console.log("in middleware");

  const { pathname } = req.nextUrl;
  let isAdmin = false;

  console.log(`Request to: ${pathname}`);

  // Exclude login route and Next.js-specific static files
  if (pathname === "/login" || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  console.log("before token");
  
  // Tokens from cookies
  const token = req.cookies.get("token")?.value;
  console.log("before is token");
  
  if (token) {
    console.log("there is a token");
    
    try {
      // Verify the token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      const decoded = payload as { email: string };
      console.log("decoded-------",decoded);

      // Check if the email matches the admin email
      if (decoded.email === "lostandfound.assistance@gmail.com") {
        isAdmin = true;
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  // Redirect to login if no token is present
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
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
