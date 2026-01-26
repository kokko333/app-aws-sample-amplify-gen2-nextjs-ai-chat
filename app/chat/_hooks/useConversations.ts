import { useState, useCallback } from "react";
import type { Conversation } from "../_types/chat";
// import { fetchConversations } from "../../api/_chat";

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshConversations = useCallback(async () => {
    setIsLoading(true);
    try {
      // const conversations = await fetchConversations();
      const conversations: Conversation[] = [
        // サンプルデータ
        {
          id: "sampleID-1",
          title: "sample会話タイトル1",
          messages: [
            {
              id: "sampleメッセージID-1",
              role: "user",
              content: "こんにちは",
              timestamp: new Date(),
            },
            {
              id: "sampleメッセージID-2",
              role: "assistant",
              content: "こんにちは！何かお手伝いできることはありますか？",
              timestamp: new Date(),
            },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]; // TODO: 会話履歴取得APIの実装

      setConversations(conversations);
    } catch (error) {
      console.error("会話一覧の取得に失敗しました:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    conversations,
    isLoading,
    refreshConversations,
  };
};
