import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";

function MailIcon({ className }: { className?: string }) {
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
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
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
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const linkClass =
  "inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground";

const telHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;

export async function ContactPageLayout() {
  const t = await getTranslations("ContactPage");

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-24">
      <div className="relative mx-auto aspect-[3/4] w-full max-w-lg bg-neutral-100 md:mx-0 md:max-w-none">
        <Image
          src="/contact/lounge.jpg"
          alt={t("imageAlt")}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      <div>
        <h1 className="font-serif text-2xl uppercase tracking-[0.12em] md:text-3xl">
          {t("title")}
        </h1>
        <p className="mt-6 text-sm text-muted">{t("directContact")}</p>
        <ul className="mt-3 space-y-2.5">
          <li>
            <a
              href={`mailto:${siteConfig.email}`}
              className={linkClass}
              aria-label={t("emailAria")}
            >
              <MailIcon className="h-4 w-4 shrink-0 text-foreground/35" />
              {siteConfig.email}
            </a>
          </li>
          <li className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <a
              href={telHref}
              className={linkClass}
              aria-label={t("callAria")}
            >
              <PhoneIcon className="h-4 w-4 shrink-0 text-foreground/35" />
              {siteConfig.phone}
            </a>
            <span className="text-foreground/25" aria-hidden>
              ·
            </span>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} text-foreground/55`}
              aria-label={t("whatsappAria")}
            >
              <WhatsAppIcon className="h-3.5 w-3.5 shrink-0 opacity-70" />
              {t("whatsapp")}
            </a>
          </li>
        </ul>
        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
