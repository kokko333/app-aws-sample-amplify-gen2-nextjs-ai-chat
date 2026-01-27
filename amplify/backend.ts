import { defineBackend } from "@aws-amplify/backend";
import { Tags } from "aws-cdk-lib";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { auth } from "./auth/resource.js";
import { chatData, todoData } from "./data/resource.js";
import { bedrockChatFunction } from "./function/bedrockChat/resource.js";

const backend = defineBackend({
  auth,
  chatData,
  todoData,
  bedrockChatFunction,
});

const tags = Tags.of(backend.stack);
tags.add("Billing", "amplify-nextjs-sample");
tags.add("Project", "amplify-nextjs-sample");
tags.add("Environment", "development");

// --- AI Chat Lambda の環境変数設定

// テーブル名
backend.bedrockChatFunction.addEnvironment(
  "CONVERSATION_TABLE_NAME",
  backend.chatData.resources.tables["Conversation"].tableName
);
backend.bedrockChatFunction.addEnvironment(
  "MESSAGE_TABLE_NAME",
  backend.chatData.resources.tables["Message"].tableName
);

// --- AI Chat Lambda への権限付与

// Bedrockモデルの呼び出し権限を追加
backend.bedrockChatFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["bedrock:InvokeModel"],
    resources: [
      "arn:aws:bedrock:*::foundation-model/*",
      "arn:aws:bedrock:*:*:inference-profile/*",
      "arn:aws:bedrock:*:*:application-inference-profile/*",
    ],
  })
);

// DynamoDBテーブルへのアクセス権限を追加
backend.bedrockChatFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["dynamodb:PutItem", "dynamodb:UpdateItem", "dynamodb:Query"],
    resources: [
      backend.chatData.resources.tables["Conversation"].tableArn,
      backend.chatData.resources.tables["Message"].tableArn,
    ],
  })
);
