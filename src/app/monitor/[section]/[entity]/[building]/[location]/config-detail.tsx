import { StatusState } from "@/types/config-type";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { CircleAlert, LucideIcon, Wifi, WifiOff } from "lucide-react";
import { ConfigOverview, Accesspoint } from "@/types/config-type";

const colorsMap: Record<StatusState, string> = {
  UP: "bg-green-500",
  DOWN: "bg-red-500",
  MAINTENANCE: "bg-yellow-500",
  RADIO_OFF: "bg-cyan-500",
  PENDING: "bg-gray-500",
  MISMATCH: "bg-black-500",
  DOWNLOAD: "bg-red-300",
};

// const statusMap: Record<StatusState, LucideIcon> = {
//   UP: Wifi,
//   DOWN: WifiOff,
//   MAINTENANCE: CircleAlert,
//   RADIO_OFF: WifiOff,
//   PENDING: CircleAlert,
//   MISMATCH: CircleAlert,
//   DOWNLOAD: WifiOff,
// };

const toMbs = (byte: number) => {
  return byte / (1024 * 1024);
};

export default function ConfigDetail({
  data,
}: {
  data: ConfigOverview & { accesspoint: Accesspoint };
}) {
  //const Icon = statusMap[data.status];

  console.log(data);
  return (
    <div className="grid grid-cols-5 gap-4">
      <Card className="col-span-3">
        <CardTitle className="px-6  text-3xl">Information</CardTitle>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="gap-2">
            <div className="capitalize text-muted-foreground">
              <p className=""> {"Section"}</p>
            </div>
            {"Entity"}
          </div>
          <div>
            <p className="text-muted-foreground">Building</p>
            {data.location.building.name ?? "-"}
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground">Location</p>
            {data.location.name ?? "-"}
          </div>
        </CardContent>
        <CardTitle className="px-6 text-3xl flex gap-6">
          <div>Status</div>
          <div className={`rounded-full ${colorsMap[data.status]} `}>
            {data.status}
          </div>
        </CardTitle>
        <CardContent>
          <div className="grid grid-cols-3">
            {data.status === "UP" ? (
              <div>
                <p className="text-muted-foreground">Connected</p>
                <p>
                  {(data.client24 ?? 0) +
                    (data.client5 ?? 0) +
                    (data.client6 ?? 0)}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground">Problem</p>
                <p>{data.problem ?? "-"}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardTitle className="px-6 text-3xl">Technical Details</CardTitle>
        <CardContent className="grid grid-cols-2 gap-1">
          <p className="text-muted-foreground">IP Address:</p>
          <p>{data.ip.ip ?? "-"}</p>
          <p className="text-muted-foreground">Model:</p>
          {data.accesspoint !== null ? (
            <p>{data.accesspoint.model}</p>
          ) : (
            <p>{"-"}</p>
          )}
          <p className="text-muted-foreground">Firmware:</p>
          {data.accesspoint !== null ? (
            <p>{data.accesspoint.ios}</p>
          ) : (
            <p>{"-"}</p>
          )}
          <p className="text-muted-foreground">Serial Number:</p>
          {data.accesspoint !== null ? (
            <p>{data.accesspoint.serial}</p>
          ) : (
            <p>{"-"}</p>
          )}
          <p className="text-muted-foreground">Radio Mac:</p>
          {data.accesspoint !== null ? (
            <p>{data.accesspoint.radMac}</p>
          ) : (
            <p>{"-"}</p>
          )}
          <p className="text-muted-foreground">Eth Mac:</p>
          {data.accesspoint !== null ? (
            <p>{data.accesspoint.ethMac}</p>
          ) : (
            <p>{"-"}</p>
          )}
          <p className="text-muted-foreground">Equipment Number:</p>
          {data.accesspoint !== null ? (
            <p>{data.accesspoint.owner}</p>
          ) : (
            <p>{"-"}</p>
          )}
        </CardContent>
      </Card>
      <Card className="col-span-5">
        <CardTitle className=" text-3xl px-6">Interface Dot11 Radio</CardTitle>
        <CardContent>
          <div className="grid grid-cols-2 gap-1">
            <p>Channel:</p>
            <p>
              <p>
                {data.channel1 ?? "-"} : {data.channel2 ?? "-"}
              </p>
            </p>
            <p>RX Rate:</p>
            <p>{toMbs(data.rx).toPrecision(5)}</p>
            <p>TX Rate:</p>
            <p>{toMbs(data.tx).toPrecision(5)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
