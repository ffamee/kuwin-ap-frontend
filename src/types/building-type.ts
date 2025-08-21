import { AccessPointName } from "./ap-type";
import { ConfigOverview } from "./config-type";

type Building = {
  id: number;
  // idF: 1,
  // idZ: 5,
  name: string;
  // pic: "pictureBuilding1",
  comment?: string;
  // latitude: "13.84656",
  // longtitude: "100.56914",
  // codeId: 1
};

type BuildingOverview = {
  id: number;
  name: string;
  configCount: number;
  maCount: number;
  downCount: number;
  c24Count: number;
  c5Count: number;
  c6Count: number;
  inactive: number;
  configurations: ConfigOverview[];
};

type BuildingName = {
  id: number;
  name: string;
};

type BuildingAccessPointName = BuildingName & {
  accesspoints: AccessPointName[];
};

export type {
  Building,
  BuildingName,
  BuildingAccessPointName,
  BuildingOverview,
};
