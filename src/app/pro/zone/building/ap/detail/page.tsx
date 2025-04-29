import { apDetail } from "@/app/pro/mockdata";

// this detail is mocking up
const ap: apDetail = {
  ipAddress: "111.11.11.112",
  apName: "DD-DDD-F1",
  wlc: "WLC-7",
  model: "C101",
  firmware: "0",
  serial: "ASDFAA",
  rdmac: "10:10:aa:a8",
  ethmac: "10:10:10:aa",
  apLoc: "ชั้น 1 เมืองกวางโจว",
  numCli: 5,
  switch: "",
  eqNum: "กองกิจ",
  channel: "11:66",
  rxRate: 40,
  txRate: 50,
  iqd: 0,
  oqd: 0,
};

export default async function Detail() {
  // descript detail of access point
  return (
    <div>
      <h1 className="text-left font-bold m-4 text-[48px] italic">
        Access Point Detail
      </h1>
      <table className="bg-green-100">
        <thead className="bg-green-400">
          <tr>
            <th colSpan={2}>Detail Access Point</th>
          </tr>
        </thead>
        <tbody className="bg-green-200">
          <tr>
            <td>IP Address</td>
            <td>{ap.ipAddress}</td>
          </tr>
          <tr>
            <td>AP Name</td>
            <td>{ap.apName}</td>
          </tr>
          <tr>
            <td>Wireless Controller</td>
            <td>{ap.wlc}</td>
          </tr>
          <tr>
            <td>Model</td>
            <td>{ap.model}</td>
          </tr>
          <tr>
            <td>Firmware</td>
            <td>{ap.firmware}</td>
          </tr>
          <tr>
            <td>Serial</td>
            <td>{ap.serial}</td>
          </tr>
          <tr>
            <td>Radio Mac.</td>
            <td>{ap.rdmac}</td>
          </tr>
          <tr>
            <td>Ethernet Mac.</td>
            <td>{ap.ethmac}</td>
          </tr>
          <tr>
            <td>AP Location</td>
            <td>{ap.apLoc}</td>
          </tr>
          <tr>
            <td>Number Clients</td>
            <td>{ap.numCli}</td>
          </tr>
          <tr>
            <td>Switch</td>
            <td>{ap.switch}</td>
          </tr>
          <tr>
            <td>Equipment Number</td>
            <td>{ap.eqNum}</td>
          </tr>
        </tbody>
        <thead className="bg-green-400">
          <tr>
            <th colSpan={2}>Interface Dot11Radio</th>
          </tr>
        </thead>
        <tbody className="bg-green-200">
          <tr>
            <td>Channel</td>
            <td>{ap.channel}</td>
          </tr>
          <tr>
            <td>RX Rate</td>
            <td>{ap.rxRate}</td>
          </tr>
          <tr>
            <td>TX Rate</td>
            <td>{ap.txRate}</td>
          </tr>
          <tr>
            <td>IQD</td>
            <td>{ap.iqd}</td>
          </tr>
          <tr>
            <td>OQD</td>
            <td>{ap.oqd}</td>
          </tr>
        </tbody>
      </table>
      {/* {graph traffic at interface radio>
      graph number of user} */}
    </div>
  );
}
