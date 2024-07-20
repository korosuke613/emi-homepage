export type Languages = "ja" | "en";

export const languageNames: Record<Languages, string> = {
  ja: "日本語",
  en: "English",
};

export const languageEmojis: Record<Languages, string> = {
  ja: "🇯🇵",
  en: "🇬🇧",
};

export const languageKeys = Object.keys(languageNames) as Languages[];

export const defaultLang = "ja";

export const ui = {
  ja: {
    title: "Emi Makiura",
    description: "牧浦えみのホームページです⭐️",
    header: "Emi Makiura",
    "route.career": "Career",
    "route.links": "Links",
    "route.blog": "Blog",
    document: "ドキュメント",
    "document.desc": "Astroの仕組みと公式APIドキュメントをご覧ください。",
    "nav.about": "概要",
    "nav.twitter": "ツイッター",
  },
  en: {
    title: "Emi Makiura",
    description: "This is Emi Makiura's homepage.",
    header: "Emi Makiura",
    "route.career": "Career",
    "route.links": "Links",
    "route.blog": "Blog",
    document: "Document",
    "document.desc": "Learn how Astro works and explore the official API docs.",
    "nav.about": "About",
    "nav.twitter": "Twitter",
  },
} as const;
