import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { getNavHref, navKeys } from "@/config/navigation";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.2" cy="6.8" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  );
}

export async function Footer() {
  const t = await getTranslations("Nav");
  const tFooter = await getTranslations("Footer");
  return (
    <footer className="border-t border-border bg-white px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo-dark.png"
            alt={siteConfig.brandName}
            width={200}
            height={88}
            className="h-auto w-[min(175px,70vw)] sm:w-[190px]"
          />
        </Link>
        <nav
          className="grid w-full max-w-md grid-cols-2 gap-x-4 gap-y-3 text-center text-[10px] uppercase tracking-[0.16em] text-foreground/75 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-x-3 sm:gap-y-2 sm:text-[11px] sm:tracking-[0.18em] lg:justify-end"
          aria-label="Footer"
        >
          {navKeys.map((key) => (
            <Link
              key={key}
              href={getNavHref(key)}
              className="hover:text-foreground"
            >
              {t(key)}
            </Link>
          ))}
        </nav>
        <a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-foreground/40 transition-colors hover:text-foreground/80"
          aria-label={tFooter("instagram")}
        >
          <InstagramIcon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
        </a>
      </div>
      <p className="mx-auto mt-8 max-w-2xl px-2 text-center text-[11px] leading-relaxed text-muted sm:mt-10 sm:text-xs">
        © {siteConfig.brandName} | {tFooter("tagline")} |{" "}
        {siteConfig.copyrightYear} | {tFooter("rights")}
      </p>
    </footer>
  );
}
