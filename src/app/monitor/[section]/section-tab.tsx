import React from "react";
import { useState } from "react";

import { SectionTable } from "@/components/table/section-table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { EntityOverview } from "@/types/entity-type";
import { ColumnDef } from "@tanstack/react-table";
import EntityAdding from "@/components/modal/entity-adding";
import { Section } from "@/types/section-type";
import SectionChart from "./section-chart";

export default function SectionTab({
  header,
  data,
  section,
  onAddEntity,
}: {
  header: ColumnDef<EntityOverview>[];
  data: EntityOverview[];
  section: Section;
  onAddEntity: (entity: EntityOverview) => void;
}) {
  const [tab, setTab] = useState<string>("list");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTab(value);
    }, 300);
  };

  const handleAddEntity = (entity: EntityOverview) => {
    console.log(entity);
    onAddEntity(entity);
  };

  return (
    <Tabs
      value={tab}
      onValueChange={handleChange}
      className="w-full space-y-1 h-full"
    >
      <div className="flex justify-between h-auto w-full">
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
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Add
              </Button>
            </TooltipTrigger>
            <TooltipContent>add new entity</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <EntityAdding
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        basicDetails={section}
        onEntityAdded={handleAddEntity}
      />
      <div className="w-full">
        {isLoading ? (
          <Skeleton className="w-full h-52" />
        ) : (
          <div className="w-full">
            <TabsContent value="overview" className="h-[300px]">
              <SectionChart />
            </TabsContent>
            <TabsContent value="list">
              <div className="w-full">
                <SectionTable columns={header} data={data} />
              </div>
            </TabsContent>
          </div>
        )}
      </div>
    </Tabs>
  );
}
