import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const aiUserAgents = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Google-Extended",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...aiUserAgents.map((userAgent) => ({
        userAgent,
        allow: "/" as const,
      })),
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
    host: new URL(siteConfig.siteUrl).host,
  };
}
