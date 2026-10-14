export type PlaceSlug =
  | "marbella"
  | "malaga"
  | "benalmadena"
  | "torremolinos"
  | "fuengirola"
  | "alhaurin";

export type PlaceItem = {
  slug: PlaceSlug;
  image: string;
  credit?: {
    label: string;
    href: string;
  };
};

export const placeItems: PlaceItem[] = [
  { slug: "marbella", image: "/places/marbella.jpg" },
  { slug: "malaga", image: "/places/malaga.jpg" },
  { slug: "benalmadena", image: "/places/benalmadena.jpg" },
  {
    slug: "torremolinos",
    image: "/places/torremolinos.jpg",
    credit: {
      label: "Adam Cli, CC BY-SA 4.0",
      href: "https://commons.wikimedia.org/wiki/File:Playas_de_Torremolinos.jpg",
    },
  },
  { slug: "fuengirola", image: "/places/fuengirola.jpg" },
  { slug: "alhaurin", image: "/places/alhaurin.jpg" },
];
