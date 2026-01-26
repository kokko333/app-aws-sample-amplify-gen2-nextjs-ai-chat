"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useConversations } from "../_hooks/useConversations";
import type { Conversation } from "../_types/chat";

interface ConversationsContextType {
  conversations: Conversation[];
  isLoading: boolean;
  refreshConversations: () => Promise<void>;
  notifyConversationCreated: () => Promise<void>;
}

const ConversationsContext = createContext<ConversationsContextType | undefined>(
  undefined
);

interface ConversationsProviderProps {
  children: ReactNode;
}

export const ConversationsProvider: React.FC<ConversationsProviderProps> = ({
  children,
}) => {
  // 会話履歴の一覧を取得
  const conversationsData = useConversations();

  // 新規チャット作成を通知する処理
  const notifyConversationCreated = async () => {
    await conversationsData.refreshConversations();
  };

  return (
    <ConversationsContext.Provider
      value={{
        ...conversationsData,
        notifyConversationCreated,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

// useContext のカスタムフック
export const useConversationsContext = () => {
  const context = useContext(ConversationsContext);
  if (!context) {
    throw new Error("useConversationsContextはConversationsProvider内で使用してください");
  }
  return context;
};
