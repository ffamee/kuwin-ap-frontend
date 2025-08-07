import { EntityOverview } from "@/types/entity-type";
import EntityCard from "./entity-card";
import EntityTab from "./entity-tab";
import { BuildingOverview } from "@/types/building-type";
import { ConfigOverview } from "@/types/config-type";

export default async function EntityPage({
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
  const sumData = {
    totalAP: data.configCount,
    totalAPMaintain: data.maCount,
    totalAPDown: data.downCount,
    totalUser:
      Number(data.c24Count) + Number(data.c5Count) + Number(data.c6Count),
  };
  //   const sectionName =
  //     section === "1"
  //       ? "Faculty"
  //       : section === "2"
  //       ? "Organization"
  //       : "Dormitory";
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
      />
    </div>
  );
}
