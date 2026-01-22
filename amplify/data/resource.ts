import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
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
});
