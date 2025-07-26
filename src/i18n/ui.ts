export type Languages = "ja" | "en" | "lo";

export const languageNames: Record<Languages, string> = {
  ja: "日本語",
  en: "English",
  lo: "ລາວ",
};

export const languageEmojis: Record<Languages, string> = {
  ja: "JA",
  en: "EN",
  lo: "LO",
};

export const languageKeys: Languages[] = ["ja", "en", "lo"];

export const defaultLang = "ja";

export const ui = {
  ja: {
    title: "Emi Makiura",
    description: "牧浦えみのホームページです⭐️",
    header: "Emi Makiura",
    "route.career": "Career",
    "route.link": "Link",
    "route.blog": "Blog",
    "link.sns": "SNS",
    "link.service": "サービス",
    document: "ドキュメント",
    "document.desc": "Astroの仕組みと公式APIドキュメントをご覧ください。",
    "nav.about": "概要",
    "nav.twitter": "ツイッター",
    "theme.light": "ライトモード",
    "theme.dark": "ダークモード",
    "theme.system": "システム設定に従う",
  },
  en: {
    title: "Emi Makiura",
    description: "This is Emi Makiura's homepage.",
    header: "Emi Makiura",
    "route.career": "Career",
    "route.link": "Link",
    "route.blog": "Blog",
    "link.sns": "SNS",
    "link.service": "Services",
    document: "Document",
    "document.desc": "Learn how Astro works and explore the official API docs.",
    "nav.about": "About",
    "nav.twitter": "Twitter",
    "theme.light": "Light mode",
    "theme.dark": "Dark mode",
    "theme.system": "Follow system settings",
  },
  lo: {
    title: "Emi Makiura",
    description: "ນີ້ແມ່ນໜ້າເວັບຂອງ Emi Makiura.",
    header: "Emi Makiura",
    "route.career": "Career",
    "route.link": "Link",
    "route.blog": "Blog",
    "link.sns": "SNS",
    "link.service": "ບໍລິການ",
    document: "ເອກະສານ",
    "document.desc": "ຮຽນຮູ້ວິທີການເຮັດວຽກຂອງ Astro ແລະສຳຫຼວດເອກະສານ API ທາງການ.",
    "nav.about": "ກ່ຽວກັບ",
    "nav.twitter": "Twitter",
    "theme.light": "ໂໝດແສງສະຫວ່າງ",
    "theme.dark": "ໂໝດມືດ",
    "theme.system": "ຕາມການຕັ້ງຄ່າຂອງລະບົບ",
  },
} as const;
