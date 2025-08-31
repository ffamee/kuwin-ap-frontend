import fetcher from "@/lib/fetcher";

export async function GetAllConfigurations() {
  const res = await fetcher("/configurations/all");
  if (!res.ok) {
    throw new Error("fail to fetching GetAllConfigurations");
  }
  return await res.json();
}

export async function GetDownConfigurations() {
  const res = await fetcher("/configurations/down");
  if (!res.ok) {
    throw new Error("fail to fetching GetDownConfigurations");
  }
  return await res.json();
}
