import { parseYouTubeId } from "@/lib/youtube";

export function ProjectVideo({ url, title, poster }: { url: string; title: string; poster?: string }) {
  if (url.startsWith("/videos/")) return <div className="rounded-2xl overflow-hidden elevation-3 mb-9 bg-surface-container-low"><video controls preload="none" poster={poster} aria-label={title} className="w-full h-auto"><source src={url} type="video/mp4" /><a href={url}>Watch {title}</a></video></div>;
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
