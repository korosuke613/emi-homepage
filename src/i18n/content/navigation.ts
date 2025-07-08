/**
 * Navigation Content
 * 
 * このファイルはナビゲーションに関する文言を管理します。
 * 非エンジニアの方が編集しやすいよう、日本語の文言をキーとして使用しています。
 * 
 * 編集方法:
 * 1. 変更したい文言を日本語で検索
 * 2. ja, en, lo の3言語すべてを同時に更新
 * 3. ナビゲーションテキストは簡潔に保ってください
 */

import type { Languages } from "../ui";

export const navigationContent = {
  // Page navigation
  "サブページ": {
    ja: "サブページ",
    en: "Sub Page",
    lo: "ໜ້າຍ່ອຍ",
  },
  "ホームへ": {
    ja: "ホームへ",
    en: "To Home",
    lo: "ໄປໜ້າຫຼັກ",
  },
} as const;

// Type helper for better type safety
export type NavigationContentKey = keyof typeof navigationContent;

// Helper function to get translated text
export function getNavigationText(key: NavigationContentKey, lang: Languages): string {
  return navigationContent[key][lang];
}