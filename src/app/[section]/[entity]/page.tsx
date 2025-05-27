import { BuildingCard } from "@/components/card/building-card";
import { BuildingOverview } from "@/types/building-type";
import React from "react";
import EntityCard from "./entity-card";
import EntityTab from "./entity-tab";

export default async function Page({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  const { entity } = await params;
  const data = await fetch(`http://localhost:3001/entities/overview/${entity}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching entity data:", error);
      throw new Error("Failed to fetch entity data");
    });
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
