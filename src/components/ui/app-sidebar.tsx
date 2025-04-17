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
} from "./collapsible";
import Link from "next/link";

// This is sample data.
const Pages = {
	title: "Home",
	icon: House,
	url: "#",
};

const Zones = {
	title: "Zones",
	url: "#",
	icon: List,
	isActive: true,
	items: [
		{
			title: "Zone 1",
			url: "#",
		},
		{
			title: "Zone 2",
			url: "#",
		},
		{
			title: "Zone 3",
			url: "#",
		},
		{
			title: "Zone 4",
			url: "#",
		},
		{
			title: "Zone 5",
			url: "#",
		},
		{
			title: "Zone 6",
			url: "#",
		},
	],
};

const Graphs = {
	title: "Graphs",
	icon: ChartArea,
	url: "#",
};

const Others = [
	{
		title: "Settings",
		icon: Settings,
		url: "#",
	},
	{
		title: "Logout",
		icon: LogOut,
		url: "#",
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { open } = useSidebar();
	const [showNav, setShowNav] = React.useState<boolean>(false);
	const hideTimeout = React.useRef<NodeJS.Timeout | null>(null);

	const handleMouseEnter = () => {
		if (hideTimeout.current) {
			clearTimeout(hideTimeout.current); // Clear timeout if mouse re-enters
		}
		hideTimeout.current = setTimeout(() => {
			setShowNav(true); // Hide navigation after delay
		}, 200); // Delay in milliseconds
	};

	const handleMouseLeave = () => {
		if (hideTimeout.current) {
			clearTimeout(hideTimeout.current); // Clear timeout if mouse re-enters
		}
		hideTimeout.current = setTimeout(() => {
			setShowNav(false); // Hide navigation after delay
		}, 200); // Delay in milliseconds
	};

	return (
		<div>
			{showNav && (
				<div
					className="left-10 top-28 absolute rounded-md bg-sidebar-accent text-sidebar-accent-foreground hover:block"
					onMouseLeave={handleMouseLeave}
					onMouseEnter={handleMouseEnter}
				>
					<ul className="flex flex-col p-2">
						{Zones.items?.map((subItem) => (
							<li
								key={subItem.title}
								className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md"
							>
								<Link href={subItem.url} className="block px-4 py-2">
									{subItem.title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
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
								<SidebarMenuButton tooltip={Pages.title}>
									{Pages.icon && <Pages.icon />}
									<span>{Pages.title}</span>
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
										<SidebarMenuButton
											onMouseEnter={handleMouseEnter}
											onMouseLeave={handleMouseLeave}
										>
											{Zones.icon && <Zones.icon />}
											<span>{Zones.title}</span>
											<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{Zones.items?.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton asChild>
														<Link href={subItem.url}>
															<span>{subItem.title}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
							<SidebarMenuItem key={Graphs.title}>
								<SidebarMenuButton tooltip={Graphs.title}>
									{Graphs.icon && <Graphs.icon />}
									<span>{Graphs.title}</span>
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
								{Others.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton tooltip={item.title}>
											{item.icon && <item.icon />}
											<span>{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
		</div>
	);
}
