import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Hero } from "@/components/Hero";
import { PortfolioTeaser } from "@/components/PortfolioTeaser";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

type HomePageParams = PageProps<"/[locale]">["params"];

async function HomePageContent({ params }: { params: HomePageParams }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <>
      <main className="flex-1">
        <Hero />
        <PortfolioTeaser />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

function HomePageFallback() {
  return <main className="min-h-svh flex-1 bg-neutral-100" aria-hidden />;
}

export default function HomePage({ params }: PageProps<"/[locale]">) {
  return (
    <Suspense fallback={<HomePageFallback />}>
      <HomePageContent params={params} />
    </Suspense>
  );
}
