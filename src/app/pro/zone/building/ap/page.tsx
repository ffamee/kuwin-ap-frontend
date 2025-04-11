import Image from "next/image";
import ApTable from "./aptable";
import ApImage from "./ap-underconstruct.gif";

export default async function Page() {
  return (
    <div className="bg-[#FFFEEA] font-sans justify-center">
      <h1 className="text-center font-bold">Access Point</h1>
      <Image
        src={ApImage}
        width={339}
        height={258}
        alt="Picture of access point"
      />
      <ApTable />
    </div>
  );
}
