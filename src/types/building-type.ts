import { AccessPointName } from "./ap-type";

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
	apAll: number;
	apMaintain: number;
	apDown: number;
	user1: number;
	user2: number;
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
