"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getNavHref, navKeys } from "@/config/navigation";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

type MobileNavProps = {
  theme?: "light" | "dark";
};

export function MobileNav({ theme = "light" }: MobileNavProps) {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    if (!open) {
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const buttonClass = isDark
    ? "text-white border-white/60 hover:bg-white/10"
    : "text-foreground border-border hover:bg-neutral-50";

  const panelBg = isDark ? "bg-neutral-950/95 text-white" : "bg-white text-foreground";

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-sm border ${buttonClass}`}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className={`block h-px w-5 bg-current transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
        />
        <span
          className={`block h-px w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-px w-5 bg-current transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
        />
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="fixed inset-0 z-[100] flex flex-col pt-[env(safe-area-inset-top)]"
          role="dialog"
          aria-modal="true"
          aria-label={t("menu")}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label={t("closeMenu")}
            onClick={() => setOpen(false)}
          />
          <div
            className={`relative ml-auto flex h-full w-[min(100%,20rem)] flex-col border-l border-border/40 px-5 pb-[env(safe-area-inset-bottom)] pt-6 shadow-xl sm:w-[min(100%,24rem)] sm:px-6 ${panelBg}`}
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile primary">
              {navKeys.map((key) => (
                <Link
                  key={key}
                  href={getNavHref(key)}
                  className="py-3 text-sm uppercase tracking-[0.2em] opacity-90 transition-opacity hover:opacity-100"
                  onClick={() => setOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-border/30 pt-6">
              <LocaleSwitcher theme={isDark ? "dark" : "light"} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
