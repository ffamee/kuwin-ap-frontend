import GetZoneData from "../function/getZonedata";
import { FacultyData } from "../interfaces/faculty-interface";

export default async function ZoneTable() {
  const zone: FacultyData[] = await GetZoneData();
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
              <td className="text-left p-1">{row.fac}</td>
              <td>{row.maintain}</td>
              <td>{row.all}</td>
              <td>{row.down}</td>
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
