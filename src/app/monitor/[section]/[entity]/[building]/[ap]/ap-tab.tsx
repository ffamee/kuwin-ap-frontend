"use client";

import React, { useState } from "react";

import { AccessPoint } from "@/types/ap-type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExInteractiveChart } from "@/components/chart/example-interactive-chart";
import ApDetail from "./ap-detail";
import ApEdit from "@/components/modal/ap-edit";

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
  const [modalEditOpen, setModalEditOpen] = useState(false);
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
          <Button variant="outline" onClick={() => setModalEditOpen(true)}>
            Edit
          </Button>
          <Button variant="outline">Delete</Button>
        </div>
      </div>
      <ApEdit
        modalOpen={modalEditOpen}
        onClose={() => setModalEditOpen(false)}
        basicDetails={{
          entity: data.building.entity.name,
          building: data.building.name,
          model: data.model,
          serialNumber: data.serial,
          ethMac: data.ethMac,
          ip: data.ip,
          location: data.location,
        }}
      />
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
