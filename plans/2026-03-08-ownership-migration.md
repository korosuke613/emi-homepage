# オーナーシップ移行プラン（更新版）

## Context

Git（GitHub）・Vercel・microCMS の3サービスのオーナーを移行する。
- **GitHub**: `korosuke613` → `Amybystara`（Transfer方式）
- **Vercel**: `korosuke613` → `amybystera`（Transfer方式、フォールバックとして新規作成）
- **microCMS**: `korosuke613613` → `e.makiura.stara`（権限移行のみ、サービスはそのまま）

カスタムドメインなし。microCMSのサービスドメイン・APIキーは変更なし。

### 完了済み
- ~~Phase 0: claude-code-action ワークフロー削除~~ → PR #73 でマージ済み
- npm → pnpm 移行 → PR #72 でマージ済み

---

## Phase 1: コードベース修正（Claude Code で対応）

他フェーズに依存しないため最初に実施。

### 修正対象ファイル

| ファイル | 変更内容 |
|---|---|
| `README.md:3` | Vercelバッジ URL の `korosuke613` → `Amybystara` |
| `CONTENT_EDITING_GUIDE.md:18` | GitHub URL の `korosuke613` → `Amybystara` |

※ `src/components/SocialNetworks/SocialNetworksTemplate/SocialNetworksTemplate.stories.tsx:58` の `korosuke613.dev` はStorybook用のダミーデータなので変更不要。
※ `.claude/settings.local.json` はローカル設定（gitignore済み）なので対象外。

## Phase 2: GitHub リポジトリ Transfer（手動・GitHub側作業）

1. `Amybystara` のGitHubアカウントが存在することを確認
2. **GitHub** → `korosuke613/emi-homepage` → Settings → General → Danger Zone → "Transfer repository"
3. 新オーナーとして `Amybystara` を指定
4. Transfer 完了後、旧URL（`korosuke613/emi-homepage`）から自動リダイレクトされる
5. ローカルのリモートURLを更新:
   ```bash
   git remote set-url origin https://github.com/Amybystara/emi-homepage.git
   ```

## Phase 3: Vercel プロジェクト移行（手動・Vercel側作業）

GitHub Transfer 完了後に実施。**Transfer 方式**を使用し、ドメイン（`emi-homepage.vercel.app`）・環境変数・デプロイ履歴を維持する。

1. **`amybystera` の Vercel アカウントを作成**
   - GitHub `Amybystara` アカウントで Vercel にサインアップ（Git連携が楽）
   - 個人アカウントは自動的に「チーム」として作成される（2024年1月以降の仕様）
2. **Amybystera が korosuke613 をチームメンバーとして招待**
   - Transfer を実行するには、korosuke613 が移行先チームのメンバーである必要がある
3. **korosuke613 が Transfer を実行**:
   - `emi-homepage` プロジェクト → Settings → General → Transfer Project
   - Transfer 先として Amybystera のチームを選択
   - ドメイン・環境変数・デプロイ履歴がすべて引き継がれる（ゼロダウンタイム）
4. **Transfer 後の確認**: Amybystera 側でサイトが正常表示されることを確認
5. **korosuke613 が Amybystera のチームから退出**

### Transfer がうまくいかない場合（フォールバック）

Transfer 時に Pro プランへのアップグレードや支払い方法を求められた場合は、新規プロジェクト作成方式に切り替える:

1. korosuke613 が旧プロジェクトの環境変数（`MICROCMS_SERVICE_DOMAIN`、`MICROCMS_API_KEY`）を控えて共有
2. Amybystera が Vercel で `Amybystara/emi-homepage` をインポートして新規プロジェクト作成
3. 環境変数を手動設定してデプロイ
4. korosuke613 が旧プロジェクトを削除

※ フォールバック方式ではドメインが `emi-homepage-<hash>.vercel.app` 等に変更される可能性がある。`README.md` のバッジURLを再確認すること。

## Phase 4: microCMS オーナー移行（手動・サービス側作業）

microCMSはサービスそのまま、権限だけ移行。

1. **microCMS管理画面** → 設定 → メンバー管理
2. `e.makiura.stara` が「管理者（ADMIN）」であることを確認
3. `korosuke613613` のロールを下げる or メンバーから除外
4. ※ サービスドメイン（`pdrqewbu6y`）とAPIキーは変更なし → 環境変数の更新は不要

## Phase 5: 動作確認

1. **本番サイト**: `emi-homepage.vercel.app`（Transfer方式の場合）でサイトが正常表示されること
2. **microCMS連携**: `pnpm run production-build` でデータ取得可能なこと
3. **CI/CD**: PRを作成し、GitHub Actions（ci.yaml）が正常動作すること
4. **自動デプロイ**: mainへのpushでVercel自動ビルド・デプロイが動くこと

## 実行順序

```
1. コードベース修正           （Phase 1）← Claude Code で実施（README.md, CONTENT_EDITING_GUIDE.md）
2. GitHub Transfer           （Phase 2）← 手動
3. Vercel Transfer            （Phase 3）← GitHub Transfer 完了後・手動
4. microCMS 権限移行        （Phase 4）← 手動
5. 動作確認                  （Phase 5）
```

## Claude Code 対応範囲

Phase 1 のコード修正（2ファイルの `korosuke613` → `Amybystara` 置換）。Phase 2/3/4 はGUI操作が必要なためユーザーが手動で実施。

## 検証方法

- `pnpm run biome:ci` でリント通過を確認
- `pnpm run build` でビルド成功を確認
