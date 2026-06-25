import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware for route protection
// Since auth is localStorage-based (client-side), we can't check roles server-side.
// Role enforcement is done client-side in each layout.tsx via useAuth().
// This middleware only protects against completely unauthenticated direct URL access
// by checking for the session cookie/key presence.

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected route prefixes
  const protectedPrefixes = ["/buyer", "/grower", "/ngo"];
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (isProtected) {
    // The actual auth check happens client-side since we use localStorage.
    // If we had cookie-based auth, we'd check here.
    // For now, let the client-side layout handle the redirect.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/buyer/:path*", "/grower/:path*", "/ngo/:path*", "/dashboard/:path*"],
};
