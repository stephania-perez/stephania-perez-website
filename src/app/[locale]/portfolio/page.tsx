import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { siteConfig } from "@/config/site";
import { portfolioItems } from "@/data/portfolio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "PortfolioPage" });
  return buildPageMetadata(
    locale as AppLocale,
    {
      title: t("meta.title"),
      description: t("meta.description"),
      keywords: t("meta.keywords"),
    },
    "/portfolio",
  );
}

function buildPortfolioJsonLd(locale: AppLocale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "es" ? "Portafolio" : "Portfolio",
    description,
    url: `${siteConfig.siteUrl}/${locale}/portfolio`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.brandName,
      url: `${siteConfig.siteUrl}/${locale}`,
    },
    hasPart: portfolioItems.map((item, index) => ({
      "@type": "ImageObject",
      contentUrl: `${siteConfig.siteUrl}${item.image}`,
      position: index + 1,
    })),
  };
}

export default async function PortfolioPage({
  params,
}: PageProps<"/[locale]/portfolio">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("PortfolioPage");
  const jsonLd = buildPortfolioJsonLd(locale as AppLocale, t("meta.description"));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header variant="inner" />
      <main className="flex-1">
        <h1 className="sr-only">{t("title")}</h1>
        <p className="sr-only">{t("intro")}</p>
        <PortfolioGallery />
      </main>
      <Footer />
    </>
  );
}
