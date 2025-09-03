"use client";

import React, { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExInteractiveChart } from "@/components/chart/example-interactive-chart";
import ConfigDetail from "./config-detail";
import ConfigEdit from "@/components/modal/config-edit";
import { ConfigOverview } from "@/types/config-type";
import { useAuth } from "@/context/auth-context";

export default function ConfigTab({ data }: { data: ConfigOverview }) {
  const [tab, setTab] = useState<string>("detail");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const { isLogin } = useAuth();

  const isConfigInactive = false;

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
        <TabsList className="grid w-fit h-fit grid-cols-3 border">
          <TabsTrigger value="detail" disabled={isConfigInactive}>
            Details
          </TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        {isLogin && (
          <div className="flex gap-1">
            <Button variant="outline" onClick={() => setModalEditOpen(true)}>
              Edit
            </Button>
            <Button variant="outline">Delete</Button>
          </div>
        )}
      </div>
      <ConfigEdit
        modalOpen={modalEditOpen}
        onClose={() => setModalEditOpen(false)}
        basicDetails={{
          building: data.location.building.name,
          buildingId: data.location.building.id,
          ip: data.ip.ip,
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
              <ConfigDetail data={data} />
            </TabsContent>
          </div>
        )}
      </div>
    </Tabs>
  );
}
