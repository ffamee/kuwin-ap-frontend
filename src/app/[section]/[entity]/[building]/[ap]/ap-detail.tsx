import { AccessPoint } from "@/types/ap-type";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CircleAlert, LucideIcon, Wifi, WifiOff } from "lucide-react";

const colorsMap: Record<string, string> = {
  up: "text-green-500",
  down: "text-red-500",
  ma: "text-yellow-500",
  rOff: "text-cyan-500",
  second: "text-gray-500",
};

const statusMap: Record<string, LucideIcon> = {
  up: Wifi,
  down: WifiOff,
  ma: CircleAlert,
  rOff: WifiOff,
  second: CircleAlert,
};

export default function ApDetail({
  data,
}: {
  data: AccessPoint & {
    building: {
      name: string;
      entity: { name: string; section: { name: string } };
    };
  };
}) {
  console.log(statusMap);
  const Icon = statusMap[data.status];
  return (
    <div className="grid grid-cols-5 gap-4">
      <Card className="col-span-3">
        <CardTitle className="px-6  text-3xl">Information</CardTitle>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="gap-2">
            <div className="capitalize text-muted-foreground">
              <p className=""> {data.building.entity.section.name}</p>
            </div>
            {data.building.entity.name}
          </div>
          <div>
            <p className="text-muted-foreground">Building</p>
            {data.building.name}
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground">Location</p>
            {data.location}
          </div>
        </CardContent>
        <CardTitle className="px-6 text-3xl flex gap-6">
          <div>Status</div>
          <div className={`${colorsMap[data.status]}`}>
            <Icon />
          </div>
        </CardTitle>
        <CardContent>
          <div className="grid grid-cols-3">
            {data.status === "up" ? (
              <div>
                <p className="text-muted-foreground">Connected</p>
                <p>{data.numberClient}</p>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground">Problem</p>
                <p>{data.problem}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardTitle className="px-6 text-3xl">Technical Details</CardTitle>
        <CardContent className="grid grid-cols-2 gap-1">
          <p className="text-muted-foreground">IP Address:</p>
          <p>{data.ip}</p>
          <p className="text-muted-foreground">Wireless Controller:</p>
          <p>{data.wlcActive}</p>
          <p className="text-muted-foreground">Model:</p>
          <p>{data.model}</p>
          <p className="text-muted-foreground">Firmware:</p>
          <p>{data.ios}</p>
          <p className="text-muted-foreground">Serial Number:</p>
          <p>{data.serial}</p>
          <p className="text-muted-foreground">Radio Mac:</p>
          <p>{data.radMac}</p>
          <p className="text-muted-foreground">Eth Mac:</p>
          <p>{data.ethMac}</p>
          <p className="text-muted-foreground">Equipment Number:</p>
          <p>{data.eqNumber}</p>
        </CardContent>
      </Card>
      <Card className="col-span-5">
        <CardTitle className=" text-3xl px-6">Interface Dot11 Radio</CardTitle>
        <CardContent>
          <div className="grid grid-cols-2 gap-1">
            <p>Channel:</p>
            <p>
              {data.channel}:{data.channel_2}
            </p>
            <p>RX Rate:</p>
            <p>{data.rxbs}</p>
            <p>TX Rate:</p>
            <p>{data.txbs}</p>
            <p>IQD:</p>
            <p>{data.iqd}</p>
            <p>OQD:</p>
            <p>{data.oqd}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
