import GetData from "../function/getdata";
import { ZoneData } from "../interfaces/zone-interface";

export default async function ProTable() {
  const zone: ZoneData[] = await GetData();
  return (
    <div>
      <table className="bg-[#CCFFCC] w-11/12 place-self-center text-center">
        <thead className="text-[#FFFFCC] font-bold bg-[#009933]">
          <th>Zone</th>
          <th>Faculty/Organization</th>
          <th># AP (overall)</th>
          <th># AP (maintain)</th>
          <th># AP (down)</th>
          <th># Client (2.4GHz)</th>
          <th># Client (5.0GHz)</th>
        </thead>
        <tbody>
          {zone.map((row, index) => (
            <tr key={index}>
              <td className="text-[#FFFFCC] font-bold bg-[#009933]">
                {index + 1}
              </td>
              <td className="text-left p-1">{row.zone}</td>
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
