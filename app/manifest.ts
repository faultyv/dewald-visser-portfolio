import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dewald Visser Portfolio",
    short_name: "Dewald Visser",
    description: "Founder-operator across brand, growth marketing, web systems and practical AI enablement.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#14182B",
    theme_color: "#0073EA",
    icons: [
      {
        src: `${SITE_URL}/icon`,
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: `${SITE_URL}/apple-icon`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
