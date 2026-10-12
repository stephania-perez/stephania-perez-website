import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { placeItems, type PlaceSlug } from "@/data/places";

export async function PlacesGrid() {
  const t = await getTranslations("PlacesPage");

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 md:space-y-24 md:py-24">
      {placeItems.map((place, index) => {
        const slug = place.slug as PlaceSlug;
        const reversed = index % 2 === 1;

        return (
          <article
            key={place.slug}
            className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${
              reversed ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="relative aspect-[4/3] w-full bg-neutral-100">
              <Image
                src={place.image}
                alt={t(`locations.${slug}.imageAlt`)}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
            <div>
              <h2 className="font-serif text-2xl uppercase tracking-[0.12em] md:text-3xl">
                {t(`locations.${slug}.name`)}
              </h2>
              <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted">
                {t(`locations.${slug}.region`)}
              </p>
              <hr className="mt-6 border-border" />
              <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
                {t(`locations.${slug}.body`)}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
