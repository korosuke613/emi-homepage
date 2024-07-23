import { getRelativeLocaleUrl } from "astro:i18n";

export type StaticRoutePath = `/${string}`;
export type StaticRoute = {
  name: string;
  path: StaticRoutePath;
};
export type StaticRoutes = StaticRoute[];

export const isRoutePath = (route: string): route is StaticRoutePath => {
  return route.startsWith("/");
};

export const STATIC_ROUTES = ["career", "link", "blog"] as const;

export const getStaticRoutes = (lang: string): StaticRoutes => {
  return STATIC_ROUTES.map((route) => {
    const path = getRelativeLocaleUrl(lang, route);
    if (!isRoutePath(path)) {
      throw new Error(`Invalid route path: ${path}`);
    }
    return {
      name: route,
      path: path,
    };
  });
};
