import { toast } from "sonner";

export async function AddConfig(configData: {
  name: string;
  ip: string;
  buildingId: number;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/configurations/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(configData),
    }
  );
  console.log(configData);
  const data = await res.json();
  if ("statusCode" in data) {
    toast.error(data.statusCode + ":" + data.error);
    return null;
  } else {
    // fetched successful
    toast.success(`Entity ${configData.name} added successfully`);
    return data;
  }
}
