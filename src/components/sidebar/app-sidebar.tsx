"use client";

import * as React from "react";
import {
	House,
	Settings,
	LogOut,
	Hexagon,
	ClipboardList,
	University,
	BriefcaseBusiness,
	Hotel,
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
	useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useLogout } from "@/hooks/use-logout";

// This is sample data.
const home = {
	title: "Home",
	icon: House,
	url: "/",
};

const sections = [
	{
		title: "Faculty",
		icon: University,
		url: "/monitor/faculty",
	},
	{
		title: "Organization",
		icon: BriefcaseBusiness,
		url: "/monitor/organization",
	},
	{
		title: "Dormitory",
		icon: Hotel,
		url: "/monitor/dormitory",
	},
];

const report = {
	title: "Report",
	icon: ClipboardList,
	url: "/report",
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
	token,
	...props
}: {
	token: string | undefined;
	prop: React.ComponentProps<typeof Sidebar>;
}) {
	const { open } = useSidebar();
	const logout = useLogout();

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
						<SidebarMenuItem key={home.title}>
							<SidebarMenuButton tooltip={home.title} asChild>
								<Link href={home.url} className="flex items-center gap-2">
									{home.icon && <home.icon />}
									<span>{home.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						{sections.map((section) => (
							<SidebarMenuItem key={section.title}>
								<SidebarMenuButton tooltip={section.title} asChild>
									<Link href={section.url} className="flex items-center gap-2">
										{section.icon && <section.icon />}
										<span>{section.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
						<SidebarMenuItem key={report.title}>
							<SidebarMenuButton tooltip={report.title} asChild>
								<Link href={report.url} className="flex items-center gap-2">
									{report.icon && <report.icon />}
									<span>{report.title}</span>
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
