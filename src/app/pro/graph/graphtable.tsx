import userZone1to7 from "@/image/userZone1to7.png";
import userZone1 from "@/image/userZone1.png";
import userZone2 from "@/image/userZone2.png";
import Link from "next/link";
import Image from "next/image";

//const ap = [["OCS"], ["LIB"], ["SCI"]];
const userGraph = [userZone1to7, userZone1, userZone2];

export default function GraphTable() {
  return (
    <table className="bg-[#CCFFCC] w-11/12 place-center">
      <thead className="text-[#ffffcc] bg-[#009933]">
        <tr>
          <th colSpan={2} className="text-center font-bold text-lg">
            สถิติจำนวนผู้ใช้งานเครือข่าย Wireless Lans มหาวิทยาลัยเกษตรศาสตร์
            วิทยาเขตบางเขน
          </th>
        </tr>
        <tr className="bg-[#009933] text-black font-bold text-sm">
          <td colSpan={2}>
            <Link href="">รายวัน</Link> | <Link href="">รายสัปดาห์</Link> |{" "}
            <Link href="">รายเดือน</Link>
          </td>
        </tr>
      </thead>
      <tbody className="justify-items-center bg-[#ccffcc]">
        {userGraph.map((row, i) => (
          <tr
            key={i}
            className="flex-row items-center justify-center bg-[#009933]"
          >
            <td className="text-[#ffffcc] font-bold w-1/12 text-center">
              zone{i + 1}
            </td>
            <td className="bg-[#ccffcc] p-1 items-center flex flex-col">
              <Image
                src={userGraph[i]}
                width={300}
                height={300}
                alt="userGraph"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
