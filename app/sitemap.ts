import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

const sections = [
  "",
  "#services",
  "#projects",
  "#process",
  "#pricing",
  "#about",
  "#faq",
  "#contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return sections.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
