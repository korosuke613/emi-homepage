# emi-homepage

[![Vercel](https://vercelbadges.com/api/korosuke613/emi-homepage)](https://emi-homepage.vercel.app)

牧浦えみの個人ホームページ（多言語対応）

## 技術スタック

- **フレームワーク**: Astro (静的サイト生成) + Vercelアダプター
- **言語**: TypeScript
- **UI**: React + MUI Joy
- **スタイリング**: Emotion CSS-in-JS
- **フォント**: Noto Serif JP (本番) / システムセリフ (開発)
- **国際化**: 日本語・英語・ラオス語対応
- **コンテンツ**: Astro Content Collections + MicroCMS
- **テスト**: Vitest + Storybook + Playwright
- **コード品質**: Biome
- **デプロイ**: Vercel

## 開発

```bash
# 開発サーバー起動（テストデータ使用、フォント読み込み無効で高速）
pnpm run dev

# MicroCMSの実データで開発
pnpm run production-dev

# ビルド（astro check含む）
pnpm run build

# テスト実行（unit + storybook + e2e）
pnpm run test

# コード品質チェック・自動修正
pnpm run biome:apply
```

## ドキュメント

- [CLAUDE.md](./CLAUDE.md) - 開発ガイダンス・アーキテクチャ概要
- [docs/SPEC.md](./docs/SPEC.md) - 外部仕様（多言語ブログ・i18n等）
- [docs/CONTENT_EDITING_GUIDE.md](./docs/CONTENT_EDITING_GUIDE.md) - 文言編集ガイド（非エンジニア向け）
