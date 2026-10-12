import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

const paths = [
  "",
  "/portfolio",
  "/about",
  "/services",
  "/places",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteConfig.siteUrl}/${locale}${path}`,
      lastModified: "2026-01-01",
      changeFrequency: path === "" ? "monthly" : "weekly",
      priority: path === "" ? 1 : 0.85,
      alternates: {
        languages: {
          es: `${siteConfig.siteUrl}/es${path}`,
          en: `${siteConfig.siteUrl}/en${path}`,
          "x-default": `${siteConfig.siteUrl}/es${path}`,
        },
      },
    })),
  );
}
