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
				console.log("Failed to fetch user data.", res);
			}
		} else {
			console.log("No token found.");
		}
		const entities = await fetch("http://localhost:3001/entities", {
			credentials: "include",
			next: { revalidate: 900 },
		}).then((res) => {
			if (!res.ok) {
				throw new Error("Failed to fetch entities.");
			}
			return res.json();
		});
		// console.log("Entities: ", entities);
		return (
			<SidebarProvider
				defaultOpen={defaultOpen}
				className="flex h-screen w-screen"
			>
				<AppSidebar prop={{}} token={token} />
				<div className="w-full h-full flex flex-col">
					<header className="flex items-center-safe h-auto justify-between w-full sticky top-0 z-10">
						<div className="flex items-center h-auto w-full">
							<SidebarTrigger className="size-12" />
							<Separator
								orientation="vertical"
								className="mr-4 data-[orientation=vertical]:h-6"
							/>
							<DynamicBreadcrumbs />
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
					<SidebarInset className="w-[calc(100vw-300px)] min-w-full h-full min-h-0 transition-[width,height] ease-linear overflow-auto no-scrollbar">
						{children}
					</SidebarInset>
				</div>
			</SidebarProvider>
		);
	}
}
