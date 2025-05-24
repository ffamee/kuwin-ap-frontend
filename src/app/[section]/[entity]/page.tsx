import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  const { entity } = await params;
  const building = await fetch(
    `http://localhost:3001/buildings/${entity}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch data for entity page: ${entity}`);
    }
    return res.json();
  });
  console.log(building);
  return (
    <div>
      Entity page : {entity}
      {building}
    </div>
  );
}
