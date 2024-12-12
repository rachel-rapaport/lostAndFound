// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const protocol = request.headers.get("x-forwarded-proto") || "http";
  const host = request.headers.get("host");
  const vercelUrl = `${protocol}://${host}`;

  // Store vercelUrl in globalThis for the current request lifecycle
  globalThis.vercelUrl = vercelUrl;

  return NextResponse.next();
}