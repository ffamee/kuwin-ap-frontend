import ProTable from "./protable";
import OverAllGraph from "../../image/userZone1to7.png";
import Image from "next/image";
import Link from "next/link";

const headTable: string[] = [
  "Zone",
  "Faculty/Organization",
  "# AP (overall)",
  "# AP (maintain)",
  "# AP (down)",
  "# Client (2.4GHz)",
  "# Client (5.0GHz)",
];
const date: Date = new Date();

export default async function Page() {
  return (
    <div className="bg-[#FFFEEA] font-sans flex flex-col items-center justify-center p-9 h-auto w-full pb-28">
      <h1 className="text-left font-bold m-4 text-[48px] italic">
        Overall Status Access Point
      </h1>
      <p className="text-right p-4">{date.toISOString().slice(0, 19)}</p>
      <div className="flex justify-evenly w-full">
        <div className="bg-white w-1/6 h-[161] border rounded-xs">
          Total User
        </div>
        <div className="bg-white w-1/6 h-[161]  border rounded-xs">
          Total User
        </div>
        <div className="bg-white w-1/6 h-[161]  border rounded-xs">
          Total User
        </div>
        <div className="bg-white w-1/6 h-[161] border rounded-xs">
          Total User
        </div>
        <div className="bg-white w-1/6 h-[161] border rounded-xs">
          Total User
        </div>
      </div>
      <figure className="min-w-[1080] min-h-[439] mx-4 bg-white border my-2 w-full">
        <p className="p-2">
          <Link href="">Daily</Link> | <Link href="">Weekly</Link> |{" "}
          <Link href="">Monthly</Link>
        </p>
        <Image
          src={OverAllGraph}
          width={979}
          height={326}
          alt="overall graph"
          className="bottom-250 left-50 p-2"
        />
      </figure>
      <ProTable head={headTable} />
    </div>
  );
}
