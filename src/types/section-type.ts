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

export type { Section, SectionAccessPointName, SectionEntityName };
