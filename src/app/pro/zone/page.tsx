import ZoneTable from "./zonetable";

const headTable = [
  "Id",
  "Faculty/Organization",
  "#AP(Overall)",
  "#AP (Maintain)",
  "#AP (Down)",
  "#Client (2.4GHz)",
  "#Client (5.0GHz)",
  "#WLC",
];
const z = 2;

export default async function Page() {
  return (
    <div className="bg-[#FFFEEA] font-sans">
      <h1 className="text-left font-bold m-4 text-[48px] italic">
        แผนที่ Zone ที่ {z} ในมหาวิทยาลัยเกษตรศาสตร์
      </h1>
      <ZoneTable />
    </div>
  );
}
