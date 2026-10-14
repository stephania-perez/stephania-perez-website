export const siteConfig = {
  siteUrl: "https://stephaniaperez.com",
  brandName: "Stephania Pérez",
  tagline: {
    es: "diseño de interiores",
    en: "interior design",
  },
  email: "hola@stephaniaperez.com",
  phone: "+34 600 000 000",
  instagram: "https://www.instagram.com/stephaniaperezstudio",
  city: "Marbella",
  country: "ES",
  copyrightYear: 2026,
  serviceAreas: [
    "Marbella",
    "Málaga",
    "Benalmádena",
    "Torremolinos",
    "Fuengirola",
    "Alhaurín de la Torre",
    "Costa del Sol",
  ],
  services: [
    { es: "Obra nueva", en: "New construction" },
    { es: "Reformas integrales", en: "Full renovations" },
    { es: "Cocinas a medida", en: "Bespoke kitchens" },
    { es: "Mobiliario y acabados", en: "Furnishings and finishes" },
  ],
} as const;

export function phoneDigits(phone: string = siteConfig.phone): string {
  return phone.replace(/\D/g, "");
}

export function getWhatsAppUrl(phone: string = siteConfig.phone): string {
  return `https://wa.me/${phoneDigits(phone)}`;
}
