import { BuildingCard } from "@/components/card/building-card";
import { BuildingOverview } from "@/types/building-type";
import React from "react";

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

  return (
    <div className="flex flex-col p-4 gap-4">
      Entity page : {entity}
      {data.buildings.map((b: BuildingOverview) => (
        <BuildingCard
          key={b.id}
          entityId={entity}
          building={b}
          accessPoints={data.accesspoints[b.id]}
        />
      ))}
    </div>
  );
}
