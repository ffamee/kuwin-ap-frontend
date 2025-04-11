import Link from "next/link";
import GetZoneData from "./getZonedata";
import { ApData } from "./faculty-interface";
import { Apcount } from "./building/apcount";

export default async function ZoneTable() {
  const zone: ApData[] = await GetZoneData();
  const ap = await Apcount();
  return (
    <div>
      <table className="bg-[#CCFFCC] w-11/12 place-self-center text-center">
        <thead className="text-[#FFFFCC] font-bold bg-[#009933]">
          <tr>
            <th>Id</th>
            <th>Faculty/Organization</th>
            <th># AP (overall)</th>
            <th># AP (maintain)</th>
            <th># AP (down)</th>
            <th># Client (2.4GHz)</th>
            <th># Client (5.0GHz)</th>
            <th># WLC</th>
          </tr>
        </thead>
        <tbody>
          {zone.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="text-left p-1">
                <Link href="/pro/zone/building/ap">{row.location}</Link>
              </td>
              <td>{ap.maintain + ap.down}</td>
              <td>{ap.maintain}</td>
              <td>{ap.down}</td>
              <td>{row.c24}</td>
              <td>{row.c50}</td>
              <td>{row.wlc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
