# npm → pnpm 移行計画

## Context

プロジェクトのパッケージマネージャーを npm から pnpm に移行する。pnpm はストリクトな依存管理、高速なインストール、ディスク効率の良い node_modules 構造を提供する。現在のプロジェクトはモノレポではない単一プロジェクトであり、移行は比較的シンプルに行える。

## 変更対象ファイル一覧

### 設定ファイル
| ファイル | 変更種別 |
|---|---|
| `.npmrc` | 新規作成 |
| `.tool-versions` | 変更（pnpm追加） |
| `package.json` | 変更（scripts, overrides, packageManager） |
| `pnpm-lock.yaml` | 新規生成（pnpm installで自動） |
| `package-lock.json` | 削除 |

### CI/CD・デプロイ
| ファイル | 変更種別 |
|---|---|
| `.github/workflows/ci.yaml` | 変更 |
| `.github/workflows/cache.yaml` | 変更 |
| `vercel.json` | 変更 |

### アプリケーション設定
| ファイル | 変更種別 |
|---|---|
| `playwright.config.ts` | 変更 |

### ドキュメント・開発設定
| ファイル | 変更種別 |
|---|---|
| `CLAUDE.md` | 変更 |
| `README.md` | 変更 |
| `.kiro/steering/tech.md` | 変更 |
| `.claude/settings.local.json` | 変更 |

### 変更不要
- `.github/workflows/claude-code-action.yaml` — npx は claude-code-action の独自環境で実行されるため不要
- `.gitignore` — `pnpm-debug.log*` が既に記載済み

## 実装手順

### Phase 1: 基盤準備（コミット1: `chore: migrate from npm to pnpm`）

#### 1. `.npmrc` 新規作成
```ini
save-exact=true
shamefully-hoist=true
```
- `save-exact=true`: パッケージ追加時に自動でバージョン固定（npm の `-E` 相当）
- `shamefully-hoist=true`: Astro + MUI + Emotion エコシステムの幽霊依存を許容。安定後に外して検証可能

#### 2. `.tool-versions` 変更
```
nodejs 24.14.0
pnpm 10.29.1
```
※ pnpm バージョンは実行時のインストール済みバージョン `10.29.1` を使用

#### 3. `package.json` 変更

**packageManager フィールド追加（Corepack対応）:**
```json
"packageManager": "pnpm@10.29.1"
```

**scripts 内の npm run を置換:**
```json
"preCommit": "pnpm run biome:apply",
"test": "pnpm run test:unit && pnpm run test:storybook && pnpm run test:e2e"
```

**overrides → pnpm.overrides に移動 + onlyBuiltDependencies 追加:**
```json
// 削除
"overrides": { "storybook": "$storybook" }

// 追加
"pnpm": {
  "overrides": {
    "storybook": "$storybook"
  },
  "onlyBuiltDependencies": [
    "@biomejs/biome",
    "@vercel/speed-insights",
    "esbuild",
    "sharp"
  ]
}
```
※ pnpm v10 ではセキュリティのため postinstall スクリプトを持つパッケージの明示的許可が必要

**Storybook アドオンのバージョン固定:**
```json
// ^9.0.9 → 9.0.9 に変更（pnpm の厳格な依存解決で 9.1.19 に解決され storybook@9.0.9 との不整合が発生したため）
"@storybook/addon-docs": "9.0.9",
"@storybook/addon-vitest": "9.0.9"
```

#### 4. lockfile 入れ替え
- `package-lock.json` を削除
- `pnpm install` を実行 → `pnpm-lock.yaml` 生成

#### 5. `vercel.json` 変更
```json
{
  "buildCommand": "pnpm run build",
  "installCommand": "pnpm install",
  "framework": "astro"
}
```

#### 6. `playwright.config.ts` 変更
```typescript
command: 'pnpm run dev',
```

#### 7. 動作確認
- `pnpm run build` 成功確認
- `pnpm run test:unit` 成功確認
- `pnpm run dev` 起動確認

### Phase 2: CI/CD 対応（コミット2: `ci: update GitHub Actions for pnpm`）

#### 8. `.github/workflows/ci.yaml`
```yaml
steps:
  - uses: actions/checkout@v4

  - uses: pnpm/action-setup@v4

  - uses: actions/setup-node@v4
    with:
      node-version-file: .tool-versions
      cache: pnpm

  - run: pnpm install --frozen-lockfile

  - name: Lint
    run: pnpm run biome

  - name: Build
    run: pnpm run build

  - name: Setup Playwright
    run: pnpm exec playwright install --with-deps chromium

  - name: e2e-test
    run: pnpm run test:e2e
```

重要: `pnpm/action-setup@v4` は `actions/setup-node` の**前**に配置。`packageManager` フィールドからバージョン自動検出。

#### 9. `.github/workflows/cache.yaml`
```yaml
jobs:
  pnpm:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .tool-versions
          cache: pnpm
      - run: pnpm install --frozen-lockfile
```

ジョブ名も `npm` → `pnpm` に変更。

### Phase 3: ドキュメント・設定更新（コミット3: `docs: update documentation for pnpm migration`）

#### 10. `CLAUDE.md` 更新
- 全ての `npm run` → `pnpm run` に置換
- `npm start` → `pnpm start`
- `npm install` → `pnpm install` / `pnpm add`
- `npx` → `pnpm exec`（devDependencies内のツール）/ `pnpm dlx`（一時実行）
- 「npm install時は -E を付けてバージョン固定する」→「`.npmrc` で `save-exact=true` を設定済みのため、`pnpm add パッケージ名` で自動的にバージョン固定される」

#### 11. `README.md` 更新
- 同様に npm → pnpm の置換

#### 12. `.kiro/steering/tech.md` 更新
- 同様に npm → pnpm の置換

#### 13. `.claude/settings.local.json` 更新
パーミッションの npm/npx パターンを pnpm に変更:
- `Bash(npm run check)` → `Bash(pnpm run check)`
- `Bash(npm run dev)` → `Bash(pnpm run dev)`
- `Bash(npm run biome:fix:*)` → `Bash(pnpm run biome:fix:*)`
- `Bash(npm run:*)` → `Bash(pnpm run:*)`
- `Bash(npx biome check:*)` → `Bash(pnpm exec biome check:*)`
- `Bash(npm audit:*)` → `Bash(pnpm audit:*)`
- `Bash(npx playwright test:*)` → `Bash(pnpm exec playwright test:*)`
- `Bash(npx tsc:*)` → `Bash(pnpm exec tsc:*)`

## 検証手順

| # | 検証項目 | コマンド |
|---|---|---|
| 1 | pnpm バージョン確認 | `pnpm --version` |
| 2 | 依存インストール | `pnpm install` |
| 3 | Biome チェック | `pnpm run biome` |
| 4 | 型チェック | `pnpm run check` |
| 5 | ビルド | `pnpm run build` |
| 6 | 開発サーバー | `pnpm run dev` → localhost:4321 確認 |
| 7 | ユニットテスト | `pnpm run test:unit` |
| 8 | Storybook テスト | `pnpm run test:storybook` |
| 9 | E2E テスト | `pnpm run test:e2e` |
| 10 | preCommit | `pnpm run preCommit` |
| 11 | CI 確認 | PR作成 → GitHub Actions 全ジョブ通過 |
| 12 | Vercel プレビュー | PR のプレビューデプロイ確認 |

## リスクと対策

- **幽霊依存によるビルド失敗**: `shamefully-hoist=true` で初期移行。安定後に除去して検証
- **Storybook overrides 互換性**: pnpm の `pnpm.overrides` で `$storybook` 参照が動作するか Phase 1 の動作確認で検証
- **Vercel 検出**: `pnpm-lock.yaml` + `packageManager` フィールドで確実に pnpm を使用

## 実装時の差分・発見事項

- **pnpm バージョン**: 計画時 `10.6.5` → 実際 `10.29.1`（ローカルインストール済みバージョンを使用）
- **pnpm.onlyBuiltDependencies**: pnpm v10 で必要になったビルドスクリプト許可リスト。計画時に未記載だったが実装時に追加
- **Storybook バージョン不整合**: `@storybook/addon-docs` と `@storybook/addon-vitest` が `^9.0.9` → `9.1.19` に解決され、`storybook@9.0.9` の `optionalEnvToBoolean` エクスポートが存在せずテスト起動時にクラッシュ。キャレットを外して `9.0.9` に固定して解決
- **settings.local.json**: `.gitignore` 対象のためコミットには含めず、ローカルのみ更新
