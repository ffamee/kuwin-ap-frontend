"use client";

import React, { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExInteractiveChart } from "@/components/chart/example-interactive-chart";
import ApDetail from "./config-detail";
import ConfigEdit from "@/components/modal/config-edit";
import { ConfigOverview } from "@/types/config-type";

export default function ConfigTab({ data }: { data: ConfigOverview }) {
  const [tab, setTab] = useState<string>("detail");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);

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
          <Button variant="outline" onClick={() => setModalEditOpen(true)}>
            Edit
          </Button>
          <Button variant="outline">Delete</Button>
        </div>
      </div>
      <ConfigEdit
        modalOpen={modalEditOpen}
        onClose={() => setModalEditOpen(false)}
        basicDetails={{
          entity: "",
          building: "",
          model: "",
          serialNumber: "",
          ethMac: "",
          ip: String(data.ip.ip),
          location: String(data.location.name),
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
