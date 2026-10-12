export type PortfolioItem = {
  id: string;
  image: string;
  altKey: `item${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`;
  gridClass: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "01",
    image: "/portfolio/marbella-01.jpg",
    altKey: "item1",
    gridClass:
      "min-h-[240px] sm:min-h-[280px] md:col-span-3 md:row-span-4 md:min-h-[420px]",
  },
  {
    id: "02",
    image: "/portfolio/marbella-02.jpg",
    altKey: "item2",
    gridClass:
      "min-h-[240px] sm:min-h-[280px] md:col-span-3 md:row-span-4 md:min-h-[420px]",
  },
  {
    id: "03",
    image: "/portfolio/marbella-03.jpg",
    altKey: "item3",
    gridClass:
      "min-h-[200px] sm:min-h-[220px] md:col-span-2 md:row-span-3 md:min-h-[300px]",
  },
  {
    id: "04",
    image: "/portfolio/marbella-04.jpg",
    altKey: "item4",
    gridClass:
      "min-h-[200px] sm:min-h-[220px] md:col-span-2 md:row-span-3 md:min-h-[300px]",
  },
  {
    id: "05",
    image: "/portfolio/marbella-05.jpg",
    altKey: "item5",
    gridClass:
      "min-h-[200px] sm:min-h-[220px] md:col-span-2 md:row-span-3 md:min-h-[300px]",
  },
  {
    id: "06",
    image: "/portfolio/marbella-06.jpg",
    altKey: "item6",
    gridClass:
      "min-h-[240px] sm:min-h-[280px] md:col-span-3 md:row-span-4 md:min-h-[420px]",
  },
  {
    id: "07",
    image: "/portfolio/marbella-07.jpg",
    altKey: "item7",
    gridClass:
      "min-h-[240px] sm:min-h-[280px] md:col-span-3 md:row-span-4 md:min-h-[420px]",
  },
  {
    id: "08",
    image: "/portfolio/marbella-08.jpg",
    altKey: "item8",
    gridClass:
      "min-h-[200px] sm:min-h-[220px] md:col-span-2 md:row-span-3 md:min-h-[300px]",
  },
  {
    id: "09",
    image: "/portfolio/marbella-09.jpg",
    altKey: "item9",
    gridClass:
      "min-h-[200px] sm:min-h-[220px] md:col-span-2 md:row-span-3 md:min-h-[300px]",
  },
  {
    id: "10",
    image: "/portfolio/marbella-10.jpg",
    altKey: "item10",
    gridClass:
      "min-h-[200px] sm:min-h-[220px] md:col-span-2 md:row-span-3 md:min-h-[300px]",
  },
];
