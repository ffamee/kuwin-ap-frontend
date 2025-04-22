import GetData from "./getdata";
import { ZoneData } from "./zone-interface";
import Link from "next/link";

export default async function ProTable(TableHead: string[]) {
  const zone: ZoneData[] = await GetData();
  return (
    <div>
      <table className="bg-[#CCFFCC] w-11/12 place-self-center text-center">
        <thead className="text-[#FFFFCC] font-bold bg-[#009933]">
          <tr>
            {TableHead.head.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {zone.map((row, index) => (
            <tr key={index}>
              <td className="text-[#FFFFCC] font-bold bg-[#009933]">
                {index + 1}
              </td>
              <td className="text-left p-1">
                <Link href="/pro/zone">{row.zone}</Link>
              </td>
              <td>{row.maintain}</td>
              <td>{row.all}</td>
              <td className="text-red-500">{row.down}</td>
              <td>{row.c24}</td>
              <td>{row.c50}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
