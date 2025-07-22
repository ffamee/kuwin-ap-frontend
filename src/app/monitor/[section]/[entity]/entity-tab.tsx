"use client";

import React from "react";
import { useState } from "react";

// import { SectionTable } from "@/components/table/section-table";
// import { ExAreaChart } from "@/components/chart/example-area-chart";
// import { ExBarChart } from "@/components/chart/example-bar-chart";
//import { ExInteractiveChart } from "@/components/chart/example-interactive-chart";
import { BuildingCard } from "@/components/card/building-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { BuildingOverview } from "@/types/building-type";
import BuildingAdding from "@/components/modal/building-adding";
import EntityEdit from "@/components/modal/entity-edit";

export default function EntityTab({
  buildings,
  accessPoints,
  entity: { entityName, entityId, sectionName },
}: {
  buildings: BuildingOverview[];
  accessPoints: [];
  entity: { entityName: string; entityId: string; sectionName: string };
}) {
  const [tab, setTab] = React.useState<string>("list");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleChange = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTab(value);
    }, 300);
  };
  const [modalAddingOpen, setModalAddingOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);

  return (
    <Tabs value={tab} onValueChange={handleChange} className="w-full space-y-1">
      <div className="flex justify-between">
        <TabsList className="grid w-fit h-fit  grid-cols-2 border">
          <TabsTrigger value="list" className="text-center">
            List
          </TabsTrigger>
          <TabsTrigger value="overview" className="text-center">
            Overview
          </TabsTrigger>
        </TabsList>
        <div className="flex gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => setModalAddingOpen(true)}
              >
                Add
              </Button>
            </TooltipTrigger>
            <TooltipContent>add new building</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={() => setModalEditOpen(true)}>
                Edit
              </Button>
            </TooltipTrigger>
            <TooltipContent>edit this {sectionName} details</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <BuildingAdding
        modalOpen={modalAddingOpen}
        onClose={() => setModalAddingOpen(false)}
        basicDetails={{ section: sectionName, entity: entityName }}
      />
      <EntityEdit
        modalOpen={modalEditOpen}
        onClose={() => setModalEditOpen(false)}
        basicDetails={{
          section: sectionName,
          entityName: entityName,
          entityId: entityId,
        }}
      />
      <div>
        {isLoading ? (
          <Skeleton className="w-full h-52" />
        ) : (
          <div>
            <TabsContent value="overview" className="grid grid-cols-2">
              {/* <ExAreaChart chartData={chartData1} />
              <ExBarChart chartData={chartData2} /> */}
            </TabsContent>
            <TabsContent value="list" className="space-y-1">
              {buildings.map((b: BuildingOverview) => (
                <BuildingCard
                  key={b.id}
                  entity={{ entityId, entityName }}
                  building={b}
                  accessPoints={accessPoints[b.id]}
                />
              ))}
            </TabsContent>
          </div>
        )}
      </div>
    </Tabs>
  );
}
