import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { portfolioItems } from "@/data/portfolio";

export async function PortfolioGallery() {
  const t = await getTranslations("PortfolioPage");

  return (
    <div className="bg-neutral-100 px-2 py-4 sm:px-3 md:px-4 md:py-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-6 md:gap-3">
        {portfolioItems.map((item, index) => (
          <figure
            key={item.id}
            className={`group relative overflow-hidden bg-neutral-200 ${item.gridClass}`}
          >
            <Image
              src={item.image}
              alt={t(`images.${item.altKey}`)}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              priority={index < 3}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
