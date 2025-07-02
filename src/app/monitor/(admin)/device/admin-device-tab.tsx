"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import AdminAllDeviceTable from "./admin-device-all-table";
import AdminDownDeviceTable from "./admin-device-down-table";

export default function AdminDeviceTabs() {
  const [tab, setTab] = React.useState<string>("all");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleChange = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTab(value);
    }, 300);
  };

  return (
    <Tabs value={tab} onValueChange={handleChange} className="w-full space-y-1">
      <TabsList className="grid w-fit h-fit grid-cols-2 border">
        <TabsTrigger value="all">All Access Point</TabsTrigger>
        <TabsTrigger value="down">Down Access Point</TabsTrigger>
      </TabsList>
      <div className="">
        {isLoading ? (
          <Skeleton className="w-full min-h-96 h-1/2" />
        ) : (
          <div>
            <TabsContent value="all">
              <AdminAllDeviceTable />
            </TabsContent>
            <TabsContent value="down">
              <AdminDownDeviceTable />
            </TabsContent>
          </div>
        )}
      </div>
    </Tabs>
  );
}
