"use client";

import * as React from "react";
import {
	ChevronRight,
	House,
	List,
	ChartArea,
	Settings,
	LogOut,
	Hexagon,
	ClipboardList,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from "@/components/ui/sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import Link from "next/link";
import { useLogout } from "@/hooks/use-logout";
import { Zone } from "@/types/zone-type";

// This is sample data.
const Pages = {
	title: "Home",
	icon: House,
	url: "/pro",
};

const Graphs = {
	title: "Graphs",
	icon: ChartArea,
	url: "#",
};

const Report = {
	title: "Report",
	icon: ClipboardList,
	url: "/pro/report",
};

const Setting = {
	title: "Settings",
	icon: Settings,
	url: "#",
};

const Logout = {
	title: "Logout",
	icon: LogOut,
	url: "#",
};

export function AppSidebar({
	zoneList,
	token,
	...props
}: {
	zoneList: Zone[];
	token: string | undefined;
	prop: React.ComponentProps<typeof Sidebar>;
}) {
	const { open } = useSidebar();
	const logout = useLogout();
	const Zones = {
		title: "Zones",
		url: "#",
		icon: List,
		isActive: false,
		items: zoneList.map((zone) => ({
			...zone,
			url: `/pro/${zone.id}`,
		})), // Use the zoneList prop to create the items
	};

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className={open ? "p-0" : "py-2 px-1"}>
				<SidebarMenu>
					<SidebarMenuItem key="logo">
						<SidebarMenuButton
							// tooltip="Logo"
							size="lg"
							disabled={open}
							className={`data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground justify-center items-center
							${open ? "disabled:cursor-not-allowed disabled:opacity-100" : ""}`}
						>
							<span className="font-bold">{open ? "KU AP-MON" : ""}</span>
							<Hexagon className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground" />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="gap-0">
				<SidebarGroup>
					<SidebarGroupLabel className="transition-transform duration-300 group-data-[collapsible=icon]:opacity-100 group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:-ml-1">
						Page
					</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem key={Pages.title}>
							<SidebarMenuButton tooltip={Pages.title} asChild>
								<Link href={Pages.url} className="flex items-center gap-2">
									{Pages.icon && <Pages.icon />}
									<span>{Pages.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<Collapsible
							key={Zones.title}
							asChild
							defaultOpen={Zones.isActive}
							className="group/collapsible"
						>
							<SidebarMenuItem>
								<CollapsibleTrigger asChild>
									<SidebarMenuButton>
										{Zones.icon && <Zones.icon />}
										<span>{Zones.title}</span>
										<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
									</SidebarMenuButton>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<SidebarMenuSub className="h-auto max-h-64 overflow-y-auto no-scrollbar">
										{Zones.items?.map((subItem) => (
											<SidebarMenuSubItem key={subItem.id}>
												<SidebarMenuSubButton asChild>
													<Link href={subItem.url}>
														<span>{subItem.area}</span>
													</Link>
												</SidebarMenuSubButton>
											</SidebarMenuSubItem>
										))}
									</SidebarMenuSub>
								</CollapsibleContent>
							</SidebarMenuItem>
						</Collapsible>
						<SidebarMenuItem key={Graphs.title}>
							<SidebarMenuButton tooltip={Graphs.title} asChild>
								<Link href={Graphs.url} className="flex items-center gap-2">
									{Graphs.icon && <Graphs.icon />}
									<span>{Graphs.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem key={Report.title}>
							<SidebarMenuButton tooltip={Report.title} asChild>
								<Link href={Report.url} className="flex items-center gap-2">
									{Report.icon && <Report.icon />}
									<span>{Report.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel className="transition-transform duration-300 group-data-[collapsible=icon]:opacity-100 group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:-ml-2.5">
						Others
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem key={Setting.title}>
								<SidebarMenuButton tooltip={Setting.title} asChild>
									<Link href={Setting.url} className="flex items-center gap-2">
										{Setting.icon && <Setting.icon />}
										<span>{Setting.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem key={Logout.title}>
								<SidebarMenuButton tooltip={Logout.title} asChild>
									<button
										className="flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-100 cursor-pointer"
										onClick={logout}
										disabled={!token}
									>
										{Logout.icon && <Logout.icon />}
										<span>{Logout.title}</span>
									</button>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
