/**
 * Content Types for Validation
 *
 * このファイルは文言ファイルの型定義を管理します。
 * TypeScriptの型チェックにより、全言語キーの整合性を保証します。
 */

import type { Languages } from "../ui";

/**
 * 多言語文言の基本型
 * 全ての対応言語（ja, en, lo）のキーが必須
 */
export type MultilingualContent = {
  [K in Languages]: string;
};

/**
 * 文言コンテンツの基本構造
 * 各キーに対して全言語の文言が必要
 */
export type ContentRecord = {
  [key in string]: MultilingualContent;
};
