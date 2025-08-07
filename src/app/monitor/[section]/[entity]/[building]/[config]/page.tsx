import ConfigTab from "./config-tab";
import { notFound } from "next/navigation";

async function getConfigurationDetail(
  section: string,
  entity: string,
  building: string,
  config: string
) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/configurations/detail?sec=${section}&entity=${entity}&build=${building}&config=${config}`
  );
  if (res.status === 404) {
    return notFound();
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch access point ${config}`);
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
    config: string;
  }>;
}) {
  const { section, entity, building, config } = await params;

  const data = await getConfigurationDetail(section, entity, building, config);
  console.log(data);

  return (
    <div className="p-4 gap-4">
      <h1 className="text-left font-bold text-[48px] capitalize">
        {data.name}
      </h1>
      <ConfigTab data={data} />
    </div>
  );
}
