const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export async function getExperience() {
  const res = await fetch(`${base}/api/experience`);
  if (!res.ok) throw new Error('Failed to fetch experience');
  return res.json();
}

export async function getProjects() {
  const res = await fetch(`${base}/api/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function getProject(slug: string) {
  const res = await fetch(`${base}/api/projects/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch project');
  return res.json();
}


export async function getSettings() {
  const res = await fetch(`${base}/api/settings`);
  if (!res.ok) throw new Error('Failed to fetch settings');
  return res.json();
}
