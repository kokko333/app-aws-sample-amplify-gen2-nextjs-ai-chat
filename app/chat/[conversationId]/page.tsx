"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import type { Conversation, Message } from "../_types/chat";
import MessageList from "../_components/MessageList";
import ChatInput from "../_components/ChatInput";
import { fetchConversation } from "../_actions/fetchChatData";
import { callBedrockChat } from "../_actions/callModel";
import { useConversationsContext } from "../_context/ConversationsContext";

export default function ChatConversation() {
  // 会話の識別ID：パスパラメータから取得
  const params = useParams();
  const conversationId = params.conversationId as string;
  // 選択中のモデル
  const [selectedModel, setSelectedModel] = useState<string>("");
  // 会話履歴
  const [conversation, setConversation] = useState<Conversation | null>(null);

  // --- 会話情報の取得

  const [isConversationLoading, setIsConversationLoading] = useState(true);
  const hasInitialized = useRef<string | null>(null);

  // 会話にタイトルをつける関数
  const createChatTitle = (initialMessage: string): string => {
    const titleLength = 20;
    if (!initialMessage || initialMessage.trim() === "") {
      return "New Chat";
    }
    return initialMessage.length > titleLength
      ? `${initialMessage.substring(0, titleLength)}`
      : initialMessage;
  };

  // 初回メッセージから会話を開始する関数
  const startConversation = (storedData: string) => {
    const { message, model } = JSON.parse(storedData);
    setSelectedModel(model);
    setConversation({
      id: conversationId,
      title: createChatTitle(message),
      messages: [
        {
          id: `message-${self.crypto.randomUUID()}`,
          role: "user",
          content: message,
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setIsConversationLoading(false);

    sessionStorage.removeItem(`chat-${conversationId}`);

    getAIResponse(message, model, true);
  };

  // 既存の会話履歴を取得する関数
  const getPreConversation = async () => {
    if (!conversationId) return;
    setIsConversationLoading(true);
    try {
      const conversation = await fetchConversation(conversationId);

      setConversation(conversation);
    } catch (error) {
      console.error("指定した会話の取得に失敗しました:", error);
      setConversation(null);
    } finally {
      setIsConversationLoading(false);
    }
  };

  useEffect(() => {
    // ローカル起動(npm run dev)では Next.js の React Strict Mode により
    // useEffect 内の処理が2回実行されてしまうため、2回目以降はスキップする
    if (hasInitialized.current === conversationId) {
      console.log("既に初期化済みのためスキップ");
      return;
    }
    hasInitialized.current = conversationId;

    const storedData = sessionStorage.getItem(`chat-${conversationId}`);
    if (storedData) {
      startConversation(storedData);
    } else {
      getPreConversation();
    }
  }, [conversationId]);

  // --- AIの応答を取得する

  const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false);
  const { notifyConversationCreated } = useConversationsContext();

  const getAIResponse = async (
    message: string,
    model: string,
    isFirstMessage = false
  ) => {
    setIsLoadingAIResponse(true);
    let newAssistantMessage: Message;
    try {
      const aiResponse = await callBedrockChat(message, model, conversationId ?? "");

      newAssistantMessage = {
        id: `message-${self.crypto.randomUUID()}`,
        role: "assistant",
        content: aiResponse || "AIからの応答がありません",
        timestamp: new Date(),
      };
      if (isFirstMessage) {
        await notifyConversationCreated();
      }
    } catch (error) {
      console.error("AI応答の取得に失敗しました:", error);
      newAssistantMessage = {
        id: `message-${self.crypto.randomUUID()}`,
        role: "assistant",
        content: "AIからの応答の取得に失敗しました。後ほど再試行してください。",
        timestamp: new Date(),
      };
    } finally {
      setConversation(prev => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, newAssistantMessage],
        };
      });
      setIsLoadingAIResponse(false);
    }
  };

  // --- ユーザメッセージの送信ハンドラ

  const sendMessage = async (message: string, model: string) => {
    const newUserMessage: Message = {
      id: `message-${self.crypto.randomUUID()}`,
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setConversation(prev => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, newUserMessage],
      };
    });

    await getAIResponse(message, model);
  };

  // --- UX向上用の処理

  // メッセージが追加されたら自動スクロール
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (conversation?.messages.length) {
      messagesEndRef.current?.scrollIntoView();
    }
  }, [conversation]);

  // レンダリング待機表示
  if (isConversationLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex gap-2 text-center">
          <div className="border-cream-500 mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
          <div className="text-xl font-bold">会話を読み込み中...</div>
        </div>
      </div>
    );
  }

  // 会話が見つからない場合のエラー表示
  if (!conversation) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center text-2xl font-bold">
          指定したIDの会話が見つかりません
        </div>
      </div>
    );
  }

  // --- メインコンテンツ

  return (
    <div className="flex h-screen flex-col">
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4">
        <h1 className="text-xl font-bold">{conversation.title}</h1>
      </div>

      <div className="flex flex-1 justify-center overflow-y-auto bg-white">
        <div className="w-3xl">
          <MessageList messages={conversation.messages} />
          {/* ローディングインジケーターの表示を追加 */}
          {isLoadingAIResponse && (
            <div className="px-6">
              <div className="border-cream-500 h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="w-3xl mx-auto bg-white px-4 py-3">
        <ChatInput
          sendMessage={sendMessage}
          initialModel={selectedModel}
          disabled={isLoadingAIResponse}
        />
      </div>
    </div>
  );
}
