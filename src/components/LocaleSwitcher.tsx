"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

type LocaleSwitcherProps = {
  theme?: "light" | "dark";
};

export function LocaleSwitcher({ theme = "light" }: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations("Locale");

  const isDark = theme === "dark";
  const base = isDark ? "text-white/75" : "text-muted";
  const active = isDark
    ? "text-white underline underline-offset-4"
    : "text-foreground underline underline-offset-4";
  const hover = isDark ? "hover:text-white" : "hover:text-foreground";

  return (
    <div
      className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] ${base}`}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            className={
              isActive
                ? active
                : `${hover} transition-colors`
            }
            aria-current={isActive ? "true" : undefined}
          >
            {t(loc)}
          </Link>
        );
      })}
    </div>
  );
}
