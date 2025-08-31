import { redirect } from "next/navigation";

const baseUrl =
	typeof window === "undefined"
		? process.env.BACKEND_URL
		: process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function fetcher(url: string, options: RequestInit = {}) {
	// console.log("fetch to ", `${baseUrl}${url}`);
	const response = await fetch(`${baseUrl}${url}`, options);
	if (response.status === 401) {
		const refresh = await fetch(`${baseUrl}/auth/refresh`, {
			method: "GET",
			credentials: "include",
		});
		if (refresh.ok) {
			// try fetch again
			return await fetch(`${baseUrl}${url}`, options);
		} else redirect("/login?cause=unauthorized");
	}
	return response;
}
// ) {
// 	if (type === "server") {
// 		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
// 		("use server");
// 		const { cookies } = await import("next/headers");
// 		const cookie = (await cookies()).toString();
// 		// const accessToken = cookieStore.get("accessToken")?.value;
// 		const response = await fetch(`${baseUrl}${url}`, {
// 			...options,
// 			headers: { ...options.headers, Cookie: cookie },
// 		});
// 		if (response.status === 401) {
// 			// const refreshToken = cookieStore.get("refreshToken")?.value;
// 			const refresh = await fetch(`${baseUrl}/auth/refresh`, {
// 				method: "GET",
// 				credentials: "include",
// 				headers: { Cookie: cookie },
// 			});
// 			console.log("server:", refresh.status);
// 			if (refresh.ok) {
// 				// try fetch again
// 				const newCookie = (await cookies()).toString();
// 				console.log("refresh success");
// 				return await fetch(`${baseUrl}${url}`, {
// 					...options,
// 					headers: { ...options.headers, Cookie: newCookie },
// 				});
// 			} else redirect("/login?cause=unauthorized");
// 		}
// 		return response;
// 	} else {
// 		const response = await fetch(`${baseUrl}${url}`, options);
// 		if (response.status === 401) {
// 			const refresh = await fetch(`${baseUrl}/auth/refresh`, {
// 				method: "GET",
// 				credentials: "include",
// 			});
// 			console.log("client:", refresh.status);
// 			if (refresh.ok) {
// 				// try fetch again
// 				console.log("refresh success");
// 				return await fetch(`${baseUrl}${url}`, options);
// 			} else redirect("/login?cause=unauthorized");
// 		}
// 		return response;
// 	}
// }
