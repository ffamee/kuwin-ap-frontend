"use client";

import React from "react";
import { useState } from "react";
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
import { EntityOverview } from "@/types/entity-type";

export default function EntityTab({
  data,
  section,
  entity,
}: {
  data: BuildingOverview[];
  section: { sectionId: number; sectionName: string };
  entity: { entityId: number; entityName: string };
}) {
  const [tab, setTab] = useState("list");
  const [isLoading, setIsLoading] = useState(false);
  const [buildings, setBuildings] = useState(data);
  //  const [entityDetails, setEntityDetails] = useState({ section, entity });
  const handleChange = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTab(value);
    }, 300);
  };

  // Changing table
  const [modalAddingOpen, setModalAddingOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const handleAddBuilding = (building: BuildingOverview) => {
    console.log(building);
    setBuildings((prev) => [building, ...prev]);
  };
  const handleEditEntity = (updatedEntity: EntityOverview) => {
    console.log(updatedEntity);
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
            <TooltipContent>
              edit this {section.sectionName} details
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <BuildingAdding
        modalOpen={modalAddingOpen}
        onClose={() => setModalAddingOpen(false)}
        basicDetails={{
          section: section.sectionName,
          entityName: entity.entityName,
          entityId: entity.entityId,
        }}
        onBuildingAdded={handleAddBuilding}
      />
      <EntityEdit
        modalOpen={modalEditOpen}
        onClose={() => setModalEditOpen(false)}
        basicDetails={{
          section: section.sectionName,
          sectionId: section.sectionId,
          entityName: entity.entityName,
          entityId: entity.entityId,
        }}
        onEntityEdited={handleEditEntity}
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
                    entity={entity}
                    building={b}
                    configurations={b.configurations}
                  />
                ))
              ) : (
                <div className="bg-secondary/50 flex items-center-safe justify-center-safe h-40 rounded-lg text-muted-foreground">
                  No Building in this {section.sectionName}
                </div>
              )}
            </TabsContent>
          </div>
        )}
      </div>
    </Tabs>
  );
}
