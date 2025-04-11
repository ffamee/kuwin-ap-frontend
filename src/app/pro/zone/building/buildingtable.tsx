import GetZoneData from "../getZonedata";
import { ApData } from "../faculty-interface";
import { Apcount } from "./apcount";
import Link from "next/link";

export default async function BuildingTable() {
  const zone: ApData[] = await GetZoneData();
  const ap = await Apcount();
  return (
    <div>
      <table className="bg-[#CCFFCC] w-11/12 place-self-center text-center">
        <thead className="text-[#FFFFCC] font-bold bg-[#009933]">
          <tr>
            <th>Id</th>
            <th>Building</th>
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
                <Link href="pro/zone/building/ap">Building N.{index + 1}</Link>
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
