import React from "react";

import { notFound } from "next/navigation";
import EntityPage from "./entity-page";
import fetcher from "@/lib/fetcher";

async function getEntityOverview(section: string, entity: string) {
  const res = await fetcher(
    `/entities/overview?sec=${section}&entity=${entity}`
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

  return <EntityPage data={data} section={section} entity={entity} />;
}
