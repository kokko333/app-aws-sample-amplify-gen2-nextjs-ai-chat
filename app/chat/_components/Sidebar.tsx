"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useConversationsContext } from "../_context/ConversationsContext";
import Profile from "./SideProfile";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Sidebar() {
  const params = useParams();
  const conversationId = params.conversationId as string | undefined;
  const { signOut } = useAuthenticator();
  const { conversations, isLoading, refreshConversations } = useConversationsContext();

  useEffect(() => {
    refreshConversations();
  }, [refreshConversations]);
  // MEMO: refreshConversationsは依存なし([])のuseCallbackで定義されているため、サイドバーの初回レンダリング時のみ実行される

  return (
    <aside className="flex w-80 flex-col border-r border-gray-200 bg-white px-4 py-2">
      <div className="p-4 text-2xl font-bold">AI Chatアプリ</div>

      <div className="px-4 py-2">
        <Link
          className="block w-full justify-center rounded-sm bg-emerald-600 p-2 text-center text-white hover:bg-emerald-700"
          href="/chat/new"
        >
          + 新規チャット
        </Link>
      </div>

      <div className="px-4 py-2 text-sm font-medium">チャット履歴</div>

      <nav className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
          </div>
        ) : conversations.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-gray-500">
            まだチャット履歴がありません
          </div>
        ) : (
          <ul>
            {conversations.map(chat => (
              <li key={chat.id}>
                <Link
                  href={`/chat/${chat.id}`}
                  className={`mx-4 my-2 block truncate rounded-md px-4 py-2 text-sm ${
                    conversationId === chat.id
                      ? "bg-orange-50 font-medium"
                      : "hover:bg-yellow-50"
                  }`}
                >
                  {chat.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <div className="p-4">
        <Profile />
        <button
          className="block w-full justify-center rounded-sm bg-gray-400 p-2 text-white hover:bg-gray-500"
          onClick={signOut}
        >
          ログアウト
        </button>
      </div>
    </aside>
  );
}
