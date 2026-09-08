# Cloudflare運用

- 公開先: https://myhomepage.agtmpwd992.workers.dev
- GitHub: wataruteduka1973/myhomepage / main
- デプロイコマンド: npx wrangler deploy
- wrangler.jsonc の build.command に npm run build を指定。CloudflareのBuild commandがNoneでもdist生成を実行する。
- 画面はStatic Assets。フォームはメールアプリでの作成方式で、Resend・送信API・送信制限バインディングは廃止。
- 訪問者自身のメールアプリで送信する必要がある。メールが届いたことはサイトでは判定しない。

## 確認
npm run build / npm run lint / npx wrangler deploy --dry-run
公開後は4ページ・フォームテンプレート・メール作成内容を確認する。
過去の失敗ビルドは履歴に残る。新コミットの自動ビルド成否はCloudflareで確認する。
