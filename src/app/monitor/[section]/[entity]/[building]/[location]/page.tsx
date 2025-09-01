import fetcher from "@/lib/fetcher";
import ConfigTab from "./config-tab";
import { notFound } from "next/navigation";

async function getConfigurationDetail(
  section: number,
  entity: number,
  building: number,
  location: number
) {
  const res = await fetcher(
    `/configurations/detail?sec=${section}&entity=${entity}&build=${building}&loc=${location}`
  );
  if (res.status === 404) {
    return notFound();
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch access point ${location}`);
  }
  return await res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{
    section: number;
    entity: number;
    building: number;
    location: number;
  }>;
}) {
  const { section, entity, building, location } = await params;

  const sectionId = Number(section),
    entityId = Number(entity),
    buildingId = Number(building),
    locationId = Number(location);

  if (
    isNaN(sectionId) ||
    isNaN(entityId) ||
    isNaN(buildingId) ||
    isNaN(locationId) ||
    sectionId <= 0 ||
    entityId <= 0 ||
    buildingId <= 0 ||
    locationId <= 0
  )
    throw new Error(
      "sectionId, entityId , buildingId, or locationId is not a valid number"
    );

  const data = await getConfigurationDetail(
    section,
    entity,
    building,
    location
  );

  return (
    <div className="p-4 gap-4">
      <h1 className="text-left font-bold text-[48px] capitalize">
        {data.name}
      </h1>
      <ConfigTab data={data} />
    </div>
  );
}
