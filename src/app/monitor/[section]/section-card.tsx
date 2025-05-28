"use client";

import SummaryCard from "@/components/card/summary-card";
import { CircleAlert, Users, Wifi, WifiOff } from "lucide-react";

export default function SectionCard({
  sumData,
}: {
  sumData: {
    totalAP: number;
    totalAPMaintain: number;
    totalAPDown: number;
    totalUser: number;
  };
}) {
  return (
    <div className="w-full flex flex-row gap-x-4 h-fit p-2">
      <SummaryCard
        title="Total Access Point"
        data={sumData.totalAP}
        Icon={Wifi}
        color="text-green-500"
        description=""
      />

      <SummaryCard
        title="Maintain Access Point"
        data={sumData.totalAPMaintain}
        Icon={CircleAlert}
        color="text-yellow-400"
        description=""
      />

      <SummaryCard
        title="Down Access Point"
        data={sumData.totalAPDown}
        Icon={WifiOff}
        color="text-red-500"
      />

      <SummaryCard
        title="Total Users"
        data={sumData.totalUser ?? 0}
        Icon={Users}
      />
    </div>
  );
}
