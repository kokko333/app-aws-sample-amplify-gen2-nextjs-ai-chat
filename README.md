
## Manual

1. AWSコンソールでAmplifyのページを開き、本アプリケーションをデプロイする。
   ※ ソースリポジトリ側で Amplifyへのソース提供を認可する必要がある。
2. デプロイ先のURLにアクセスし、アカウント作成 > ログイン　を行う（Cognito認証）
3. トップページで、TODOアプリ使うかAiChatアプリを使うか選択する。
4. 使ってみる。

### 注意事項

- AWSプロファイルの要件
  - バックエンドリソースのデプロイのために、以下のアクセス許可ポリシーが必要
    - AmplifyBackendDeployFullAccess
- 使用する各AIモデルのサブスクリプションをアクティブにしておく必要があります。
  - アクティブになっていない場合、現状アプリにはSubscribe権限がないため、Bedrock側でAIモデルへの接続をdenyされます。

### Tips

- プルリクエストのプレビューを有効にする
  - プルリクエスト作成時に、個別のプレビュー環境が作成され、動作確認できる。
    - 環境作成時はプルリクエストのツリーへamplifyから通知が届くらしい。
    - プルリクエストがマージされるとプレビュー環境も自動で削除される。

- ローカルdevサーバを起動する
  - $ npm run dev
    - http://localhost:3000 でアプリが起動する
  - バックエンド情報ファイル（amplify_outputs.json）をPJルートに配置しておけばAWS環境のバックエンドとの接続も可能
    - ファイルの取得方法は以下の通り
      - AWSコンソール > Amplifyのアプリのページ > 「デプロイされたバックエンドリソース」 > [amplify_output.json をダウンロード]
    - ローカルからサンドボックス環境を作成した場合など、自動でローカルに作成されるケースもある。

- クラウドサンドボックスを展開する
  - チーム内の開発者ごとに個別のバックエンド環境を提供する
    - ！ ローカルdevサーバと異なり、バックエンドも個別環境にすることができる
      $ npx ampx sandbox
    - 実行中は amplify/ への更新が自動反映されるらしい
    - クリーンアップ
      $ npx ampx sandbox delete
```
PS C:\Users\kokko\Documents\Practice_Infra_AWS\app-aws-sample-amplify-gen2-nextjs> npx ampx sandbox

Amplify Sandbox
  Identifier:   kokko
Amplify Sandbox
  Identifier:   kokko
  Stack:        amplify-awsamplifygen2-kokko-sandbox-f11420c47c
  Region:       ap-northeast-1
To specify a different sandbox identifier, use --identifier

18:27:29 ✔ Backend synthesized in 60.41 seconds
18:30:00 ✔ Type checks completed in 151.16 seconds
18:30:05 ✔ Built and published assets
18:33:39 ✔ Deployment completed in 213.996 seconds
18:33:39 AppSync API endpoint = https://g6dpe5piy5audmig2xcql4rene.appsync-api.ap-northeast-1.amazonaws.com/graphql
18:33:39 [Sandbox] Watching for file changes...
18:33:39 File written: amplify_outputs.json
```

## Special Thanks

- Quick Start - Amplify gen2 × Next.js App Router
  - https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/
  - 本ソースの構成 および TODOアプリはこのガイドに沿って作成したものです。
- amplify gen2 × bedrock 本
  - https://github.com/ncdcdev/TECHNICAL-MASTER-AWS
  - AiChatアプリはこの本をNext.jsに移植したものです。
