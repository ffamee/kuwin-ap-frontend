"use client";

import React from "react";

import { AccessPoint } from "@/types/ap-type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExInteractiveChart } from "@/components/chart/example-interactive-chart";
import ApDetail from "./ap-detail";

export default function ApTab({
  data,
}: {
  data: AccessPoint & {
    building: {
      name: string;
      entity: { name: string; section: { name: string } };
    };
  };
}) {
  const [tab, setTab] = React.useState<string>("detail");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleChange = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTab(value);
    }, 300);
  };
  return (
    <Tabs
      value={tab}
      onValueChange={handleChange}
      className="w-full space-y-1 h-full"
    >
      <div className="flex justify-between">
        <TabsList className="grid w-fit h-fit grid-cols-2 border">
          <TabsTrigger value="detail">Details</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>
        <div className="flex gap-1">
          <Button variant="outline">Edit</Button>
          <Button variant="outline">Delete</Button>
        </div>
      </div>
      <div>
        {isLoading ? (
          <Skeleton className="w-full h-52" />
        ) : (
          <div>
            <TabsContent value="overview">
              <ExInteractiveChart />
            </TabsContent>
            <TabsContent value="detail">
              <ApDetail data={data} />
            </TabsContent>
          </div>
        )}
      </div>
    </Tabs>
  );
}
