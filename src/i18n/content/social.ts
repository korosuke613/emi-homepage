/**
 * Social Networks Content
 * 
 * このファイルはソーシャルネットワークに関する文言を管理します。
 * 非エンジニアの方が編集しやすいよう、日本語の文言をキーとして使用しています。
 * 
 * 編集方法:
 * 1. 変更したい文言を日本語で検索
 * 2. ja, en, lo の3言語すべてを同時に更新
 * 3. SNSアカウントの説明文は簡潔に保ってください
 */

import type { Languages } from "../ui";

export const socialContent = {
  // Social network descriptions
  "顔": {
    ja: "顔",
    en: "Face",
    lo: "ໜ້າ",
  },
  "連絡つきやすい": {
    ja: "連絡つきやすい", 
    en: "Easy to contact",
    lo: "ຕິດຕໍ່ງ່າຍ",
  },
  "社内広報メイン": {
    ja: "社内広報メイン",
    en: "Main corporate PR",
    lo: "ປະຊາສຳພັນບໍລິສັດຫຼັກ",
  },
} as const;

// Type helper for better type safety
export type SocialContentKey = keyof typeof socialContent;

// Helper function to get translated text
export function getSocialText(key: SocialContentKey, lang: Languages): string {
  return socialContent[key][lang];
}