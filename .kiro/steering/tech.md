# 技術スタック

## コアフレームワーク
- **Astro 5.9+**: React統合による静的サイトジェネレーター
- **TypeScript**: Astroの厳密なtsconfigを拡張した厳密設定
- **React 18**: JSXサポート付きコンポーネントライブラリ

## UI・スタイリング
- **MUI Joy**: メインコンポーネントライブラリ
- **Emotion**: CSS-in-JSスタイリングソリューション
- **Noto Serif JP**: 日本語フォント（本番環境のみ）
- **React Icons**: アイコンライブラリ

## コンテンツ管理
- **Astro Content Collections**: ローカルMarkdownブログ投稿
- **MicroCMS**: SDK経由のヘッドレスCMS統合
- **Zod**: コンテンツのスキーマ検証

## 開発ツール
- **Biome**: コードフォーマットとリンティング（ESLint/Prettierの代替）
- **Storybook**: コンポーネント開発とテスト
- **Vitest**: ユニットテストフレームワーク
- **Playwright**: E2Eテスト
- **Vercel**: アナリティクス付きデプロイプラットフォーム

## よく使うコマンド

```bash
# 開発
pnpm run dev                 # 開発サーバー起動（高速フォント）
pnpm run production-dev      # MicroCMSデータでの開発

# ビルド
pnpm run build              # チェック付き本番ビルド
pnpm run preview            # 本番ビルドのプレビュー

# テスト
pnpm run test               # 全テスト実行
pnpm run test:unit          # ユニットテストのみ
pnpm run test:e2e           # E2Eテストのみ
pnpm run test:storybook     # Storybookテスト

# コード品質
pnpm run biome              # コード品質チェック
pnpm run biome:apply        # コード問題の修正
pnpm run preCommit          # プリコミットフック

# Storybook
pnpm run storybook          # Storybook開発サーバー起動
pnpm run build-storybook    # Storybookビルド
```

## パフォーマンス最適化
- 本番環境でのフォントプリロード
- Vite依存関係の事前バンドル
- MUIコンポーネントの手動チャンク分割
- 開発時のフォントフォールバック
