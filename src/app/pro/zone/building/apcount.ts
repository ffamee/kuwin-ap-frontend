import GetZoneData from "../getZonedata";
import { ApData } from "../faculty-interface";

export async function Apcount() {
  const ap: ApData[] = await GetZoneData();
  let maintain: number = 0;
  let down: number = 0;
  ap.forEach((overap) => {
    if (overap.status == true) {
      maintain += 1;
    } else {
      down += 1;
    }
  });
  return { maintain, down };
}
