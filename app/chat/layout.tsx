"use client";

import Sidebar from "./_components/Sidebar";
import { ConversationsProvider } from "./_context/ConversationsContext";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConversationsProvider>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 bg-white">{children}</main>
      </div>
    </ConversationsProvider>
  );
}
