# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ルール
- **重要** やりとりは日本語で回答すること

## 開発コマンド

**開発サーバー起動:**
```bash
pnpm run dev                # テストデータで開発サーバー起動
pnpm run production-dev     # microCMSの実データで開発サーバー起動
```

**ビルド・プレビュー:**
```bash
pnpm run build              # テストデータでビルド（astro check含む）
pnpm run production-build   # microCMSの実データでビルド
pnpm run preview            # テストデータでプレビュー
pnpm run production-preview # microCMSの実データでプレビュー
```

**コード品質とフォーマット:**
```bash
pnpm run biome        # Biomeリンター/フォーマッター実行（src/のみ対象）
pnpm run biome:apply  # リンティング問題の自動修正
pnpm run preCommit    # コミット前品質チェック（= biome:apply）
```

**テスト:**
```bash
pnpm run test           # 全テスト実行（unit + storybook + e2e）
pnpm run test:unit      # Vitestユニットテスト実行
pnpm run test:storybook # Storybookテスト実行
pnpm run test:e2e       # Playwrightテスト実行
```

**単一テスト実行:**
```bash
pnpm run test:unit -- src/path/to/test.test.ts   # 特定のユニットテスト
pnpm run test:e2e -- e2e/specific.spec.ts         # 特定のE2Eテスト
```

**プロジェクトチェック:**
```bash
pnpm run check    # Astro型チェック（astro check）
```

## アーキテクチャ概要

Reactコンポーネントを使った**Astroベースの静的サイト**。国際化対応の個人ホームページ。

### 技術スタック
- **フレームワーク**: Astro (静的出力) + Vercelアダプター
- **UI**: React + TypeScript + Material-UI (MUI Joy)
- **コンテンツ**: ローカルAstro Content Collections + MicroCMS（ハイブリッド）
- **スタイリング**: Emotion CSS-in-JS
- **コード品質**: Biome（ESLint/Prettierの代替、`src/`のみ対象）
- **テスト**: Vitest + Storybook + Playwright

### 国際化 (i18n)
- **対応言語**: 日本語（デフォルト）、英語、ラオス語
- **ルーティング**: 日本語はプレフィックスなし（`/blog`）、英語・ラオス語はプレフィックス付き（`/en/blog`, `/lo/blog`）
- **翻訳**: `/src/i18n/ui.ts`（翻訳定義）、`/src/i18n/utils.tsx`（React統合）

### コンテンツ管理
- **ローカル**: `/src/content/blog/` のMarkdownファイル（Astro Content Collections、Zodスキーマで型安全）
- **リモート**: MicroCMS統合（`/src/utils/microcms.ts`）
- **環境別分岐**:
  - 通常ビルド: テストデータ（`.github/workflows/sample-data/blogs.json`）
  - Vercel本番: MicroCMSから実データ取得
  - 開発時に実データ: `PRODUCTION=true`環境変数

### コンポーネントアーキテクチャ
- **ページコンポーネント**: `/src/components/Page/` にレイアウトコンポーネント
- **ハイドレーション**: `client:visible`による選択的クライアントサイドハイドレーション
- **フォント**: 本番=Noto Serif JP（全ウェイトpreload + `font-display: swap`）、開発=システムセリフフォント

### 重要ファイル
- **`astro.config.mts`**: Astro設定（i18n、Vite最適化、MUI事前バンドル）
- **`biome.json`**: Biome設定（`src/`スコープ、`noUnusedImports: error`）
- **`src/content/config.ts`**: コンテンツコレクションスキーマ
- **`src/utils/staticRoute.ts`**: ページルート定義
- **`src/layouts/Layout.astro`**: メインレイアウト（フォントpreload）
- **`src/components/ThemeProvider/index.tsx`**: 環境別フォント設定
- **`src/styles/fonts-optimized.css`**: フォント定義（`font-display: swap`）

### ソフトウェア仕様

詳細な外部仕様については docs/SPEC.md を参照。

## 開発時の注意点

### 基本ルール
- `.npmrc`で`save-exact=true`設定済み — `pnpm add`で自動バージョン固定
- コードフォーマットは**Biome**（ESLint/Prettierではない）
- **コード編集後は必ず`pnpm run biome:apply`を実行**
- 全コンポーネントには対応する**Storybookストーリー**が必要
- サイト変更後はplaywright mcpで動作確認
- コミット前に必ず`pnpm run preCommit`を実行

### コミット・プルリクエストルール
- **言語**: コミット、プルリクエスト作成時は英語を使用
- **コミット粒度**: 機能別・論理的まとまり別に分ける（wipコミットは避ける）
- **プレフィックス**: `feat:` / `fix:` / `ci:` / `test:` / `chore:` / `docs:`
- **PR**: issueベースの場合、descriptionに`closed #<issue番号>`を含める

### Gitワークフロー
- **mainブランチ保護**: 直接コミット禁止 — 必ず機能ブランチを作成
- **ブランチ命名**: `<type>/<brief-description>`（例: `feat/add-new-component`）
- **コミット**: 目的が複数あれば目的ごとに分割

### テスト関連
- **テストケースタイトル**: 日本語、「〜するべき」形式
- **テスト実行**: 機能追加後は必ず関連テストを実行
- **テストデータ**: `.github/workflows/sample-data/blogs.json`（MicroCMS非依存）
