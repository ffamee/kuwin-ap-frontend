import React from "react";

import { SectionTable } from "@/components/table/section-table";
// import { ExAreaChart } from "@/components/chart/example-area-chart";
// import { ExBarChart } from "@/components/chart/example-bar-chart";
import { ExInteractiveChart } from "@/components/chart/example-interactive-chart";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

import { EntityOverview } from "@/types/entity-type";
import { ColumnDef } from "@tanstack/react-table";

export default function SectionTab({
  header,
  data,
}: {
  header: ColumnDef<EntityOverview>[];
  data: EntityOverview[];
}) {
  //console.log(header);
  const [tab, setTab] = React.useState<string>("overview");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleChange = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTab(value);
    }, 1000);
  };

  return (
    <Tabs value={tab} onValueChange={handleChange} className="w-full space-y-1">
      <TabsList className="grid w-fit h-fit  grid-cols-2 border">
        <TabsTrigger value="overview" className="text-center">
          Overview
        </TabsTrigger>
        <TabsTrigger value="list" className="text-center">
          List
        </TabsTrigger>
      </TabsList>
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
