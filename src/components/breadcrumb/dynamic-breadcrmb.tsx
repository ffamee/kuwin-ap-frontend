"use client";

import { usePathname } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";

export default function DynamicBreadcrumbs() {
	const pathname = usePathname();
	const pathSegments = pathname.split("/").filter((segment) => segment !== "");

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{pathSegments.map((segment, index) => {
					const isLastSegment = index === pathSegments.length - 1;
					const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
					return (
						<div key={url} className="flex space-x-2 text-base">
							<BreadcrumbItem className="h-full flex">
								{!isLastSegment ? (
									<BreadcrumbLink
										href={url}
										className="capitalize text-md flex items-center h-full"
									>
										{segment}
									</BreadcrumbLink>
								) : (
									<BreadcrumbPage className="font-bold">
										{segment}
									</BreadcrumbPage>
								)}
							</BreadcrumbItem>
							{!isLastSegment && <BreadcrumbSeparator className="pt-1.5" />}
						</div>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
