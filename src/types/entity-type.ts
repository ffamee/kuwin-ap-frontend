import { Section } from "./section-type";
import {
	Building,
	BuildingAccessPointName,
	BuildingName,
} from "./building-type";

// 1. Pick เอาเฉพาะ id กับ name
// type BuildingSummary = Pick<Building, "id" | "name">;

// 2. Omit ไม่เอา createdAt
// type BuildingWithoutCreated = Omit<Building, "createdAt">;

type Entity = {
	id: number;
	name: string;
	// numAp: number;
	// numCl: number;
	// clAvg: number;
	// clMax: number;
	// timestamp: string;
	// sumCl: number;
	// zone: number;
	// url: string;
	// coordinate: string;
	// style: string;
	// pic: string;
	// secId: number;
};

type EntityOverview = {
	id: number;
	name: string;
	apAll: number;
	apMaintain: number;
	apDown: number;
	// totalUser: number;
	user1: number;
	user2: number;
};

type EntityName = Pick<Entity, "id" | "name">;

type EntityWithBuildings = Entity & {
	buildings?: Building[];
};

type EntityFull = Entity & {
	sections?: Section[];
	buildings?: Building[];
};

type EntityBuildingName = Entity & {
	buildings: BuildingName[];
};

type EntityAccessPointName = EntityName & {
	buildings: BuildingAccessPointName[];
};

export type {
	Entity,
	EntityName,
	EntityWithBuildings,
	EntityBuildingName,
	EntityFull,
	EntityAccessPointName,
	EntityOverview,
};
