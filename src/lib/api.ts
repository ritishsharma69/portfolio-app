const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export async function getExperience() {
  const res = await fetch(`${base}/api/experience`);
  if (!res.ok) throw new Error('Failed to fetch experience');
  return res.json();
}

