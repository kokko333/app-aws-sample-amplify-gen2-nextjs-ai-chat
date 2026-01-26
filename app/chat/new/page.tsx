"use client";

import ChatInput from "../_components/ChatInput";
import { useRouter } from "next/navigation";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function NewChat() {
  // ユーザー情報の取得
  const { user } = useAuthenticator();
  const userName = user?.signInDetails?.loginId?.split("@")[0] ?? "";

  // 新規会話の開始
  const router = useRouter();
  const sendMessage = (message: string, model: string) => {
    const conversationId = self.crypto.randomUUID();

    // sessionStorageに初回メッセージとモデルを保存
    sessionStorage.setItem(`chat-${conversationId}`, JSON.stringify({ message, model }));

    router.push(`/chat/${conversationId}`);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-full max-w-xl flex-col gap-2">
        <h1 className="text-center text-3xl font-bold">{userName} さん</h1>
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}
