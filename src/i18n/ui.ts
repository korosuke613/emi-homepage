export type Languages = "ja" | "en";

export const languageNames: Record<Languages, string> = {
  ja: "日本語",
  en: "English",
};

export const languageKeys = Object.keys(languageNames) as Languages[];

export const defaultLang = "ja";

export const ui = {
  ja: {
    title: "Emi Makiura",
    header: "Emi Makiura",
    document: "ドキュメント",
    "document.desc": "Astroの仕組みと公式APIドキュメントをご覧ください。",
    "nav.about": "概要",
    "nav.twitter": "ツイッター",
  },
  en: {
    title: "Emi Makiura",
    header: "Emi Makiura",
    document: "Document",
    "document.desc": "Learn how Astro works and explore the official API docs.",
    "nav.about": "About",
    "nav.twitter": "Twitter",
  },
} as const;
