"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { I18n } from "aws-amplify/utils";
import { translations } from "@aws-amplify/ui-react";

Amplify.configure(outputs);

// Amplify UI（認証）の日本語化
I18n.putVocabularies(translations);
I18n.setLanguage("ja");
I18n.putVocabularies({
  ja: {
    "Enter your email": "メールアドレス",
    "Password must have at least 8 characters": "8文字以上で入力してください",
    "Password must have numbers": "1つ以上の数字を含んでいる必要があります",
    "Password must have lower case letters": "1つ以上の小文字を含んでいる必要があります",
    "Password must have upper case letters": "1つ以上の大文字を含んでいる必要があります",
    "Password must have special characters":
      "1つ以上の特殊文字を含んでいる必要があります",
    "Your passwords must match": "パスワードが一致しません",
    "Incorrect username or password.": "メールアドレスまたはパスワードが間違っています",
    "Invalid verification code provided, please try again.":
      "無効な検証コードです。再度お試しください。",
  },
});

export default function AuthenticatorWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Authenticator>{children}</Authenticator>;
}
