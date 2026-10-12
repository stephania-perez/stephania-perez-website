import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { AboutVisual } from "@/components/AboutVisual";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return buildPageMetadata(
    locale as AppLocale,
    {
      title: t("meta.title"),
      description: t("meta.description"),
      keywords: t("meta.keywords"),
    },
    "/about",
  );
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("AboutPage");
  const paragraphs = ["p1", "p2", "p3"] as const;

  return (
    <>
      <Header variant="inner" />
      <main className="flex-1">
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <AboutVisual label={t("visualAlt")} />
          <div className="flex flex-col justify-center">
            <h1 className="font-serif text-3xl uppercase tracking-[0.12em] md:text-4xl">
              {siteConfig.brandName}
            </h1>
            <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-muted">
              {t("role")}
            </p>
            <hr className="mt-8 border-border" />
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted md:text-base">
              {paragraphs.map((key) => (
                <p key={key}>{t(`bio.${key}`)}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="relative min-h-[320px] md:min-h-[380px]">
          <Image
            src="/portfolio/marbella-02.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            aria-hidden
          />
          <div className="absolute inset-0 bg-white/30" aria-hidden />
          <div className="relative mx-auto flex min-h-[320px] max-w-3xl items-center justify-center px-4 py-16 md:min-h-[380px]">
            <blockquote className="bg-white/90 px-8 py-10 text-center backdrop-blur-sm md:px-14 md:py-12">
              <p className="font-serif text-lg uppercase leading-relaxed tracking-[0.08em] md:text-xl">
                {t("quote.text")}
              </p>
              <footer className="mt-6 text-sm text-muted">{t("quote.author")}</footer>
            </blockquote>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
