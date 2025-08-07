import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AccessPoint } from "@/types/ap-type";
import Link from "next/link";
import { Clock, Rss, Users } from "lucide-react";

const colorsMap: Record<string, string> = {
  up: "bg-green-500",
  down: "bg-red-500",
  ma: "bg-yellow-500",
  rOff: "bg-cyan-500",
  second: "bg-gray-500",
};

export default function ApOverviewCard({
  buildingId,
  ap,
}: {
  buildingId: number;
  ap: AccessPoint;
}) {
  return (
    <Card className="w-full max-w-[500px] grid! grid-rows-5! gap-4!">
      <CardHeader className="row-span-2! grid-rows-1!">
        <div className="grid grid-cols-4 space-x-2">
          <div className="col-span-3 space-y-1 w-full whitespace-normal break-words">
            <CardTitle className="text-lg/6 tracking-wider">
              <Link href={`./${buildingId}/${ap.id}`}>{ap.name ?? "-"}</Link>
            </CardTitle>
            <Tooltip>
              <TooltipTrigger asChild className="w-full">
                <CardDescription className="text-sm w-auto max-w-full truncate">
                  {ap.location ?? "-"}
                </CardDescription>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{ap.location ?? "-"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex flex-col items-end-safe pt-2">
            <div
              className={`w-1/2 max-w-10 h-3 rounded-full ${
                colorsMap[ap.status]
              }`}
            ></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="row-span-3">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2">
            <div className="flex flex-col">
              <div className="text-muted-foreground text-xs">IP Address</div>
              <div className="text-md font-medium">{ap.ip}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-muted-foreground text-xs">MAC Address</div>
              <div className="text-md font-medium uppercase">{ap.ethMac}</div>
            </div>
          </div>
          <div className="grid grid-rows-3 space-y-2">
            <div className="flex flex-row gap-2 text-sm items-baseline">
              <Users size={14} />
              <div className="text-muted-foreground align-middle">
                Connected Users:
              </div>
              {Number(ap.numberClient ?? 0) + Number(ap.numberClient_2 ?? 0)}
            </div>
            <div className="flex flex-row gap-2 text-sm items-baseline">
              <Rss size={14} />
              <div className="text-muted-foreground align-middle">Channel:</div>
              {ap.channel} / {ap.channel_2}
            </div>
            <div className="flex flex-row gap-2 text-sm items-baseline">
              <Clock size={14} />
              <div className="text-muted-foreground align-middle">Time:</div>
              {new Date(ap.timestamp2).toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
