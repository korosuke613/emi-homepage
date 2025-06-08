# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際のClaude Code (claude.ai/code)向けのガイダンスです。

## 開発コマンド

**開発サーバー起動:**
```bash
npm run dev
# または
npm start
```

**本番ビルド:**
```bash
npm run build
```

**本番ビルドプレビュー:**
```bash
npm run preview
```

**コード品質とフォーマット:**
```bash
npm run biome        # Biomeリンター/フォーマッター実行
npm run biome:fix    # リンティング問題の自動修正
```

**コンポーネント開発:**
```bash
npm run storybook    # コンポーネント開発用Storybook起動
```

**E2Eテスト:**
```bash
npm run test:e2e     # Playwrightテスト実行
npm run test:e2e:ui  # Playwrightテスト（UI付き）実行
```

## アーキテクチャ概要

これはReactコンポーネントを使った**Astroベースの静的サイト**で、国際化対応の個人ホームページです。

### 技術スタック
- **フレームワーク**: Astro 4.16+ (静的出力)
- **UI**: React + TypeScript + Material-UI (MUI Joy)
- **コンテンツ**: ハイブリッド方式 - ローカルAstro Content Collections + MicroCMS
- **スタイリング**: Emotion CSS-in-JS
- **コード品質**: Biome (ESLint/Prettierの代替)
- **デプロイ**: Vercel (静的アダプター)

### 国際化 (i18n)
- **対応言語**: 日本語（デフォルト）と英語
- **ルーティング**: 
  - 日本語: `/`, `/career`, `/blog` (デフォルトルート)
  - 英語: `/en/`, `/en/career`, `/en/blog` (プレフィックス付き)
- **翻訳ファイル**: `/src/i18n/ui.ts` に共通翻訳
- **ユーティリティ**: `/src/i18n/utils.tsx` でReact統合

### コンテンツ管理
- **ブログコンテンツ**: デュアルシステム
  - `/src/content/blog/` のローカルMarkdownファイル（Astro Content Collections）
  - MicroCMS統合によるリモートコンテンツ（`/src/utils/microcms.ts`）
- **環境対応**: MicroCMSデータ取得は環境別（CI/Vercel/ローカル）
- **型安全**: コンテンツ検証用Zodスキーマ

### コンポーネントアーキテクチャ
- **デザインシステム**: `/src/components/` にStorybook統合
- **ページコンポーネント**: `/src/components/Page/` にレイアウトコンポーネント
- **ハイドレーション**: `client:visible`による選択的クライアントサイドハイドレーション
- **レスポンシブ**: MUI Joyブレークポイントでモバイルファースト設計

### 重要ファイル
- **`astro.config.mjs`**: メインAstro設定（i18nと統合）
- **`biome.json`**: コード品質設定
- **`src/content/config.ts`**: コンテンツコレクションスキーマ
- **`src/utils/staticRoute.ts`**: ページルート定義
- **`vercel.json`**: デプロイ設定

### ソフトウェア仕様

詳細な外部仕様については @SPEC.md を参照してください。

#### 実装関連
- **実装ファイル**: 
  - `/src/pages/[...lang]/blog/[...slug].astro`: 多言語ブログページ
  - `/src/pages/blog/[...slug].astro`: デフォルト言語ブログページ  
  - `/src/components/Page/Header/LangSelector/index.tsx`: 言語切り替え機能
  - `/src/layouts/Blog.astro`: ブログレイアウト（langパラメータ受け取り）
  - `/src/components/Blog/LanguageFallbackNotice/`: 言語フォールバック通知

#### パス生成ルール
- **全ブログ×全言語**: getStaticPaths()で全ブログに対して全言語のパスを生成
- **URLパラメータ優先**: `Blog.astro`では`blog.language[0]`ではなく`Astro.params.lang`を使用
- **言語アイコン表示**: LangSelectorはURLの言語パラメータに基づいてアイコン表示

#### テスト
- **E2Eテスト**: `/e2e/multilingual-blog.spec.ts` でブログフォールバック機能をテスト
- **ブログ一覧テスト**: `/e2e/blog-list.spec.ts` でブログ一覧の言語絵文字機能をテスト
- **テストデータ**: `.github/workflows/sample-data/blogs.json` を使用（MicroCMS非依存）
- **実行**: `npm run test:e2e` で多言語切り替えとURL正規化をテスト

### 開発時の注意点
- 日本語で回答する
- コミットはタスクごとにこまめに行う
- npm install時は -E を付けてバージョン固定する
- コードフォーマットには**ESLint/Prettierではなく、Biome**を使用
- 全コンポーネントには対応する**Storybookストーリー**が必要
- ブログ投稿は**多言語コンテンツ**対応 - content configのスキーマを確認
- MicroCMS統合は**環境別データ取得**を処理
- サイトに変更を加えた場合、playwright mcp を利用して動作確認
- ルートは**ビルド時に静的生成**されパフォーマンス最適化
- チャットを通じてCLAUDE.mdに書くべきがあれば随時更新
- コミット、プルリクエスト作成時は日本語を使用
- issueを元にプルリクエストを作成する際は、プルリクエストのdescriptionに `closed #<issue番号>`を含める
- テストケースのタイトルは日本語で記述し、「〜するべき」という形式で書く
