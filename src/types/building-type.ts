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

type BuildingName = {
	id: number;
	name: string;
};

type BuildingAccessPointName = BuildingName & {
	accesspoints: AccessPointName[];
};

export type { Building, BuildingName, BuildingAccessPointName };
