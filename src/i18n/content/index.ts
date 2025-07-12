/**
 * Content Index
 *
 * このファイルはすべての文言ファイルを統合しています。
 * 非エンジニアの方は、このファイルを編集する必要はありません。
 *
 * 各カテゴリーの文言を編集する場合は、以下のファイルを参照してください:
 * - About page: about.ts
 * - Social networks: social.ts
 * - Navigation: navigation.ts
 * - General pages: pages.ts
 */

export * from "./about";
export * from "./navigation";
export * from "./pages";

// Re-export all content in a single object for convenience
export { aboutContent } from "./about";
export { navigationContent } from "./navigation";
export { pagesContent } from "./pages";
