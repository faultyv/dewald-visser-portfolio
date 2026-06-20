import { parseYouTubeId } from "@/lib/youtube";

export function ProjectVideo({ url, title }: { url: string; title: string }) {
  const id = parseYouTubeId(url);
  if (!id) return null;

  return (
    <div className="rounded-2xl overflow-hidden elevation-3 mb-9" style={{ aspectRatio: "16/9" }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="w-full h-full border-0"
      />
    </div>
  );
}
