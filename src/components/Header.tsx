import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { MobileNav } from "@/components/MobileNav";
import { getNavHref, navKeys } from "@/config/navigation";

type HeaderProps = {
  variant?: "inner" | "overlay";
};

export async function Header({ variant = "inner" }: HeaderProps) {
  const t = await getTranslations("Nav");
  const isOverlay = variant === "overlay";

  const left = navKeys.slice(0, 3);
  const right = navKeys.slice(3);

  const headerClass = isOverlay
    ? "absolute inset-x-0 top-0 z-50 border-0 bg-transparent pt-[env(safe-area-inset-top)]"
    : "sticky top-0 z-50 border-b border-border/60 bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur-sm";

  const linkClass = isOverlay
    ? "text-[10px] uppercase tracking-[0.18em] text-white/90 transition-colors hover:text-white xl:text-[11px] xl:tracking-[0.22em]"
    : "text-[10px] uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-foreground xl:text-[11px] xl:tracking-[0.22em]";

  const logoSrc = isOverlay ? "/logo-light.png" : "/logo-dark.png";
  const logoClass =
    "h-auto w-[min(220px,58vw)] sm:w-[200px] lg:w-[240px]";

  const navTheme = isOverlay ? "dark" : "light";

  return (
    <header id={isOverlay ? "top" : undefined} className={headerClass}>
      {/* Mobile & tablet */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:hidden">
        <MobileNav theme={navTheme} />
        <Link href="/" className="min-w-0 flex-1 text-center">
          {isOverlay ? (
            <h1 className="sr-only">{siteConfig.brandName}</h1>
          ) : null}
          <Image
            src={logoSrc}
            alt={siteConfig.brandName}
            width={280}
            height={120}
            priority={isOverlay}
            className={`mx-auto ${logoClass}`}
          />
        </Link>
        <div className="w-10 shrink-0 sm:w-10" aria-hidden />
      </div>

      {/* Desktop */}
      <div className="mx-auto hidden max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-6 lg:grid lg:py-8 xl:gap-6">
        <nav
          className="flex flex-wrap justify-start gap-x-4 gap-y-2 xl:gap-6"
          aria-label="Primary left"
        >
          {left.map((key) => (
            <Link key={key} href={getNavHref(key)} className={linkClass}>
              {t(key)}
            </Link>
          ))}
        </nav>

        <Link href="/" className="flex shrink-0 flex-col items-center">
          {!isOverlay ? null : (
            <h1 className="sr-only">{siteConfig.brandName}</h1>
          )}
          <Image
            src={logoSrc}
            alt={siteConfig.brandName}
            width={280}
            height={120}
            priority={isOverlay}
            className={logoClass}
          />
        </Link>

        <nav
          className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 xl:gap-6"
          aria-label="Primary right"
        >
          {right.map((key) => (
            <Link key={key} href={getNavHref(key)} className={linkClass}>
              {t(key)}
            </Link>
          ))}
          <LocaleSwitcher theme={navTheme} />
        </nav>
      </div>
    </header>
  );
}
