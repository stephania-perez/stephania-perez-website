import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactPageLayout } from "@/components/ContactPageLayout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  return buildPageMetadata(
    locale as AppLocale,
    {
      title: t("meta.title"),
      description: t("meta.description"),
      keywords: t("meta.keywords"),
    },
    "/contact",
  );
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <>
      <Header variant="inner" />
      <main className="flex-1">
        <ContactPageLayout />
      </main>
      <Footer />
    </>
  );
}
