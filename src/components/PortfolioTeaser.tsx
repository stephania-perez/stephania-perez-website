import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function PortfolioTeaser() {
  const t = await getTranslations("HomePortfolio");

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 border-b border-border/60 bg-white px-4 py-16 md:py-24"
      aria-labelledby="home-portfolio-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="home-portfolio-heading"
          className="font-serif text-2xl uppercase tracking-[0.12em] md:text-3xl"
        >
          {t("title")}
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
          {t("paragraph1")}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
          {t("paragraph2")}
        </p>
        <p className="mt-8">
          <Link
            href="/portfolio"
            className="text-sm uppercase tracking-[0.22em] text-foreground underline underline-offset-[6px] transition-opacity hover:opacity-70"
          >
            {t("cta")}
          </Link>
        </p>
      </div>
    </section>
  );
}
