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
  configCount: number; // apAll
  maCount: number; // apMaintain
  downCount: number; // apDown
  totaluser: number; // totalUser
  c24Count: number;
  c5Count: number;
  c6Count: number;
};

export type {
  Section,
  SectionAccessPointName,
  SectionEntityName,
  SectionOverview,
};
