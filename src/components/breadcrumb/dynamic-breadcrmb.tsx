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
					if (segment === "pro") segment = "Home";
					// else => format the segment to be more readable
					return (
						<BreadcrumbItem key={url}>
							{!isLastSegment ? (
								<BreadcrumbLink href={url} asChild>
									{segment}
								</BreadcrumbLink>
							) : (
								<BreadcrumbPage className="font-bold">{segment}</BreadcrumbPage>
							)}
							{!isLastSegment && <BreadcrumbSeparator />}
						</BreadcrumbItem>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
