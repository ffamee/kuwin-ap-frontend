type AccessPoint = {
  id: number;
  status: string;
  ip: string;
  radMac: string;
  ethMac: string;
  name: string;
  location: string;
  numberClient: 0;
  numberClient_2: 0;
  rxbs: number;
  txbs: number;
  iqd: number;
  oqd: number;
  channel: number;
  switchIp: string;
  model: string;
  ios: string;
  clMax: number;
  clAvg: number;
  timestamp: Date;
  sumCl: number;
  serial: string;
  picAp: string;
  grpBw: number;
  grpMan: number;
  latitude: number;
  longtitude: number;
  switchPortId: number;
  installTime: Date;
  downtimeStart: Date;
  maId: number;
  jobStatus: string;
  timestamp2: Date;
  crxbs: number;
  ctxbs: number;
  wlc: string;
  problem: string;
  channel_2: number;
  clMax_2: number;
  wlcActive: string;
  eqNumber: string;
};

type AccessPointName = {
  id: number;
  name: string;
};

type AccessPointOverview = {
  id: number;
  name: string;
  status: string;
  ip: string;
  location: string;
  // connectedClients: number;
  numberClient: number;
  numberClients_2: number;
};

type AllApTab = Pick<
  AccessPoint,
  | "id"
  | "name"
  | "status"
  | "ip"
  | "location"
  | "numberClient"
  | "numberClient_2"
  | "wlc"
  | "wlcActive"
> & {
  building: {
    id: number;
    entity: { id: number; section: { id: number } };
  };
};

type DownApTab = Pick<
  AccessPoint,
  "id" | "name" | "status" | "ip" | "location"
> & {
  downtimeStart: Date;
  jobStatus: string;
  building: {
    id: number;
    entity: { id: number; section: { id: number } };
  };
};

export type {
  AccessPoint,
  AccessPointName,
  AccessPointOverview,
  AllApTab,
  DownApTab,
};
