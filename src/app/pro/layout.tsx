import { cookies } from "next/headers";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import DynamicBreadcrumbs from "@/components/breadcrumb/dynamic-breadcrmb";

export default async function ProLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = await cookies();
	const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

	return (
		<SidebarProvider
			defaultOpen={defaultOpen}
			className="flex h-screen w-screen overflow-hidden"
		>
			<AppSidebar />
			<div className="w-full h-full">
				<header className="flex items-center h-auto">
					<SidebarTrigger className="size-12" />
					<Separator
						orientation="vertical"
						className="mr-4 data-[orientation=vertical]:h-6"
					/>
					<DynamicBreadcrumbs />
				</header>
				<Separator className="mb-4" />
				<SidebarInset className="w-full h-full transition-[width,height] ease-linear overflow-auto no-scrollbar">
					{children}
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
