import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PlacesGrid } from "@/components/PlacesGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "PlacesPage" });
  return buildPageMetadata(
    locale as AppLocale,
    {
      title: t("meta.title"),
      description: t("meta.description"),
      keywords: t("meta.keywords"),
    },
    "/places",
  );
}

export default async function PlacesPage({
  params,
}: PageProps<"/[locale]/places">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("PlacesPage");

  return (
    <>
      <Header variant="inner" />
      <main className="flex-1">
        <header className="mx-auto max-w-3xl px-4 pt-16 text-center md:pt-20">
          <h1 className="font-serif text-3xl uppercase tracking-[0.12em] md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            {t("intro")}
          </p>
        </header>
        <PlacesGrid />
      </main>
      <Footer />
    </>
  );
}
