import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DesignProcessAccordion } from "@/components/services/DesignProcessAccordion";
import { TestimonialsCarousel } from "@/components/services/TestimonialsCarousel";
import { Link } from "@/i18n/navigation";

const serviceKeys = [
  "newConstruction",
  "renovations",
  "kitchen",
  "furnishings",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  return buildPageMetadata(
    locale as AppLocale,
    {
      title: t("meta.title"),
      description: t("meta.description"),
      keywords: t("meta.keywords"),
    },
    "/services",
  );
}

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("ServicesPage");

  return (
    <>
      <Header variant="inner" />
      <main className="flex-1">
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <div className="relative aspect-[3/4] w-full bg-neutral-100 md:aspect-auto md:min-h-[520px]">
            <Image
              src="/portfolio/marbella-03.jpg"
              alt={t("heroImageAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="font-serif text-2xl uppercase tracking-[0.12em] md:text-3xl">
              {t("intro.title")}
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
              {t("intro.lead")}
            </p>
            <div className="mt-10 space-y-8">
              {serviceKeys.map((key) => (
                <div key={key}>
                  <h2 className="text-[11px] uppercase tracking-[0.22em] text-foreground">
                    {t(`services.${key}.title`)}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {t(`services.${key}.body`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-white px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl uppercase tracking-[0.12em]">
              {t("process.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
              {t("process.lead")}
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl px-4">
            <DesignProcessAccordion />
            <div className="mt-10 text-center">
              <Link
                href="/contact"
                className="inline-block bg-accent px-10 py-4 text-[11px] uppercase tracking-[0.25em] text-white transition-opacity hover:opacity-90"
              >
                {t("process.cta")}
              </Link>
            </div>
          </div>
        </section>

        <TestimonialsCarousel />
      </main>
      <Footer />
    </>
  );
}
