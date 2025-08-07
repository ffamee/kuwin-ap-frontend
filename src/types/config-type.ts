import { AccessPointName } from "./ap-type";

type ConfigOverview = {
  id: number;
  createdAt: Date;
  lastSeenAt: Date;
  state: StatusState;
  tx: number;
  rx: number;
  client24: number;
  client5: number;
  client6: number;
  status: Status;
  location: LocationName;
  ip: IPName;
  accesspoint: AccessPointName;
};

type LocationName = {
  id: number;
  name: string;
};

type IPName = {
  id: number;
  ip: string;
};

//type State = "PENDING" | "ACTIVE" | "MISMATCH" | "MAINTENANCE";
type Status = "UP" | "RADIO_OFF" | "DOWN" | "DOWNLOAD";
enum StatusState {
  Pending = "PENDING", // The initial state when a configuration is created
  Up = "UP",
  Roff = "RADIO_OFF",
  Down = "DOWN", // The access point is not associated to switch
  Download = "DOWNLOAD", // The access point is downloading a firmware
  Maintenance = "MAINTENANCE", // The access point is in maintenance mode
  Mismatch = "MISMATCH", // The access point configuration does not match the current state
}

export type { ConfigOverview, StatusState };
