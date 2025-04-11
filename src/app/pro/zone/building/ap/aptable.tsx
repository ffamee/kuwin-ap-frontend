import GetZoneData from "../../getZonedata";
import { ApData } from "../../faculty-interface";

export default async function ApTable() {
  const zone: ApData[] = await GetZoneData();
  return (
    <div>
      <table className="bg-[#CCFFCC] w-11/12 place-self-center text-center">
        <thead className="text-[#FFFFCC] font-bold bg-[#009933]">
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Location of Access Point</th>
            <th>Problem</th>
            <th># Client (2.4GHz)</th>
            <th># Client (5.0GHz)</th>
            <th># Client (active) Max</th>
            <th>AP Join</th>
            <th>WLC</th>
          </tr>
        </thead>
        <tbody>
          {zone.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.status.toString()}</td>
              <td>{row.location}</td>
              <td></td>
              <td>{row.c24}</td>
              <td>{row.c50}</td>
              <td>{row.c24 + row.c50}</td>
              <td>WLC-5</td>
              <td>Yes</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
