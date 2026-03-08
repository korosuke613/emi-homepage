# Dependabot アラート30件の解消計画

## Context

Dependabot アラートが30件オープン状態。実質ユニークな脆弱性は7パッケージに集約される（package.json と pnpm-lock.yaml の重複あり）。静的サイトのためサーバーサイド脆弱性の実害は限定的だが、パッケージアップデートで一掃する方がクリーン。

## ブランチ戦略

- `main` から新ブランチ `chore/resolve-dependabot-alerts` を作成
- フェーズごとにコミットを分割

---

## Phase 1: Astro エコシステム ✅ 完了

**実施結果:**
- `astro`: 5.9.3 → **5.18.0**
- `@astrojs/vercel`: 8.1.5 → **9.0.4**
- `@astrojs/react`: 4.3.0 → **4.4.2**
- `@astrojs/check`: 0.9.4 → **0.9.6**

**判明事項:** `devImageService: 'squoosh'` は Astro 5.18.0 でも問題なく動作。修正不要だった。

**検証:** ビルド成功（エラー0）、ユニットテスト全58件合格

---

## Phase 2: Storybook 一式 ✅ 完了

**実施結果（全てアトミックに更新）:**
- `storybook` + 全アドオン: 9.0.9 → **9.1.19**
- `@chromatic-com/storybook`: 4.0.0 → **4.1.3**

**判明事項:** `@latest` を使うと Storybook **10.x**（メジャーバージョンジャンプ）が導入されるため、明示的に 9.1.19 を指定した。

**検証:** ユニットテスト全58件合格

---

## Phase 3: Playwright ✅ 完了

**実施結果:**
- `@playwright/test`: 1.53.0 → **1.58.2**
- `playwright`: 1.53.0 → **1.58.2**（別パッケージとして存在していた）
- Chromium v1208 を再インストール

---

## Phase 4: 推移的依存の対応 ✅ 完了（一部制約あり）

**実施結果:**
- `isomorphic-dompurify`: 2.26.0 → **3.0.0**（メジャーバージョンアップ、API互換確認済み）
- `lodash`: `pnpm.overrides` で `">=4.17.23"` を追加
- `path-to-regexp`: astro 更新で解消済み

**pnpm `minimumReleaseAge` による制約で対応不可だったもの（全てリリース3日以内）:**

| Package | パッチ版 | リリース日 | 実害評価 |
|---|---|---|---|
| tar 7.5.10 | >=7.5.10 | 2026-03-05 | なし（推移的依存 `@astrojs/vercel > @vercel/nft > @mapbox/node-pre-gyp > tar`、静的サイトで攻撃面なし） |
| svgo 4.0.1 | >=4.0.1 | 2026-03-04 | なし（Billion Laughs DoS、信頼できないSVGを処理しない限り影響なし） |
| dompurify 3.3.2 | >=3.3.2 | 2026-03-05 | 低（`isomorphic-dompurify@3.0.0` が `dompurify@3.3.1` に依存、sanitize済みコンテンツのみ使用） |

→ **1週間後（2026-03-15頃）に `pnpm.overrides` で対応可能**

---

## Phase 5: 最終検証 ✅ 完了

- `pnpm run biome:apply` → 修正なし
- `pnpm run build` → 成功（26ページ生成）
- `pnpm run test:unit` → 全58テスト合格
- `pnpm audit` → 残存3件（上記 minimumReleaseAge 制約のもの）

**未実施:**
- [ ] Playwright MCP でブラウザ動作確認
- [ ] PR 作成
- [ ] Dependabot アラート残存数の確認（push & CI 通過後）

---

## コミット履歴

```
f9c5b7f chore: resolve remaining transitive dependency alerts
865825f chore: upgrade playwright to 1.58.2 to resolve security alert
01b43b5 chore: upgrade storybook to 9.1.19 to resolve security alerts
3c6c4dd chore: upgrade astro ecosystem to resolve security alerts
```

---

## 最終結果サマリー

| パッケージ | Before → After | 解消アラート |
|---|---|---|
| astro | 5.9.3 → 5.18.0 | 12件 |
| @astrojs/vercel | 8.1.5 → 9.0.4 | - |
| @astrojs/react | 4.3.0 → 4.4.2 | - |
| @astrojs/check | 0.9.4 → 0.9.6 | - |
| storybook 全体 | 9.0.9 → 9.1.19 | 2件 |
| playwright | 1.53.0 → 1.58.2 | 1件 |
| @playwright/test | 1.53.0 → 1.58.2 | 1件 |
| isomorphic-dompurify | 2.26.0 → 3.0.0 | - |
| lodash (override) | < 4.17.23 → >=4.17.23 | 1件 |
| path-to-regexp | astro更新で解消 | 1件 |

**解消: 約27件 / 30件（残存3件は minimumReleaseAge 制約、1週間後に対応可能）**

## Critical Files（変更されたファイル）

| ファイル | 変更内容 |
|---|---|
| `package.json` | パッケージバージョン更新 + `pnpm.overrides` に lodash 追加 |
| `pnpm-lock.yaml` | 自動再生成 |

※ `astro.config.mts`, `.storybook/main.ts`, `vitest.config.ts` は変更不要だった
