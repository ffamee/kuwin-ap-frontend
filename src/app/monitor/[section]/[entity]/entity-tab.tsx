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
  data,
  accessPoints,
  entity: { entityName, entityId, sectionName },
}: {
  data: BuildingOverview[];
  accessPoints: [];
  entity: { entityName: string; entityId: number; sectionName: string };
}) {
  const [tab, setTab] = useState("list");
  const [isLoading, setIsLoading] = useState(false);
  const [buildings, setBuildings] = useState(data);
  const handleChange = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTab(value);
    }, 300);
  };
  const [modalAddingOpen, setModalAddingOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const handleAddBuilding = (building: BuildingOverview) => {
    setBuildings((prev) => [building, ...prev]);
  };

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
        basicDetails={{
          section: sectionName,
          entityName: entityName,
          entityId: entityId,
        }}
        onBuildingAdded={handleAddBuilding}
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
              {buildings.length ? (
                buildings.map((b: BuildingOverview) => (
                  <BuildingCard
                    key={b.id}
                    entity={{ entityId, entityName }}
                    building={b}
                    accessPoints={accessPoints[b.id]}
                  />
                ))
              ) : (
                <div className="bg-secondary/50 flex items-center-safe justify-center-safe h-40 rounded-lg text-muted-foreground">
                  No Building in this {sectionName}
                </div>
              )}
            </TabsContent>
          </div>
        )}
      </div>
    </Tabs>
  );
}
