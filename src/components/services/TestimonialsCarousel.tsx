"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const testimonialKeys = ["one", "two", "three"] as const;

type TestimonialKey = (typeof testimonialKeys)[number];

export function TestimonialsCarousel() {
  const t = useTranslations("ServicesPage.testimonials");
  const [index, setIndex] = useState(0);
  const key = testimonialKeys[index] as TestimonialKey;

  function goPrev() {
    setIndex((current) =>
      current === 0 ? testimonialKeys.length - 1 : current - 1,
    );
  }

  function goNext() {
    setIndex((current) =>
      current === testimonialKeys.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <section className="relative min-h-[420px] overflow-hidden md:min-h-[480px]">
      <Image
        src="/portfolio/marbella-04.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-white/20" aria-hidden />
      <div className="relative mx-auto flex min-h-[420px] max-w-4xl items-center justify-center px-4 py-16 md:min-h-[480px]">
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/70 text-sm text-foreground/70 backdrop-blur-sm transition hover:bg-white md:left-8"
          aria-label={t("prev")}
        >
          ‹
        </button>
        <div className="mx-14 max-w-2xl bg-white/92 px-4 py-8 text-center backdrop-blur-sm sm:mx-12 sm:px-8 sm:py-10 md:mx-16 md:px-12 md:py-12">
          <h2 className="font-serif text-xl uppercase tracking-[0.15em] md:text-2xl">
            {t("title")}
          </h2>
          <blockquote className="mt-6 text-sm leading-relaxed text-muted md:text-base">
            {t(`items.${key}.quote`)}
          </blockquote>
          <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-foreground/80">
            {t(`items.${key}.author`)}
          </p>
        </div>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/70 text-sm text-foreground/70 backdrop-blur-sm transition hover:bg-white md:right-8"
          aria-label={t("next")}
        >
          ›
        </button>
      </div>
    </section>
  );
}
