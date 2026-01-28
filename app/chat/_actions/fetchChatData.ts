import { client } from "./appSyncClient";
import type { Conversation, Message, MessageRole } from "../_types/chat";

/**
 * 特定の会話のメタ情報と全関連メッセージを取得する。
 *
 * @param conversationId 会話の識別ID
 * @returns { Conversation } 会話情報（メタ情報＋メッセージ）
 */
export const fetchConversation = async (
  conversationId: string
): Promise<Conversation> => {
  try {
    const { data: conversation } = await client.models.Conversation.get(
      {
        conversationId,
      },
      {
        selectionSet: [
          "conversationId",
          "title",
          "createdAt",
          "updatedAt",
          // リレーションを辿ってメッセージも取得
          "messages.sender",
          "messages.content",
          "messages.createdAt",
        ],
      }
    );

    if (!conversation) {
      throw new Error("会話が見つかりません");
    }

    const messages: Message[] = conversation.messages
      .map(item => ({
        id: `${conversationId}-${item.createdAt}`,
        role: item.sender as MessageRole,
        content: item.content || "",
        timestamp: new Date(item.createdAt),
      }))
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    const result: Conversation = {
      id: conversation.conversationId,
      title: conversation.title || `Chat ${conversationId}`,
      messages,
      createdAt: new Date(conversation.createdAt || ""),
      updatedAt: new Date(conversation.updatedAt || ""),
    };

    return result;
  } catch (error) {
    console.error("会話履歴の取得に失敗しました：", error);
    throw new Error("会話履歴の取得に失敗しました");
  }
};

/**
 * 全会話のメタ情報を取得する。
 *
 * @returns { Conversation[] } 会話情報（メタ情報のみ）のリスト
 */
export const fetchConversations = async (): Promise<Conversation[]> => {
  try {
    const { data: conversations } = await client.models.Conversation.list();

    if (!conversations) {
      throw new Error("会話一覧が見つかりません");
    }

    const result: Conversation[] = conversations
      .map(item => ({
        id: item.conversationId,
        title: item.title || `Chat ${item.conversationId}`,
        messages: [],
        createdAt: new Date(item.createdAt || ""),
        updatedAt: new Date(item.updatedAt || ""),
      }))
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    return result;
  } catch (error) {
    console.error("会話一覧の取得に失敗しました：", error);
    throw new Error("会話一覧の取得に失敗しました");
  }
};
