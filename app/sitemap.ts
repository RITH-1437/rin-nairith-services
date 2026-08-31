import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

// The site is a single-page services website. Only the canonical homepage is
// a crawlable, indexable URL — the in-page sections (#services, #projects,
// etc.) are client-side anchors on the same document, not separate pages.
// Including them as separate sitemap entries would create duplicate URLs.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
