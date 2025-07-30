import BuildingPage from "./building-page";
import { notFound } from "next/navigation";

async function getBuildingOverview(
  section: string,
  entity: string,
  building: string
) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/buildings/overview?sec=${section}&entity=${entity}&build=${building}`
  );
  if (res.status === 404) {
    return notFound();
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch building ${building} in entity ${entity}`);
  }
  return await res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ section: string; entity: string; building: string }>;
}) {
  const { section, entity, building } = await params;

  const data = await getBuildingOverview(section, entity, building);

  return (
    <BuildingPage entityId={Number(entity)} buildingId={building} data={data} />
  );
}
