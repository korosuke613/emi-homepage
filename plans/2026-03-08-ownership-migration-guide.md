# オーナーシップ移行手順書

この手順書では、emi-homepage の各サービスのオーナーシップを **korosuke613** から **Amybystera** に移行する具体的な操作手順を記載します。

## 登場人物

| 名前 | 役割 | 備考 |
|---|---|---|
| **korosuke613** | 現オーナー（エンジニア） | GitHub / Vercel / microCMS の現管理者 |
| **Amybystera** | 新オーナー | GitHub: `Amybystara` / Vercel: `amybystera` / microCMS: `e.makiura.stara` |

## 前提条件

- [ ] Amybystera が GitHub アカウント `Amybystara` を持っている
- [ ] Phase 1（コードベース修正）の PR がマージ済み

---

## Step 1: GitHub リポジトリの Transfer

### korosuke613 がやること

1. ブラウザで https://github.com/korosuke613/emi-homepage を開く
2. ページ上部の **「Settings」** タブをクリック
3. 左メニューの **「General」** をクリック（通常は最初から選ばれている）
4. ページの一番下までスクロールし、赤い枠の **「Danger Zone」** セクションを見つける
5. **「Transfer repository」** の横にある **「Transfer」** ボタンをクリック
6. ダイアログが表示されるので:
   - **「New owner」** の欄に `Amybystara` と入力
   - 確認のためリポジトリ名 `korosuke613/emi-homepage` を入力
   - **「I understand, transfer this repository」** をクリック

7. Transfer が完了したら Amybystera に「Transfer 完了したよ」と連絡する

> **補足**: Transfer 後も旧URL（`github.com/korosuke613/emi-homepage`）からは自動でリダイレクトされるので、既存のリンクが壊れることはありません。

### Amybystera がやること

1. korosuke613 から Transfer の連絡を受けたら、GitHub のメール通知を確認する
   - GitHub から「リポジトリの Transfer を承認してください」というメールが届いている場合がある
   - メール内のリンクをクリックして承認する
2. ブラウザで https://github.com/Amybystara/emi-homepage を開き、リポジトリが表示されることを確認する

---

## Step 2: Vercel プロジェクトの Transfer

> **重要**: Step 1（GitHub Transfer）が完了してから実施してください。

Vercel にはプロジェクトの Transfer 機能があり、**ゼロダウンタイム**で移行できます。ドメイン（`emi-homepage.vercel.app`）、環境変数、デプロイ履歴がすべて引き継がれます。

### Amybystera がやること（事前準備）

Vercel アカウントを作成する:

1. ブラウザで https://vercel.com にアクセス
2. **「Sign Up」** をクリック
3. **「Continue with GitHub」** を選択（GitHub の `Amybystara` アカウントでログイン）
   - GitHub との連携を求められたら **「Authorize」** をクリック
4. Hobby（無料プラン）を選択
5. アカウント作成が完了する
   - 2024年1月以降、個人アカウントは自動的に「チーム」（`amybysteras-projects` のような名前）として作成される
6. korosuke613 に「Vercel アカウント作ったよ」と連絡する

### Amybystera がやること（korosuke613 をチームに招待）

Transfer を実行するには、korosuke613 が Amybystera のチームのメンバーである必要がある:

1. Vercel にログインした状態で、ダッシュボード左上のチーム名をクリック
2. **「Settings」** → **「Members」** をクリック
3. **「Invite」** ボタンをクリック
4. korosuke613 のメールアドレスを入力して招待を送る
5. korosuke613 に「招待を送ったよ」と連絡する

### korosuke613 がやること

#### 2-1. Amybystera のチームに参加する

1. メールで届いた Vercel チーム招待を確認する
2. 招待リンクをクリックして **「Accept」** する

#### 2-2. Transfer を実行する

1. https://vercel.com にログイン
2. 自分のチーム（korosuke613 側）に切り替え、`emi-homepage` プロジェクトを開く
3. ページ上部の **「Settings」** をクリック
4. 左メニューの **「General」** をクリック
5. ページの一番下までスクロールし、**「Transfer Project」** セクションを見つける
6. **「Transfer」** ボタンをクリック
7. Transfer 先の選択画面が表示される:
   - **Amybystera のチーム**（`amybysteras-projects` 等の名前）を選択する
8. 確認画面で以下を確認する:
   - 移行されるドメイン、エイリアス、環境変数の一覧が表示される
   - プロジェクト名はそのまま `emi-homepage` でOK
9. 内容を確認したら **「Transfer」** をクリック
10. Transfer が完了するまで待つ（10秒〜10分程度）
11. 完了メールが届いたら Amybystera に連絡する

> **注意**: Transfer 中は新しいデプロイやプロジェクト設定の変更はできません。Transfer 完了後に自動的に使えるようになります。
>
> **注意**: Transfer 時に「支払い方法の登録」や「Pro プランへのアップグレード」を求められた場合は、無理に進めず一旦中止し、フォールバック手順（後述）に切り替えてください。

### Amybystera がやること（Transfer 完了後）

1. https://vercel.com にログイン
2. ダッシュボードに `emi-homepage` プロジェクトが表示されていることを確認する
3. プロジェクトを開き、最新のデプロイ URL にアクセスしてサイトが表示されることを確認する
4. 問題がなければ、GitHub（`Amybystara/emi-homepage`）の Settings → Integrations で **Vercel の GitHub App** が接続されていることを確認する
   - 接続されていない場合は、Vercel のプロジェクト Settings → Git から GitHub リポジトリを再接続する
5. 問題があれば korosuke613 に連絡する

> **補足**: Transfer 方式では環境変数（`MICROCMS_SERVICE_DOMAIN`、`MICROCMS_API_KEY` など）は自動的にコピーされるため、手動で再設定する必要はありません。

### korosuke613 がやること（すべて完了後）

Amybystera のチームから自分を除外する（不要になったため）:

1. Vercel にログインし、Amybystera のチームに切り替える
2. **「Settings」** → **「Members」** で自分を削除する、または Amybystera に削除を依頼する

### Transfer がうまくいかない場合（フォールバック）

Transfer 先のアカウントが選択肢に表示されないなど、Transfer が実行できない場合は、以下の代替手順で移行します。この場合、ドメイン（`emi-homepage.vercel.app`）は変更される可能性があります。

1. korosuke613 が旧プロジェクトの環境変数の値をメモして Amybystera に共有する
2. Amybystera が Vercel ダッシュボードで **「Add New...」** → **「Project」** から `Amybystara/emi-homepage` をインポートする
3. 環境変数（`MICROCMS_SERVICE_DOMAIN`、`MICROCMS_API_KEY`、`PRODUCTION=true`）を手動で設定する
4. デプロイして動作確認する
5. korosuke613 が旧プロジェクトを削除する

---

## Step 3: microCMS の権限移行

### korosuke613 がやること

1. https://app.microcms.io にログイン
2. 対象サービスを開く
3. 左メニューの **「設定」**（歯車アイコン）をクリック
4. **「メンバー」** または **「メンバー管理」** をクリック
5. `e.makiura.stara`（Amybystera のアカウント）のロールを確認する:
   - **「管理者（ADMIN）」** になっていればOK
   - なっていなければロールを **「管理者」** に変更する
6. Amybystera に「microCMS の管理者権限を確認して」と連絡する

### Amybystera がやること

1. https://app.microcms.io にログイン（`e.makiura.stara` アカウント）
2. 対象サービスを開く
3. 左メニューの **「設定」** → **「メンバー」** を開き、自分が **「管理者（ADMIN）」** になっていることを確認する
4. 確認できたら korosuke613 に「OK」と連絡する

### korosuke613 がやること（Amybystera の確認後）

1. microCMS の **「メンバー管理」** を開く
2. 自分（`korosuke613613`）のロールを **「閲覧者」** に下げる、またはメンバーから除外する

---

## Step 4: 動作確認

### Amybystera がやること

- [ ] Vercel の `emi-homepage.vercel.app` でサイトが正常に表示される
- [ ] ブログページが表示される（microCMS からデータを取得できている）
- [ ] 各言語（日本語 / English / ລາວ）のページが表示される

### korosuke613 がやること

- [ ] GitHub Actions の CI が動作する（テスト用 PR を作成して確認）
- [ ] main ブランチへの push で Vercel の自動デプロイが動く
- [ ] `README.md` の Vercel バッジが正しく表示される
  - バッジ URL に含まれるオーナー名が新しい Vercel アカウントと一致しているか確認
  - 一致しない場合はバッジ URL を修正する

---

## トラブルシューティング

### Vercel の Transfer がうまくいかない場合
- **Transfer 先が選択肢に表示されない**: Amybystera の Vercel アカウントが正しく作成されているか確認する。korosuke613 が Amybystera をチームメンバーとして招待する必要がある場合がある
- **Transfer 後にデプロイが失敗する**: Settings → Environment Variables で環境変数が正しくコピーされているか確認。Settings → Git で GitHub リポジトリの接続を確認
- **どうしても Transfer できない場合**: 手順書の「フォールバック」セクションの手順で新規プロジェクト作成方式に切り替える
- korosuke613 に連絡して一緒に確認する

### GitHub でリポジトリが見つからない場合
- Transfer 完了のメール通知を確認する
- https://github.com/Amybystara/emi-homepage に直接アクセスしてみる
- Transfer が完了していない場合は korosuke613 に確認する

### microCMS にログインできない場合
- パスワードリセットを試す: https://app.microcms.io でメールアドレスを入力
- korosuke613 に招待メールの再送を依頼する
