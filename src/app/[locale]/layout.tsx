import { Raleway } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing, type AppLocale } from "@/i18n/routing";
import type { Viewport } from "next";
import { buildJsonLd, buildPageMetadata } from "@/lib/seo";
import "../globals.css";

/** Locale segment reads `params`; allow blocking per Next.js Cache Components / instant nav. */
export const instant = false;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const minervaModern = localFont({
  src: "../../fonts/minerva-modern.woff",
  variable: "--font-minerva",
  display: "swap",
  weight: "500",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "Meta" });
  return buildPageMetadata(locale as AppLocale, {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
  });
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Meta" });
  const jsonLd = buildJsonLd(locale as AppLocale, t("description"));

  return (
    <html
      lang={locale}
      className={`${minervaModern.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
