import ProTable from "./protable";
import OverAllGraph from "../../image/userZone1to7.png";
import Image from "next/image";
import Link from "next/link";

const date: Date = new Date();

export default async function Page() {
  return (
    <div className="bg-[#FFFEEA] font-sans">
      <h1 className="text-left font-bold m-4 text-[48px] italic">
        Overall Status Access Point
      </h1>
      <p className="text-right p-4">{date.toISOString().slice(0, 19)}</p>
      <figure className="wmin-[1080] hmin-[439] p-4">
        <p>
          <Link href="">Daily</Link> | <Link href="">Weekly</Link> |{" "}
          <Link href="">Monthly</Link>
        </p>
        <Image
          src={OverAllGraph}
          width={979}
          height={326}
          alt="overall graph"
          className="bottom-250 left-50"
        />
      </figure>
      <ProTable />
    </div>
  );
}
