## command

- ローカルdevサーバを起動する
  $ npm run dev
    -> http://localhost:3000
  ※ 登録済みTODOとしてamplifyデプロイアプリで追加したものが表示された
    ⇒　バックエンドは（amplify_outputs.json）に登録されたAWSリソースに接続されているらしい

- クラウドサンドボックスを展開する
  - チーム内の開発者ごとに個別のバックエンド環境を提供する
    - ！ ローカルdevサーバと異なり、バックエンドも個別環境にすることができる
  $ npx ampx sandbox
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

## 注意事項

- AWSプロファイルの要件
  - バックエンドリソースのデプロイのために、以下のアクセス許可ポリシーが必要
    - AmplifyBackendDeployFullAccess

---

## AWS Amplify Next.js (App Router) Starter Template

This repository provides a starter template for creating applications using Next.js (App Router) and AWS Amplify, emphasizing easy setup for authentication, API, and database capabilities.

## Overview

This template equips you with a foundational Next.js application integrated with AWS Amplify, streamlined for scalability and performance. It is ideal for developers looking to jumpstart their project with pre-configured AWS services like Cognito, AppSync, and DynamoDB.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.

## Deploying to AWS

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/#deploy-a-fullstack-app-to-aws) of our documentation.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.