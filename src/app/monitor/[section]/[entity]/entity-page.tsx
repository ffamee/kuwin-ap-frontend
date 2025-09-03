"use client";

import { EntityOverview } from "@/types/entity-type";
import EntityCard from "./entity-card";
import EntityTab from "./entity-tab";
import { BuildingOverview } from "@/types/building-type";
import { ConfigOverview } from "@/types/config-type";
import fetcher from "@/lib/fetcher";
import { useState } from "react";

export default function EntityPage({
  section,
  entity,
  data,
}: {
  section: string;
  entity: string;
  data: EntityOverview & {
    buildings: BuildingOverview[] & { configs: ConfigOverview[] };
  };
}) {
  const [sumData, setSumData] = useState({
    totalAP: data.configCount,
    totalAPMaintain: data.maCount,
    totalAPDown: data.downCount,
    totalUser:
      Number(data.c24Count) + Number(data.c5Count) + Number(data.c6Count),
  });
  const fetchSumData = async () => {
    try {
      const res = await fetcher(
        `/entities/count?sec=${section}&entity=${entity}`,
        {
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setSumData({
          totalAP: data.configCount,
          totalAPMaintain: data.maCount,
          totalAPDown: data.downCount,
          totalUser:
            Number(data.c24Count) + Number(data.c5Count) + Number(data.c6Count),
        });
      }
    } catch (error) {
      console.error("Error fetching Entities' Count", error);
    } finally {
      console.log("get sumData done");
    }
  };

  const handleSumData = () => {
    fetchSumData();
    console.log(sumData);
  };

  return (
    <div className="flex flex-col p-4 gap-4 w-full h-full">
      <h1 className="text-left font-bold text-[48px] capitalize">
        {data.name}
      </h1>
      <EntityCard sumData={sumData} />
      <EntityTab
        section={{ sectionId: Number(section), sectionName: "Section" }}
        entity={{ entityId: Number(entity), entityName: data.name }}
        data={data.buildings}
        onSumDataUpdated={handleSumData}
      />
    </div>
  );
}
