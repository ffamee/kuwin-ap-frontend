import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	// Check if the user is authenticated by checking the presence of a cookie
	const isAuthenticated = request.cookies.has("accessToken");

	// If the user is authenticated and trying to access the login page, redirect them to the pro page
	if (isAuthenticated && request.nextUrl.pathname === "/login") {
		return NextResponse.redirect(new URL("/pro", request.url));
	}

	return NextResponse.next();
	// return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/login"],
};
