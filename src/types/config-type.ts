type ConfigOverview = {
  id: number;
  createdAt: Date;
  lastSeenAt: Date;
  mismatchReason: string | null;
  problem: string;
  status: StatusState;
  tx: number;
  rx: number;
  client24: number;
  client5: number;
  client6: number;
  channel1: number;
  channel2: number;
  wlc: string;
  location: Location;
  ip: IPName;
  accesspoint: Accesspoint | null;
};

type Accesspoint = {
  id: number;
  radMac: string;
  ethMac: string;
  name: string;
  model: string;
  ios: string;
  serial: string;
  pic: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
};
type Location = {
  id: number;
  name: string;
  building: { id: number; name: string };
  histories: ConfigOverview[];
};

type IPName = {
  id: number;
  ip: string;
};

//type Status = "UP" | "RADIO_OFF" | "DOWN" | "DOWNLOAD";
enum StatusState {
  Pending = "PENDING", // The initial state when a configuration is created
  Up = "UP",
  Roff = "RADIO_OFF",
  Down = "DOWN", // The access point is not associated to switch
  Download = "DOWNLOAD", // The access point is downloading a firmware
  Maintenance = "MAINTENANCE", // The access point is in maintenance mode
  Mismatch = "MISMATCH", // The access point configuration does not match the current state
}

// const DEFAULT_CONFIG: ConfigOverview = {
//   id: null,
//   createdAt: null,
//   lastSeenAt: null,
//   mismatchReason: null,
//   problem: null,
//   status: StatusState.Pending,
//   tx: null,
//   rx: null,
//   client24: null,
//   client5: null,
//   client6: null,
//   channel1: null,
//   channel2: null,
//   wlc: null,
//   location: {
//     id: null,
//     name: null,
//     building: { id: null, name: null },
//     histories: [],
//   },
//   ip: {
//     id: null,
//     ip: null,
//   },
//   accesspoint: {
//     id: null,
//     radMac: null,
//     ethMac: null,
//     name: null,
//     model: null,
//     ios: null,
//     serial: null,
//     pic: null,
//     owner: null,
//     createdAt: null,
//     updatedAt: null,
//   },
// };
export type { ConfigOverview, StatusState, Accesspoint };
// export { DEFAULT_CONFIG };
