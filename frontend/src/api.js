import axios from "axios";
const BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export async function getDistrictData(name) {
  const res = await axios.get(`${BASE}/api/district/${encodeURIComponent(name)}`);
  return res.data;
}
