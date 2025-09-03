import SummaryCard from "@/components/card/summary-card";
import { CircleAlert, Users, Wifi, WifiOff } from "lucide-react";

export default function BuildingCard({
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
    <div className="grid grid-cols-4 gap-4">
      <SummaryCard
        title="Total Access Points"
        data={sumData.totalAP}
        Icon={Wifi}
        color="text-green-500"
        description="some description"
      />
      <SummaryCard
        title="Maintain Access Points"
        data={sumData.totalAPMaintain}
        Icon={CircleAlert}
        color="text-yellow-400"
        description="some description"
      />
      <SummaryCard
        title="Down Access Points"
        data={sumData.totalAPDown}
        Icon={WifiOff}
        color="text-red-500"
      />
      <SummaryCard
        title="Total Users"
        data={sumData.totalUser}
        Icon={Users}
        description="some description"
      />
    </div>
  );
}
