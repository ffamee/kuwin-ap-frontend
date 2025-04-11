export default async function GetData() {
  // return /api/zone
  const response = await fetch(
    "https://67f4bef5cbef97f40d2f310d.mockapi.io/api/zone"
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else throw new Error("Error when fetching data");
}
