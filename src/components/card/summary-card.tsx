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
    <div className="flex flex-row gap-x-4 w-full h-fit">
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
