"use client";

import * as React from "react";

import ReportSelect from "@/components/select/report-select";
import { ReportAction } from "./report-action";
import { Section } from "@/types/section-type";
import { EntityName } from "@/types/entity-type";
import { BuildingName } from "@/types/building-type";
import { AccessPointName } from "@/types/ap-type";

type SectionEntity = {
  [id: string]: Section & {
    entities: EntityName[];
  };
};
type EntityBuilding = {
  [id: string]: EntityName & {
    buildings: BuildingName[];
  };
};

const ReportForm = ({
  sections,
  entities,
  buildings,
  prefilled,
}: {
  sections: Section[];
  entities: SectionEntity;
  buildings: EntityBuilding;
  prefilled: {
    sec?: string;
    entity?: string;
    build?: string;
    ap?: string;
  };
}) => {
  const initialState = React.useRef(true);
  const [selectedSection, setSelectedSection] = React.useState<string>(
    prefilled.sec ?? ""
  );
  const [selectedEntity, setSelectedEntity] = React.useState<string>(
    prefilled.entity ?? ""
  );
  const [selectedBuilding, setSelectedBuilding] = React.useState<string>(
    prefilled.build ?? ""
  );
  const [selectedAccessPoint, setSelectedAccessPoint] = React.useState<string>(
    prefilled.ap ?? ""
  );
  const [entitiesList, setEntitiesList] = React.useState<EntityName[]>(
    prefilled.sec ? (entities[prefilled.sec].entities as EntityName[]) : []
  );
  const [buildingsList, setBuildingsList] = React.useState<BuildingName[]>(
    prefilled.entity
      ? (buildings[prefilled.entity].buildings as BuildingName[])
      : []
  );
  const [accessPointsList, setAccessPointsList] = React.useState<
    AccessPointName[]
  >([]);

  const [error, formAction, isPending] = React.useActionState(
    ReportAction,
    null
  );

  React.useEffect(() => {
    console.log("Selected Section: ", selectedSection);
    if (!initialState.current) {
      setSelectedEntity("");
      setEntitiesList(entities[selectedSection]?.entities as EntityName[]);
      setSelectedBuilding("");
      setBuildingsList([]);
      setSelectedAccessPoint("");
      setAccessPointsList([]);
    }
  }, [selectedSection, entities]);

  React.useEffect(() => {
    console.log("Selected Entity: ", selectedEntity);
    if (!initialState.current) {
      setSelectedBuilding("");
      setBuildingsList(buildings[selectedEntity]?.buildings as BuildingName[]);
      setSelectedAccessPoint("");
      setAccessPointsList([]);
    }
  }, [selectedEntity, buildings]);

  React.useEffect(() => {
    console.log("Selected Building: ", selectedBuilding);
    if (!initialState.current) {
      setSelectedAccessPoint("");
      if (selectedBuilding === "") {
        setAccessPointsList([]);
      } else {
        fetch(
          `${process.env.BACKEND_URL}/accesspoints/building/name/${selectedBuilding}`
        )
          .then(async (res) => await res.json())
          .then((data: AccessPointName[]) => {
            setAccessPointsList(data);
          })
          .catch((err) => {
            console.log("Error fetching access points: ", err);
            throw new Error("Error fetching access points");
          });
      }
    }
  }, [selectedBuilding]);

  React.useEffect(() => {
    console.log("Selected Access Point: ", selectedAccessPoint);
  }, [selectedAccessPoint]);

  React.useEffect(() => {
    initialState.current = false;
  }, []);

  return (
    <div className="flex flex-col items-start justify-start mt-4 px-4 h-auto w-full overflow-y-auto no-scrollbar">
      <h1 className="text-4xl font-bold mb-4">Report Page</h1>
      {/* Add your report form here */}
      <form className="w-full" action={formAction}>
        {/* with tabs for select zone, faculty, building*/}
        <ReportSelect
          type="Section"
          items={sections}
          value={selectedSection}
          set={setSelectedSection}
        />
        <ReportSelect
          type="Entity"
          items={entitiesList}
          value={selectedEntity}
          set={setSelectedEntity}
          disabled={!selectedSection}
        />
        <ReportSelect
          type="Building"
          items={buildingsList}
          value={selectedBuilding}
          set={setSelectedBuilding}
          disabled={!selectedEntity}
        />
        <ReportSelect
          type="AccessPoint"
          items={accessPointsList}
          value={selectedAccessPoint}
          set={setSelectedAccessPoint}
          disabled={!selectedBuilding}
        />
        {/*text area for report detail */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="reportDetail"
          >
            Report Detail
          </label>
          <textarea
            id="reportDetail"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline no-scrollbar"
            rows={4}
            placeholder="Enter report details..."
          ></textarea>
        </div>
        {error && !selectedAccessPoint && (
          <div className="text-red-500 text-sm mb-4">*{error}</div>
        )}
        <div className="flex justify-center w-full h-auto mb-20">
          <button
            type="submit"
            className="bg-card-foreground/90 hover:bg-card-foreground text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            disabled={isPending}
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
