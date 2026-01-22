import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { bedrockChatFunction } from "../function/bedrockChat/resource";

//////////////////////////////////////////////////////////////////////////////
// AIチャットモデルの定義
//////////////////////////////////////////////////////////////////////////////

const chatSchema = a.schema({
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
});

export type ChatSchema = ClientSchema<typeof chatSchema>;

export const chatData = defineData({
  schema: chatSchema,
  logging: true,
});

//////////////////////////////////////////////////////////////////////////////
// TODOモデルの定義
//////////////////////////////////////////////////////////////////////////////

// GraphQL (AppSync Resolvers) + DynamoDB
const todoSchema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization(allow => [allow.owner()]), // 所有者自身からのデータアクセスに限定
});

export type TodoSchema = ClientSchema<typeof todoSchema>;

export const todoData = defineData({
  schema: todoSchema,
  authorizationModes: {
    // // APIキー認証
    // defaultAuthorizationMode: "apiKey",
    // apiKeyAuthorizationMode: {
    //   expiresInDays: 30,
    // },

    // Cognitoユーザー認可
    defaultAuthorizationMode: "userPool",
  },
});
