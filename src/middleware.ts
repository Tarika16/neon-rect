import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Public routes — no auth needed
    const publicRoutes = ["/", "/login", "/signup"];
    if (publicRoutes.includes(pathname) || pathname.startsWith("/api/")) {
        return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    // Not logged in → redirect to login
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Logged in but not approved → show pending page
    if (!token.isApproved && pathname !== "/pending-approval") {
        return NextResponse.redirect(new URL("/pending-approval", req.url));
    }

    // Approved but trying to access pending page
    if (token.isApproved && pathname === "/pending-approval") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Admin routes protection
    if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
