import ZoneTable from "./zonetable";

const z = 2;

export default async function Page() {
  return (
    <div className="bg-[#FFFEEA] font-sans">
      <h1 className="text-center font-bold">
        แผนที่ Zone ที่ {z} ในมหาวิทยาลัยเกษตรศาสตร์
      </h1>
      <ZoneTable />
    </div>
  );
}
