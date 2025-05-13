import { ZoneData } from "./zone-interface";

export default function SummaryTable({ total }: { total: ZoneData }) {
  return (
    <div className="flex justify-evenly w-full">
      <div className="bg-white w-1/6 h-[161] border rounded-xs">
        Total Overall User(s)
        <br />
        {total.all}
      </div>
      <div className="bg-white w-1/6 h-[161] border rounded-xs">
        Total maintaining(s)
        <br />
        {total.maintain}
      </div>
      <div className="bg-white w-1/6 h-[161] border rounded-xs">
        Total Down(s)
        <br />
        {total.down}
      </div>
      <div className="bg-white w-1/6 h-[161] border rounded-xs">
        Total 2.4GHz Client(s)
        <br />
        {total.c24}
      </div>
      <div className="bg-white w-1/6 h-[161] border rounded-xs">
        Total 5.0GHz Client(s)
        <br />
        {total.c50}
      </div>
    </div>
  );
}
