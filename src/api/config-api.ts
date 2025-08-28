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
  const data = await res.json();
  if ("statusCode" in data) {
    toast.error(data.statusCode + ":" + data.error + ":" + data.message);
    return null;
  } else {
    // fetched successful
    toast.success(`Configuration ${configData.name} added successfully`);
    return data;
  }
}

export async function DeleteConfig(configId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/configurations/${configId}`,
    {
      method: "DELETE",
    }
  );
  console.log(res.status);
  const data = await res.json();
  if ("statusCode" in data) {
    toast.error(data.statusCode + ":" + data.error + ":" + data.message);
  } else {
    toast.success(`Configuration with ID ${configId} deleted successfully`);
    return data;
  }
}

export async function EditConfig(
  configId: number,
  configData: {
    buildingId?: number;
    ip?: string;
  }
) {
  console.log(configData);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/configurations/edit/${configId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(configData),
    }
  );
  const data = await res.json();
  if ("statusCode" in data) {
    toast.error(data.statusCode + ":" + data.error + ":" + data.message);
    return data;
  } else {
    // fetched successful
    toast.success(`Configuration ${configId} edited successfully`);
    return data;
  }
}
