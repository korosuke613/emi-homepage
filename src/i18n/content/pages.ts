/**
 * General Page Content
 *
 * このファイルは一般的なページコンテンツの文言を管理します。
 * 非エンジニアの方が編集しやすいよう、日本語の文言をキーとして使用しています。
 *
 * 編集方法:
 * 1. 変更したい文言を日本語で検索
 * 2. ja, en, lo の3言語すべてを同時に更新
 * 3. ページタイトルやメッセージは適切な長さに保ってください
 */

import type { Languages } from "../ui";
import type { ContentRecord } from "./types";

export const pagesContent: ContentRecord = {
  // Welcome messages
  "牧浦えみのホームページへようこそ！": {
    ja: "牧浦えみのホームページへようこそ！",
    en: "Welcome to Emi Makiura's Homepage!",
    lo: "ຍິນດີຕ້ອນຮັບສູ່ໜ້າເວັບຂອງເອະມິມະກິອຸລະ!",
  },

  // Birthday celebration messages
  "牧浦えみ！祝 25 歳！！": {
    ja: "牧浦えみ！祝 25 歳！！",
    en: "Emi Makiura! Happy 25th Birthday!!",
    lo: "ມາກິອູຣະ ເອມີ! ຊູ່ມເຊີຍວັນເກີດ 25 ປີ!!",
  },
  めでたいねぇ: {
    ja: "めでたいねぇ",
    en: "How wonderful!",
    lo: "ດີໃຈຈັງ!",
  },

  // Service descriptions (for link page)
  障害者就労継続支援: {
    ja: "障害者就労継続支援",
    en: "Continuous employment support for people with disabilities",
    lo: "ການສະໜັບສະໜູນການຈ້າງງານຕໍ່ເນື່ອງສຳລັບຄົນພິການ",
  },
  英語の授業: {
    ja: "英語の授業",
    en: "English lessons",
    lo: "ບົດຮຽນພາສາອັງກິດ",
  },
  デジタル絵作成: {
    ja: "デジタル絵作成",
    en: "Digital illustration creation",
    lo: "ການສ້າງຮູບແຕ້ມດິຈິຕອລ",
  },
} as const;

// Type helper for better type safety
export type PagesContentKey = keyof typeof pagesContent;

// Helper function to get translated text
export function getPagesText(key: PagesContentKey, lang: Languages): string {
  return pagesContent[key][lang];
}
