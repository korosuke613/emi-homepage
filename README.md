# emi-homepage

[![Vercel](https://vercelbadges.com/api/korosuke613/emi-homepage)](https://emi-homepage.vercel.app)

牧浦えみの個人ホームページ（多言語対応）

## 技術スタック

- **フレームワーク**: Astro 4.16+ (静的サイト生成)
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
# 開発サーバー起動（高速化されたフォント設定）
npm run dev

# 本番ビルド
npm run build

# MicroCMSデータでの開発
npm run production-dev

# テスト実行
npm run test

# コード品質チェック
npm run biome
```

## パフォーマンス最適化

### 開発サーバー高速化
- フォント読み込みを本番環境でのみ実行
- 開発時はシステムセリフフォントで代替
- Vite依存関係の事前最適化

### 本番最適化
- Noto Serif JPフォントのpreload
- FOUC (Flash of Unstyled Content) 防止
- チャンク分割による効率的な読み込み

## アーキテクチャ

詳細な設計情報は [CLAUDE.md](./CLAUDE.md) と [SPEC.md](./SPEC.md) を参照。
