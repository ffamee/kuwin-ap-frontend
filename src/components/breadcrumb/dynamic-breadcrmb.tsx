"use client";

import { useSearchParams } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { EntityAccessPointName } from "@/types/entity-type";

export default function DynamicBreadcrumbs({
	entities,
}: {
	entities: {
		[key: string]: EntityAccessPointName[] | undefined;
	};
}) {
	const sec = useSearchParams().get("sec");
	const ent = useSearchParams().get("entity");
	const build = useSearchParams().get("build");
	const ap = useSearchParams().get("ap");
	const entity = ent
		? entities?.[`${sec}`]?.find((e) => e.id.toString() === ent)
		: undefined;
	const building = build
		? entity?.buildings?.find((b) => b.id.toString() === build)
		: undefined;
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{sec && (
					<div key={sec[0]} className="flex space-x-2 text-base">
						<BreadcrumbItem className="h-full flex">
							{ent ? (
								<BreadcrumbLink
									href={`/monitor?sec=${sec}`}
									className="capitalize text-md flex items-center h-full"
								>
									{sec}
								</BreadcrumbLink>
							) : (
								<BreadcrumbPage className="font-bold capitalize">
									{sec}
								</BreadcrumbPage>
							)}
						</BreadcrumbItem>
						{ent && <BreadcrumbSeparator className="pt-1.5" />}
					</div>
				)}
				{ent && entity && (
					<div key={ent} className="flex space-x-2 text-base">
						<BreadcrumbItem className="h-full flex">
							{build ? (
								<BreadcrumbLink
									href={`/monitor?sec=${sec}&entity=${ent}`}
									className="capitalize text-md flex items-center h-full"
								>
									{entity?.name}
								</BreadcrumbLink>
							) : (
								<BreadcrumbPage className="font-bold capitalize">
									{entity?.name}
								</BreadcrumbPage>
							)}
						</BreadcrumbItem>
						{build && <BreadcrumbSeparator className="pt-1.5" />}
					</div>
				)}
				{build && building && (
					<div key={build[0]} className="flex space-x-2 text-base">
						<BreadcrumbItem className="h-full flex">
							{ap ? (
								<BreadcrumbLink
									href={`/monitor?sec=${sec}&entity=${ent}&build=${build}`}
									className="capitalize text-md flex items-center h-full"
								>
									{building.name}
								</BreadcrumbLink>
							) : (
								<BreadcrumbPage className="font-bold capitalize">
									{building.name}
								</BreadcrumbPage>
							)}
						</BreadcrumbItem>
						{ap && <BreadcrumbSeparator className="pt-1.5" />}
					</div>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
