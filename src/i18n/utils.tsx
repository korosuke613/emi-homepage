import { type Languages, defaultLang, languageKeys, ui } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
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
