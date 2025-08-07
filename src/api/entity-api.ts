import { toast } from "sonner";

// const param = new URLSearch
// const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/entities`;

export async function AddEntity(entityData: {
  name: string;
  sectionId: number;
  description?: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/entities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entityData),
  });
  console.log(entityData);
  const data = await res.json();
  if ("statusCode" in data) {
    toast.error(data.statusCode + ":" + data.error);
    return null;
  } else {
    // fetched successful
    toast.success(`Entity ${entityData.name} added successfully`);
    return data;
  }
}

export async function DeleteEntity(entityId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/entities/${entityId}`,
    {
      method: "DELETE",
    }
  );
  const data = await res.json();
  if ("statusCode" in data) {
    toast.error(data.statusCode + ":" + data.error);
  } else {
    toast.success(`Entity with ID ${entityId} deleted successfully`);
    window.location.reload();
    // return res.json();
  }
}

export async function EditEntity(
  entityId: number,
  entityData: { name: string; sectionId: number; description?: string }
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/entities/edit/${entityId}?confirm=true`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entityData),
    }
  );
  console.log(entityData); // need on sectionId
  const data = await res.json();
  if ("statusCode" in data) {
    toast.error(data.statusCode + ":" + data.error);
  } else {
    toast.success(`Entity with ID ${entityId} updated successfully`);
    //window.location.reload();
    // return res.json();
  }
}
