import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function ContactSection() {
  const t = await getTranslations("Contact");

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-white px-4 py-20 text-center md:py-28"
    >
      <div className="mx-auto max-w-xl">
        <h2 className="font-serif text-2xl uppercase tracking-[0.12em] md:text-[1.75rem]">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm text-muted">{t("subtitle")}</p>
        <Link
          href="/contact"
          className="mt-10 inline-block bg-accent px-10 py-4 text-[11px] uppercase tracking-[0.25em] text-white transition-opacity hover:opacity-90"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
