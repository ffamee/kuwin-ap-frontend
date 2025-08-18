export async function GetAllConfigurations() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/configurations/all`
  );
  if (!res.ok) {
    throw new Error("fail to fetching GetAllConfigurations");
  }
  return await res.json();
}

export async function GetDownConfigurations() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/configurations/down`
  );
  if (!res.ok) {
    throw new Error("fail to fetching GetDownConfigurations");
  }
  return await res.json();
}
