import ConfigTab from "./config-tab";
import { notFound } from "next/navigation";

async function getConfigurationDetail(
  section: number,
  entity: number,
  building: number,
  location: number
) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/configurations/detail?sec=${section}&entity=${entity}&build=${building}&loc=${location}`
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
  //console.log(sectionId, entityId, buildingId, locationId);
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
