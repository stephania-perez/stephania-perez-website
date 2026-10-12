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
};

export const placeItems: PlaceItem[] = [
  { slug: "marbella", image: "/places/marbella.jpg" },
  { slug: "malaga", image: "/places/malaga.jpg" },
  { slug: "benalmadena", image: "/places/benalmadena.jpg" },
  { slug: "torremolinos", image: "/places/torremolinos.jpg" },
  { slug: "fuengirola", image: "/places/fuengirola.jpg" },
  { slug: "alhaurin", image: "/places/alhaurin.jpg" },
];
