import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

// Resolved once per build instead of per request. `new Date()` inside the
// function changed <lastmod> on every fetch, which tells crawlers the page
// changes constantly and wastes crawl budget.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
