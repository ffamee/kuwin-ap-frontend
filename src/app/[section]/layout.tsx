import { cookies } from "next/headers";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import DynamicBreadcrumbs from "@/components/breadcrumb/dynamic-breadcrmb";
import { User } from "lucide-react";
import Link from "next/link";
import getToken from "@/lib/token";
import { User as UserData } from "@/types/user-type";
import SearchButton from "@/components/sidebar/search-button";

export async function getServerData() {
	const res = await fetch("http://localhost:3001/section/all", {
		credentials: "include",
		next: { revalidate: 900 },
	});
	if (!res.ok) {
		throw new Error("Failed to fetch data.");
	}
	const serverData = await res.json();
	return serverData;
}

export async function getServerEntities() {
	const [facultyRes, organizationRes, dormitoryRes] = await Promise.all([
		fetch("http://localhost:3001/entities/faculty", {
			credentials: "include",
			next: { revalidate: 900 },
		}),
		fetch("http://localhost:3001/entities/organization", {
			credentials: "include",
			next: { revalidate: 900 },
		}),
		fetch("http://localhost:3001/entities/dormitory", {
			credentials: "include",
			next: { revalidate: 900 },
		}),
	]);
	if (!facultyRes.ok || !organizationRes.ok || !dormitoryRes.ok) {
		throw new Error("Failed to fetch data.");
	}
	const [faculty, organization, dormitory] = await Promise.all([
		facultyRes.json(),
		organizationRes.json(),
		dormitoryRes.json(),
	]);
	return { faculty, organization, dormitory };
}

export default async function SectionLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	{
		const cookieStore = await cookies();
		const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
		const token = await getToken();
		const user: UserData = { id: "", username: "Guest" };
		if (token) {
			const res = await fetch("http://localhost:3001/users/profile", {
				credentials: "include",
				headers: {
					Cookie: `accessToken=${token}`,
				},
			});
			if (res.ok) {
				const data = await res.json();
				user.id = data.id;
				user.username = data.username;
			} else {
				throw new Error("Failed to fetch user data.");
			}
		} else {
			console.log("No token found.");
		}
		const data = await getServerData();
		const entities = await getServerEntities();
		return (
			<SidebarProvider
				defaultOpen={defaultOpen}
				className="flex h-screen w-screen overflow-hidden"
			>
				<AppSidebar prop={{}} token={token} />
				<div className="w-full h-full">
					<header className="flex items-center h-auto justify-between w-full">
						<div className="flex items-center h-auto w-full">
							<SidebarTrigger className="size-12" />
							<Separator
								orientation="vertical"
								className="mr-4 data-[orientation=vertical]:h-6"
							/>
							<DynamicBreadcrumbs data={data} />
						</div>
						<div className="flex items-center h-auto w-auto">
							<SearchButton lists={entities} />
							<Link
								href="/login"
								className="mx-2 flex items-center h-auto gap-2 p-2 border border-accent rounded-md hover:border-accent-foreground hover:bg-accent transition-colors duration-200 ease-in-out"
							>
								<p className="text-foreground">{user.username}</p>
								<User />
							</Link>
						</div>
					</header>
					<Separator className="bg-none" />
					<SidebarInset className="w-[calc(100vw-300px)] min-w-full h-full transition-[width,height] ease-linear overflow-auto no-scrollbar">
						{children}
					</SidebarInset>
				</div>
			</SidebarProvider>
		);
	}
}
