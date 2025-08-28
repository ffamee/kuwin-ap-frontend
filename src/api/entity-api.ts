import { toast } from "sonner";

// const param = new URLSearch
// const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/entities`;

export async function AddEntity(entityData: {
  name: string;
  sectionId: number;
  description?: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/entities/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entityData),
    }
  );
  const data = await res.json();
  if ("statusCode" in data) {
    toast.error(data.statusCode + ":" + data.error + ":" + data.message);
    return null;
  } else {
    // fetched successful
    toast.success(`Entity ${entityData.name} added successfully`);
    return data;
  }
}

export async function DeleteEntity(entityId: number, confirmMessage?: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/entities/${entityId}/${confirmMessage}`,
    {
      method: "DELETE",
    }
  );
  const data = await res.json();
  if ("statusCode" in data) {
    if (data.statusCode === 409) return data;
    toast.error(data.statusCode + ":" + data.error + ":" + data.message);
    return data;
  } else {
    toast.success(`Entity with ID ${entityId} deleted successfully`);
    return data;
  }
}

export async function EditEntity(
  entityId: number,
  entityData: { name: string; sectionId: number; description?: string },
  confirmMessage?: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/entities/edit/${entityId}${confirmMessage}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entityData),
    }
  );
  const data = await res.json();
  if ("statusCode" in data) {
    if (data.statusCode === 409) return data;
    toast.error(data.statusCode + ":" + data.error + ":" + data.message);
    return data;
  } else {
    toast.success(`Entity with ID ${entityId} updated successfully`);
    return data;
  }
}

// export async function CountInEntity(sectionId: number, entityId: number) {
//   const res = awatch fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/entities/count/?sec=${sectionId}&entity=${entityId}`,{
//     method: "GET",

//   })
// }
