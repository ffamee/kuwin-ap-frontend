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
    toast.error(data.statusCode + ":" + data.error);
  } else {
    toast.success(`Configuration with ID ${configId} deleted successfully`);
    window.location.reload();
    return res.json();
  }
}

export async function EditBuilding(
  configId: number,
  configData: { name: string; entityId: number; description?: string }
) {
  //console.log(buildingData);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/configurations/edit/${configId}?confirm=true`,
    {
      method: "POST",
      // credentials: "include",
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
