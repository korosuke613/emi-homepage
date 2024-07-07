# emi-homepage

## 設計

- ランタイム
  - Node.js
  - ~~Deno~~
- 言語: TypeScript
- UIフレームワーク: React
- コンポーネントライブラリ
  - MUI
  - Kuma UI
  - [React Aria](https://react-spectrum.adobe.com/react-aria/)
- ビルドツール
  - Vite
  - Turborepo
- デプロイ先
  - ~~GitHub Pages~~
  - Vercel
  - ~~Deno Deploy~~
- ドメイン
  - （要望）なんでもいい
  - ある程度任意につけられる Vercel に上げるようにする

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e non-monorepo
```

## What's inside?

This Turborepo uses a single, non-monorepo project (in this case, a single Next.js application). Since [Turborepo 1.6](https://turbo.build/blog/turbo-1-6-0#any-codebase-can-use-turborepo), you can use Turborepo for non-monorepo projects as well as monorepos.

### Build

To build all apps and packages, run the following command:

```
pnpm turbo build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm turbo dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
