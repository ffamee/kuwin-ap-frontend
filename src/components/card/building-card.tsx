"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  ClipboardList,
  MapPin,
  SquarePen,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { BuildingOverview } from "@/types/building-type";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import ApAdding from "../modal/config-adding";
import { DeleteBuilding } from "@/api/building-api";
import DeleteComfirm from "../modal/confirmdelete";
import { ConfigOverview } from "@/types/config-type";

const colorsMap: Record<string, string> = {
  up: "bg-green-500",
  down: "bg-red-500",
  ma: "bg-yellow-500",
  rOff: "bg-cyan-500",
  second: "bg-gray-500",
};

// type entity = {
//   entity: {
//     entityId:string;
//     entityName:string;
//   }
// }

export function BuildingCard({
  entity: { entityId, entityName },
  building,
  configurations = [],
}: {
  entity: { entityId: number; entityName: string };
  building: BuildingOverview;
  configurations: ConfigOverview[];
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleBuildingExpand = () => {
    setExpanded(!expanded);
  };
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Card key={building.id} className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            {building.name}
          </div>
          <div className="flex items-center gap-2 text-center">
            <div className="rounded-2xl bg-muted min-w-16 p-2">
              {configurations.length} APs
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Add AP
            </Button>
            <Link href={`./${entityId}/${building.id}`}>
              <Button size="sm" variant="outline" className="cursor-pointer">
                Full Details
              </Button>
            </Link>
            <DeleteComfirm
              onConfirm={() => DeleteBuilding(building.id)}
              trigger={<Button>Delete</Button>}
            />

            <ApAdding
              modalOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              basicDetails={{ entity: entityName, building: building.name }}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => toggleBuildingExpand()}
              className="cursor-pointer"
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm">
              Online:{" "}
              {building.configCount - building.downCount - building.maCount}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm">Maintain: {building.maCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm">Offline: {building.downCount}</span>
          </div>
        </div>
        <Collapsible open={expanded} className="w-full rounded-md">
          <CollapsibleContent className="transition-[max-height] duration-300 ease-in-out">
            <Separator className="my-4" />
            <div className="w-full flex flex-col">
              <div className="grid grid-cols-10 font-medium mb-2">
                <div className="col-span-3 flex items-center-safe indent-2">
                  Name
                </div>
                <div className="flex items-center-safe justify-center-safe">
                  Status
                </div>
                <div className="col-span-3 flex items-center-safe">
                  Location
                </div>
                <div className="items-center-safe">IP Address</div>
                <div className="flex items-center-safe justify-center-safe">
                  Client
                </div>
              </div>
              <Separator className="mb-2" />
              {configurations.length ? (
                <div className="bg-secondary/40 rounded-lg">
                  {configurations.map((config) => (
                    <div
                      key={config.id}
                      className="grid grid-cols-10 mb-2 space-x-2 hover:bg-muted rounded-lg"
                    >
                      <div
                        className="col-span-3 flex items-center-safe whitespace-normal break-words indent-2"
                        title={config.id.toString()}
                      >
                        {config.id ?? "-"}
                      </div>

                      <div
                        className={"flex items-center-safe justify-center-safe"}
                      >
                        <div
                          className={`rounded-full size-3 ${
                            config.status
                              ? colorsMap[config.status]
                              : "bg-red-950"
                          }`}
                        ></div>
                      </div>

                      <div className="col-span-3 flex items-center-safe">
                        {config.location.name}
                      </div>
                      <div className="flex items-center-safe">
                        {config.ip.ip ?? "-"}
                      </div>
                      <div className="flex items-center-safe justify-center">
                        {Number(config.client24 ?? 0) +
                          Number(config.client5 ?? 0) +
                          Number(config.client6)}
                        <Users size={16} className="mx-2" />
                      </div>
                      <div className="flex items-center-safe justify-evenly">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={`./${entityId}/${building.id}/${config.id}`}
                            >
                              <span className="cursor-pointer">
                                <SquarePen size={16} />
                              </span>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            Edit Access Point
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={`./${entityId}/${building.id}/${config.id}`}
                            >
                              <span className="cursor-pointer">
                                <ClipboardList size={16} />
                              </span>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            Access Point Detail
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-secondary/50 flex items-center-safe justify-center-safe h-24 rounded-lg text-muted-foreground">
                  No Access Points found in this building
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
