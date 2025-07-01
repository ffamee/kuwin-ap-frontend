import ApTab from "./ap-tab";
import { notFound } from "next/navigation";

async function getAccessPointDetail(
  section: string,
  entity: string,
  building: string,
  ap: string
) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/accesspoints/detail?sec=${section}&entity=${entity}&build=${building}&ap=${ap}`
  );
  if (res.status === 404) {
    return notFound();
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch access point ${ap}`);
  }
  return await res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{
    section: string;
    entity: string;
    building: string;
    ap: string;
  }>;
}) {
  const { section, entity, building, ap } = await params;

  const data = await getAccessPointDetail(section, entity, building, ap);

  return (
    <div className="p-4 gap-4">
      <h1 className="text-left font-bold text-[48px] capitalize">
        {data.name}
      </h1>
      <ApTab data={data} />
    </div>
  );
}
