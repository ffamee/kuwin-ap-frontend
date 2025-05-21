import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	// Check if the user is authenticated by checking the presence of a cookie
	const isAuthenticated = request.cookies.has("accessToken");

	// If the user is authenticated and trying to access the login page, redirect them to the pro page
	if (isAuthenticated && request.nextUrl.pathname === "/login") {
		return NextResponse.redirect(new URL("/", request.url));
	}

	// If the user use old URL, redirect them to the new URL
	if (
		request.nextUrl.pathname === "/monitor" &&
		request.nextUrl.searchParams.has("sec")
	) {
		const url = new URL(request.url);
		if (request.nextUrl.searchParams.has("entity")) {
			const raw = request.nextUrl.searchParams.get("entity");
			if (raw && raw.includes("/")) {
				const [entity, build] = raw.split("/", 2);
				url.searchParams.delete("entity");
				if (entity) {
					url.searchParams.set("entity", entity);
				}
				if (build) {
					url.searchParams.set("build", build);
				}
				return NextResponse.redirect(url);
			}
		} else {
			const raw = request.nextUrl.searchParams.get("sec");
			if (raw && raw.includes("/")) {
				const [sec, entity, build] = raw.split("/");
				url.searchParams.delete("sec");
				if (sec) {
					url.searchParams.set("sec", sec);
				}
				if (entity) {
					url.searchParams.set("entity", entity);
				}
				if (build) {
					url.searchParams.set("build", build);
				}
				return NextResponse.redirect(url);
			}
		}
	}

	return NextResponse.next();
	// return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/login", "/monitor/:path*"],
};
