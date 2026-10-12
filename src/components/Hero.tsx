import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";

const HERO_IMAGE = "/hero.jpg";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative min-h-svh w-full overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt={t("imageAlt")}
        fill
        priority
        quality={92}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/15" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"
        aria-hidden
      />

      <Header variant="overlay" />

      <div className="relative flex min-h-svh flex-col items-center justify-end px-4 pt-24 pb-[calc(clamp(3rem,12vh,7rem)+env(safe-area-inset-bottom))] sm:pt-32">
        <Link
          href="/portfolio"
          className="max-w-[calc(100vw-2rem)] border border-white px-6 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10 sm:px-10 sm:py-3.5 sm:text-[11px] sm:tracking-[0.28em]"
        >
          {t("viewPortfolio")}
        </Link>
      </div>
    </section>
  );
}
