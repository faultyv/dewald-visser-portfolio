export function parseYouTubeId(url: string): string {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  return url.trim().length === 11 ? url.trim() : "";
}
