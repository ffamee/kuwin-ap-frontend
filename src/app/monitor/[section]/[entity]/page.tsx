import React from "react";
import EntityCard from "./entity-card";
import EntityTab from "./entity-tab";
import { notFound } from "next/navigation";

async function getEntityOverview(section: string, entity: string) {
	const res = await fetch(
		`http://localhost:3001/entities/overview?sec=${section}&entity=${entity}`
	);
	if (res.status === 404) {
		return notFound();
	}
	if (!res.ok) {
		throw new Error(`Failed to fetch entity ${entity} in section ${section}`);
	}
	return await res.json();
}

export default async function Page({
	params,
}: {
	params: Promise<{ section: string; entity: string }>;
}) {
	const { section, entity } = await params;
	const data = await getEntityOverview(section, entity);
	const sumData = {
		totalAP: data.apAll,
		totalAPMaintain: data.apMaintain,
		totalAPDown: data.apDown,
		totalUser: data.totalUser,
	};

	return (
		<div className="flex flex-col p-4 gap-4">
			<h1 className="text-left font-bold text-[48px] capitalize">
				{data.name}
			</h1>
			<EntityCard sumData={sumData} />
			<EntityTab
				buildings={data.buildings}
				accessPoints={data.accesspoints}
				entityId={entity}
			/>
		</div>
	);
}
