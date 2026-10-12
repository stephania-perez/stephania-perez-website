export const navKeys = [
  "home",
  "portfolio",
  "about",
  "services",
  "places",
  "contact",
] as const;

export type NavKey = (typeof navKeys)[number];

export type AppPathname =
  | "/"
  | "/portfolio"
  | "/about"
  | "/services"
  | "/places"
  | "/contact";

type NavHref = {
  pathname: AppPathname;
  hash?: string;
};

export function getNavHref(key: NavKey): NavHref {
  if (key === "home") {
    return { pathname: "/" };
  }
  if (key === "portfolio") {
    return { pathname: "/portfolio" };
  }
  if (key === "about") {
    return { pathname: "/about" };
  }
  if (key === "services") {
    return { pathname: "/services" };
  }
  if (key === "places") {
    return { pathname: "/places" };
  }
  return { pathname: "/contact" };
}
