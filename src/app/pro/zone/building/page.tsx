import BuildingTable from "./buildingtable";

export default async function Page() {
  return (
    <div className="bg-[#FFFEEA] font-sans">
      <h1 className="text-center font-bold">Building</h1>
      {<BuildingTable />}
    </div>
  );
}
