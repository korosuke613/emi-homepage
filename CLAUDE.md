# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際のClaude Code (claude.ai/code)向けのガイダンスです。

## 開発コマンド

**開発サーバー起動:**
```bash
npm run dev
# または
npm start
```

**ビルド:**
```bash
npm run build              # テストデータでビルド
npm run production-build   # microCMSの実データでビルド
```

**プレビュー:**
```bash
npm run preview            # テストデータでプレビュー
npm run production-preview # microCMSの実データでプレビュー
```

**開発サーバー（microCMSデータ使用）:**
```bash
npm run production-dev     # microCMSの実データで開発サーバー起動
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

**テスト:**
```bash
npm run test           # 全テスト実行（unit + storybook + e2e）
npm run test:unit      # Vitestユニットテスト実行
npm run test:unit:ui   # Vitestユニットテスト（UI付き）実行
npm run test:storybook # Storybookテスト実行
npm run test:e2e       # Playwrightテスト実行
npm run test:e2e:ui    # Playwrightテスト（UI付き）実行
```

## アーキテクチャ概要

これはReactコンポーネントを使った**Astroベースの静的サイト**で、国際化対応の個人ホームページです。

### 技術スタック
- **フレームワーク**: Astro 4.16+ (静的出力)
- **UI**: React + TypeScript + Material-UI (MUI Joy)
- **コンテンツ**: ハイブリッド方式 - ローカルAstro Content Collections + MicroCMS
- **スタイリング**: Emotion CSS-in-JS
- **コード品質**: Biome (ESLint/Prettierの代替)
- **テスト**: Vitest (ユニットテスト) + Storybook (コンポーネントテスト) + Playwright (E2Eテスト)
- **デプロイ**: Vercel (静的アダプター)

### 国際化 (i18n)
- **対応言語**: 日本語（デフォルト）、英語、ラオス語
- **ルーティング**: 
  - 日本語: `/`, `/career`, `/blog` (デフォルトルート)
  - 英語: `/en/`, `/en/career`, `/en/blog` (プレフィックス付き)
  - ラオス語: `/lo/`, `/lo/career`, `/lo/blog` (プレフィックス付き)
- **翻訳ファイル**: `/src/i18n/ui.ts` に共通翻訳
- **ユーティリティ**: `/src/i18n/utils.tsx` でReact統合

### コンテンツ管理
- **ブログコンテンツ**: デュアルシステム
  - `/src/content/blog/` のローカルMarkdownファイル（Astro Content Collections）
  - MicroCMS統合によるリモートコンテンツ（`/src/utils/microcms.ts`）
- **環境対応**: データ取得方法の環境別分岐
  - 通常のビルド: テストデータ（`.github/workflows/sample-data/blogs.json`）を使用
  - Vercel本番環境: 自動的にMicroCMSから実データを取得
  - 開発時にMicroCMSデータが必要な場合: `PRODUCTION=true`環境変数を使用
- **型安全**: コンテンツ検証用Zodスキーマ

### コンポーネントアーキテクチャ
- **デザインシステム**: `/src/components/` にStorybook統合
- **ページコンポーネント**: `/src/components/Page/` にレイアウトコンポーネント
- **ハイドレーション**: `client:visible`による選択的クライアントサイドハイドレーション
- **レスポンシブ**: MUI Joyブレークポイントでモバイルファースト設計

### フォント最適化
- **フォントpreload**: Layout.astroでNoto Serif JPの重要なウェイトをpreload
- **環境別フォント**: 開発時はシステムセリフフォント、本番時はNoto Serif JP
- **FOUC防止**: フォントプリロードによりFlash of Unstyled Contentを軽減
- **パフォーマンス最適化**: 開発時はフォント読み込みを無効化して高速化

### 重要ファイル
- **`astro.config.mts`**: メインAstro設定（i18nと統合）
- **`biome.json`**: コード品質設定
- **`src/content/config.ts`**: コンテンツコレクションスキーマ
- **`src/utils/staticRoute.ts`**: ページルート定義
- **`src/layouts/Layout.astro`**: フォントpreload設定
- **`src/utils/theme.ts`**: 共通テーマ設定とフォント定義
- **`src/components/MinimalThemeProvider/index.tsx`**: 最小限のMaterial-UIテーマプロバイダー
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

#### 基本ルール
- 日本語で回答する
- npm install時は -E を付けてバージョン固定する
- コードフォーマットには**ESLint/Prettierではなく、Biome**を使用
- 全コンポーネントには対応する**Storybookストーリー**が必要
- ブログ投稿は**多言語コンテンツ**対応 - content configのスキーマを確認
- MicroCMS統合は**環境別データ取得**を処理
- サイトに変更を加えた場合、playwright mcp を利用して動作確認
- ルートは**ビルド時に静的生成**されパフォーマンス最適化
- チャットを通じてCLAUDE.mdに書くべきがあれば随時更新
- コミット前に必ず `npm run preCommit` を実行してコード品質チェック＆フォーマット

#### 開発パフォーマンス
- **開発サーバー高速化**: フォント読み込みは本番環境でのみ実行
- **Vite最適化**: MUIコンポーネントとアイコンを事前バンドル
- **設定ファイル**: `astro.config.mts`でESモジュール対応とTypeScript統合
- **フォントフォールバック**: 開発時はシステムセリフフォントで代替表示

#### コミット・プルリクエストルール
- **言語**: コミット、プルリクエスト作成時は英語を使用
- **コミット粒度**: 機能別・論理的まとまり別にコミットを分ける（wipコミットは避ける）
- **コミットメッセージプレフィックス**:
  - `feat:` 新機能追加
  - `fix:` バグ修正
  - `ci:` テスト環境整備、CI/CD関連
  - `test:` テストファイルの追加・修正
  - `chore:` 設定ファイル更新、依存関係更新
  - `docs:` ドキュメント更新
- **プルリクエスト**: issueを元に作成する際は、descriptionに `closed #<issue番号>`を含める

#### Gitワークフロー
- **mainブランチ保護**: mainブランチへの直接コミットは禁止 - 必ず機能ブランチを作成してから作業
- **ブランチ命名**: `<type>/<brief-description>` 形式（例：`feat/add-new-component`, `fix/resolve-routing-issue`）
- **コミット**: 目的が複数個あると判断した場合、目的ごとにコミットする

#### テスト関連
- **テストケースタイトル**: 日本語で記述し、「〜するべき」という形式で書く
- **テスト実行**: 機能追加後は必ず関連するテストを実行して動作確認
