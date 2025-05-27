import { error } from "console";

export default async function Page({
  params,
}: {
  params: Promise<{ ap: string }>;
}) {
  const { ap } = await params;
  const apData = await fetch(`http://localhost:3001/accesspoints/${ap}`)
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error at fetching access point data :", error);
      throw new Error("failed to fetching access point data");
    });
  console.log(apData);
  return (
    <div>
      <h1 className="text-left font-bold text-[48px] capitalize">
        {apData.name}
      </h1>
    </div>
  );
}
