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
import { ConfigOverview, StatusState } from "@/types/config-type";
import { DeleteConfig } from "@/api/config-api";
import Confirmation from "../modal/confirmation";
import ConfigEdit from "../modal/config-edit";
import { useAuth } from "@/context/auth-context";

const colorsMap: Record<StatusState, string> = {
  UP: "bg-green-500",
  DOWN: "bg-red-500",
  MAINTENANCE: "bg-yellow-500",
  RADIO_OFF: "bg-cyan-500",
  MISMATCH: "bg-gray-500",
  DOWNLOAD: "bg-red-500",
  PENDING: "bg-gray-500",
};

export function BuildingCard({
  //  sectionId,
  entity: { entityId, entityName },
  building,
  configurations = [],
  onBuildingDeleted,
  onConfigDeleted,
  onConfigAdded,
}: {
  //sectionId: number;
  entity: { entityId: number; entityName: string };
  building: BuildingOverview;
  configurations: ConfigOverview[];
  onBuildingDeleted: (buildingId: number) => void;
  onConfigDeleted: (configId: number) => void;
  onConfigAdded: (config: ConfigOverview, buildingId: number) => void;
}) {
  // Expand control
  const [expanded, setExpanded] = useState(false);
  const toggleBuildingExpand = () => {
    setExpanded(!expanded);
  };

  // Modal Control
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfigEditOpen, setModalConfigEditOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { isLogin } = useAuth();

  // Delete Building Part
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const handleDeleteBuilding = async (buildingId: number) => {
    const res = await DeleteBuilding(buildingId, "");
    console.log(res);
    if (res.statusCode === 409) {
      setDeleteId(buildingId);
      setOpenConfirmation(true);
    } else {
      onBuildingDeleted(buildingId);
      setDeleteId(null);
    }
    return;
  };
  const handleConfirm = async () => {
    if (!deleteId) return;
    const res = await DeleteBuilding(deleteId, "?confirm=true");
    console.log(res);
    onBuildingDeleted(deleteId);
    setDeleteId(null);
  };

  // Edit Config Part
  const [editConfigData, setEditConfigData] = useState({
    building: "",
    buildingId: building.id,
    ip: "",
  });

  // console.log(building);

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
            {isLogin && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setModalOpen(true);
                }}
                className="cursor-pointer"
              >
                Add AP
              </Button>
            )}
            <Link href={`./${entityId}/${building.id}`}>
              <Button size="sm" variant="outline" className="cursor-pointer">
                Full Details
              </Button>
            </Link>
            {isLogin && (
              <DeleteComfirm
                onConfirm={() => {
                  setDeleteId(building.id);
                  handleDeleteBuilding(building.id);
                }}
                trigger={<Button className="cursor-pointer">Delete</Button>}
              />
            )}

            <ApAdding
              modalOpen={modalOpen}
              onClose={() => {
                setModalOpen(false);
              }}
              basicDetails={{
                entity: entityName,
                building: building.name,
                buildingId: building.id,
              }}
              onConfigAdded={onConfigAdded}
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
              {(building.configCount ?? 0) -
                (building.downCount ?? 0) -
                (building.maCount ?? 0)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm">Maintain: {building.maCount ?? 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm">Offline: {building.downCount ?? 0}</span>
          </div>
        </div>
        <Collapsible open={expanded} className="w-full rounded-md">
          <CollapsibleContent className="transition-[max-height] duration-300 ease-in-out">
            <Separator className="my-4" />
            <div className="w-full flex flex-col">
              <div className="grid grid-cols-10 font-medium mb-2">
                <div className="flex items-center-safe indent-2">Id</div>
                <div className="col-span-2 flex items-center-safe">AP Name</div>
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
                {isLogin && (
                  <div className="flex items-center-safe justify-center-safe">
                    Action
                  </div>
                )}
              </div>
              <Separator className="mb-2" />
              {configurations.length ? (
                <div className="bg-secondary/40 rounded-lg">
                  {configurations.map((config) => (
                    <div
                      key={config.location.name}
                      className="grid grid-cols-10 mb-2 space-x-2 hover:bg-muted rounded-lg"
                    >
                      <div
                        className="flex items-center-safe whitespace-normal break-words indent-2"
                        title={config.id.toString()}
                      >
                        {config.location.id ?? "-"}
                      </div>
                      <div className="col-span-2 flex items-center-safe">
                        <Link
                          href={`./${entityId}/${building.id}/${config.location.id}`}
                        >
                          {config.accesspoint?.name ?? "-"}
                        </Link>
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
                          Number(config.client6 ?? 0)}
                        <Users size={16} className="mx-2" />
                      </div>
                      {isLogin && (
                        <div className="flex items-center-safe justify-evenly">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-pointer">
                                <SquarePen
                                  size={16}
                                  onClick={() => {
                                    setEditConfigData({
                                      building: building.name,
                                      buildingId: building.id,
                                      ip: config.ip.ip,
                                    });
                                    setModalConfigEditOpen(true);
                                  }}
                                />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              Edit Access Point
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={`./${entityId}/${building.id}/${config.location.id}`}
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
                          <ConfigEdit
                            modalOpen={modalConfigEditOpen}
                            onClose={() => setModalConfigEditOpen(false)}
                            basicDetails={editConfigData}
                          />
                          <DeleteComfirm
                            onConfirm={() => {
                              //handleDeleteConfig(config.id);
                              DeleteConfig(config.id, "");
                              onConfigDeleted(config.id);
                            }}
                            tooltip="Delete This Config"
                          />
                        </div>
                      )}
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
        <Confirmation
          open={openConfirmation}
          onOpenChange={setOpenConfirmation}
          onConfirm={handleConfirm}
          title="Are you sure to delete?"
          message="This Building already has access point"
        />
      </CardContent>
    </Card>
  );
}
