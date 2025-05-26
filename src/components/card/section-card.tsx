"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SummaryCard({
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
    <div className="w-full flex flex-row gap-x-4 h-fit m-2 p-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Total Access Point</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{sumData.totalAP}</p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Total AP Maintain</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{sumData.totalAPMaintain}</p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Total AP Down</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{sumData.totalAPDown}</p>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Total User</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{sumData.totalUser}</p>
        </CardContent>
      </Card>
    </div>
  );
}
