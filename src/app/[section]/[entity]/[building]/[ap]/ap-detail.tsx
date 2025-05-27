import { AccessPoint } from "@/types/ap-type";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const colorsMap: Record<string, string> = {
  up: "bg-green-500",
  down: "bg-red-500",
  ma: "bg-yellow-500",
  rOff: "bg-cyan-500",
  second: "bg-gray-500",
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
          <p className={`${colorsMap[data.status]}`}>{data.status}</p>
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
