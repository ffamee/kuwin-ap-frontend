import { EntityAccessPointName, EntityName } from "./entity-type";

type Section = {
	id: number;
	name: string;
};

type SectionEntityName = Section & {
	entities: EntityName[];
};

type SectionAccessPointName = Section & {
	entities: EntityAccessPointName[];
};

type SectionOverview = {
	id: number;
	name: string;
	apAll: number;
	apMaintain: number;
	apDown: number;
	totalUser: number;
	user1?: number;
	user2?: number;
};

export type {
	Section,
	SectionAccessPointName,
	SectionEntityName,
	SectionOverview,
};
