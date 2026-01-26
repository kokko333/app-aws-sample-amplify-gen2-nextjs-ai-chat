import type { Message } from "../_types/chat";
import MessageAI from "./MessageAI";
import MessageUser from "./MessageUser";
import { cn } from "@/lib/utils";

interface MessageListProps {
  messages: Message[];
  className?: string;
}

export default function MessageList({ messages, className }: MessageListProps) {
  return (
    <div className={cn("flex-1 space-y-4 overflow-y-auto px-6 py-4", className)}>
      {messages.map(message =>
        message.role === "assistant" ? (
          <MessageAI key={message.id} message={message} />
        ) : (
          <MessageUser key={message.id} message={message} />
        )
      )}
    </div>
  );
}
