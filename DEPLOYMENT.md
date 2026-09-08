# Cloudflare Workersでの公開

React画面と /api/contact を1つのWorkerに配置。Pagesの設定は使用しない。

## Git連携
- GitHub: wataruteduka1973/myhomepage
- ブランチ: main
- ルート: /
- ビルド: npm run build
- デプロイ: npx wrangler deploy
- Worker名: myhomepage

CloudflareのWorkers & PagesからGitHubリポジトリを接続し、Workersプロジェクトとして作成する。
wrangler.jsoncとworker.jsをGitHubへ反映してから接続する。

## 送信設定
WorkerのSettings > Variables and Secretsで以下を設定する。
- RESEND_API_KEY: Secret。Resendの送信権限を持つキー。
- CONTACT_FROM: Resendで認証済みの送信元メールアドレス。

キーはGitやチャットへ記載しない。未設定時は問い合わせAPIが503を返す。
送信先はagtmpwd992@gmail.comに固定。制限は同一IP・Cloudflare拠点ごとに60秒5回で、全体の費用上限ではない。

## 検証
- npm run build
- npm run lint
- node --test contact.test.js
- npx wrangler deploy --dry-run
- 公開後に /、/about、/projects、/contact の直接アクセスを確認。
- 各相談テンプレート、フォーム失敗時、配送先Gmailへの到着・返信先を確認。

2026-09-08: Cloudflareに手動公開済み。
公開URL: https://myhomepage.agtmpwd992.workers.dev
4ページのHTTP 200、ビルド・lint・送信模擬テスト・dry-runを確認。
ブラウザ操作・Resend設定・実配送は未確認。GitHubからの自動デプロイ連携は未設定。
