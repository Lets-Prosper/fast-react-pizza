const KEY = "6bd5592570834060a1e57a4ffdb10c3a";

export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${KEY}`,
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}
