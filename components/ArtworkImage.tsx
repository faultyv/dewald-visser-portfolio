import Image from "next/image";
import dimensions from "@/lib/artwork-dimensions.json";

/** Preserve complete compositions; raster sources keep their width and vectors stay scalable. */
export function ArtworkImage({ src, alt, sizes, priority = false }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  const size = (dimensions as Record<string, { width: number; height: number; background?: "dark" }>)[src] ?? { width: 1200, height: 900 };
  return <Image src={src} alt={alt} width={size.width} height={size.height} sizes={sizes} quality={90} priority={priority} className="artwork-image" style={{ width: "100%", height: "auto", maxWidth: src.endsWith(".svg") ? undefined : size.width, marginInline: "auto", backgroundColor: size.background === "dark" ? "#162a42" : undefined }} />;
}
