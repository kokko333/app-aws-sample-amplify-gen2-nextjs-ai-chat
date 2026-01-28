import { useState, useCallback } from "react";
import type { Conversation } from "../_types/chat";
import { fetchConversations } from "../_actions/fetchChatData";

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshConversations = useCallback(async () => {
    setIsLoading(true);
    try {
      const conversations = await fetchConversations();
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
