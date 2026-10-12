import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { AppLocale } from "@/i18n/routing";

type MetaCopy = {
  title: string;
  description: string;
  keywords: string;
};

function absolutePath(locale: AppLocale, pathSuffix: string): string {
  return `${siteConfig.siteUrl}/${locale}${pathSuffix}`;
}

export function buildPageMetadata(
  locale: AppLocale,
  meta: MetaCopy,
  pathSuffix = "",
): Metadata {
  const canonicalPath = `/${locale}${pathSuffix}`;
  const alternateLocale = locale === "es" ? "en" : "es";

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords.split(",").map((k) => k.trim()),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        es: absolutePath("es", pathSuffix),
        en: absolutePath("en", pathSuffix),
        "x-default": absolutePath("es", pathSuffix),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: alternateLocale === "es" ? "es_ES" : "en_US",
      url: absolutePath(locale, pathSuffix),
      siteName: siteConfig.brandName,
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const knowsAbout = [
  "Interior design",
  "Residential interior design",
  "Kitchen design",
  "Home renovation",
  "Mediterranean interior design",
  "Costa del Sol",
  "Marbella",
];

export function buildJsonLd(locale: AppLocale, description: string) {
  const orgId = `${siteConfig.siteUrl}/#organization`;
  const websiteId = `${siteConfig.siteUrl}/#website`;
  const inLanguage = locale === "es" ? "es-ES" : "en";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.siteUrl,
        name: siteConfig.brandName,
        description,
        inLanguage: ["es-ES", "en"],
        publisher: { "@id": orgId },
      },
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: siteConfig.brandName,
        description,
        url: absolutePath(locale, ""),
        email: siteConfig.email,
        telephone: siteConfig.phone,
        image: `${siteConfig.siteUrl}/og.jpg`,
        sameAs: [siteConfig.instagram],
        availableLanguage: ["Spanish", "English"],
        areaServed: siteConfig.serviceAreas.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.city,
          addressRegion: "Andalucía",
          addressCountry: siteConfig.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 36.5101,
          longitude: -4.8824,
        },
        knowsAbout,
        founder: {
          "@type": "Person",
          name: siteConfig.brandName,
          jobTitle:
            locale === "es"
              ? "Diseñadora de interiores"
              : "Interior designer",
          worksFor: { "@id": orgId },
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name:
            locale === "es"
              ? "Servicios de interiorismo"
              : "Interior design services",
          itemListElement: siteConfig.services.map((service, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: locale === "es" ? service.es : service.en,
              areaServed: "Costa del Sol, Spain",
            },
          })),
        },
      },
    ],
  };
}
