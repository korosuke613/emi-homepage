import DOMPurify from "isomorphic-dompurify";
import {
  type AboutContentKey,
  type NavigationContentKey,
  type PagesContentKey,
  aboutContent,
  navigationContent,
  pagesContent,
} from "./content";
import { type Languages, defaultLang, languageKeys, ui } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function getRoutePathWithLang(route: string, lang: Languages) {
  const normalizedRoutePath = route.startsWith("/") ? route : `/${route}`;
  return lang === defaultLang
    ? normalizedRoutePath
    : `/${lang}${normalizedRoutePath}`;
}

export function useSharedTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function useLocalTranslations(lang: Languages) {
  return function t(dict: Record<Languages, string>): string {
    return dict[lang];
  };
}

export function useLocalTranslationsWithElement(lang: Languages) {
  return function t(props: {
    dict: Record<Languages, string>;
  }): React.ReactNode {
    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
    return <span dangerouslySetInnerHTML={{ __html: props.dict[lang] }} />;
  };
}

export const isLanguages = (lang?: string): lang is Languages =>
  languageKeys.includes(lang as Languages);

export const isUIKey = (
  lang: Languages,
  key: string,
): key is keyof (typeof ui)[typeof lang] => {
  return Object.hasOwn(ui[lang], key);
};

// New utility functions for content-based translations
export function useContentTranslations(lang: Languages) {
  return {
    // About page content
    about: (key: AboutContentKey) => aboutContent[key][lang],

    // Navigation content
    navigation: (key: NavigationContentKey) => navigationContent[key][lang],

    // Pages content
    pages: (key: PagesContentKey) => pagesContent[key][lang],
  };
}

// Helper function for content with HTML (like profile description)
export function useContentTranslationsWithElement(lang: Languages) {
  return {
    // About page content with HTML support
    about: (key: AboutContentKey): React.ReactNode => {
      const sanitizedHtml = DOMPurify.sanitize(aboutContent[key][lang]);
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Content is sanitized with DOMPurify
      return <span dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
    },

    // Pages content with HTML support
    pages: (key: PagesContentKey): React.ReactNode => {
      const sanitizedHtml = DOMPurify.sanitize(pagesContent[key][lang]);
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Content is sanitized with DOMPurify
      return <span dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
    },
  };
}
