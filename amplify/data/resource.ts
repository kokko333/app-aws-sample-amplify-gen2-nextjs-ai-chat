import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { bedrockChatFunction } from "../function/bedrockChat/resource";

const schema = a.schema({
  // --- AIチャットモデル ---

  Message: a
    .model({
      conversationId: a.id().required(),
      createdAt: a.datetime().required(),
      conversation: a.belongsTo("Conversation", "conversationId"), // Conversationモデルとのリレーション
      sender: a.string(), // user or assistant
      content: a.string(), // メッセージ本文
    })
    .identifier(["conversationId", "createdAt"])
    .authorization(allow => [allow.owner()]),

  Conversation: a
    .model({
      conversationId: a.id().required(),
      title: a.string().required(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      messages: a.hasMany("Message", "conversationId"), // Messageモデルとのリレーション
    })
    .identifier(["conversationId"])
    .authorization(allow => [allow.owner()]),

  BedrockChat: a
    .query()
    .arguments({
      prompt: a.string().required(),
      modelId: a.string().required(),
      conversationId: a.id(),
    })
    .returns(a.string())
    .authorization(allow => [allow.authenticated()])
    .handler(a.handler.function(bedrockChatFunction)),

  // --- TODOモデル ---

  Todo: a
    .model({
      content: a.string(),
    })
    .authorization(allow => [allow.owner()]), // 所有者自身からのデータアクセスに限定
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // // APIキー認証
    // defaultAuthorizationMode: "apiKey",
    // apiKeyAuthorizationMode: {
    //   expiresInDays: 30,
    // },

    // Cognitoユーザー認可
    defaultAuthorizationMode: "userPool",
  },
  logging: true,
});
