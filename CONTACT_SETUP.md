# お問い合わせフォーム

## 実装
- /contact: 氏名・メール・件名・本文。
- service=app-development、maintenance、quality、automation で編集可能なテンプレートを表示。
- /api/contact へ送信。本文をURL・ブラウザストレージに保存しない。
- Cloudflare Pages Functions + Resendの接続用コード。宛先は固定、入力メールは返信先。
- Resendの利用と入力データの転送はユーザー承認済み。契約・課金・DNS変更は未実施。
- 配送サービスの受付IDを確認した場合だけ成功表示。同一内容の再送を重複防止キーで抑止。

## 公開前の設定と確認（未完了）
1. Resendアカウント・送信用ドメインを用意する。
2. サーバー側Secretに RESEND_API_KEY を設定。VITE_変数やソースには含めない。
3. CONTACT_FROM に認証した送信元を設定する。
4. CONTACT_RATE_LIMITER に limit({ key }) を提供するCloudflare Rate Limiting bindingを接続。設定がなければ503で停止。Pagesでのバインディング対応可否をデプロイ時に確認し、必要ならAPIをWorkerとして配備する。
5. Pages Functionsを含む方法でデプロイする。distのみの静的アップロードではAPIは動作しない。
6. 実配送、返信先、送信制限、スパム対策、サービス側の保存期間を公開前に確認する。

npm run devは画面のみ。API未起動時は失敗表示になり、成功を装わない。
現状は送信接続未設定・実配送未確認。ブラウザでのフォーム操作確認も未実施。

https://resend.com/docs/api-reference/emails/send-email
https://developers.cloudflare.com/pages/functions/routing/
