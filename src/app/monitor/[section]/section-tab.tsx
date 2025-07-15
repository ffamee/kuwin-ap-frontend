import React from "react";
import { useState } from "react";

import { SectionTable } from "@/components/table/section-table";
// import { ExAreaChart } from "@/components/chart/example-area-chart";
// import { ExBarChart } from "@/components/chart/example-bar-chart";
import { ExInteractiveChart } from "@/components/chart/example-interactive-chart";

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

export default function SectionTab({
  header,
  data,
  name,
}: {
  header: ColumnDef<EntityOverview>[];
  data: EntityOverview[];
  name: string;
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
  const [modalOpen, setModalOpen] = useState(false);

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
        basicDetails={{ section: name }}
      />
      <div>
        {isLoading ? (
          <Skeleton className="w-full h-52" />
        ) : (
          <div>
            <TabsContent value="overview">
              <ExInteractiveChart />
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
