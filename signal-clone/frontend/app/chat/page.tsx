// app/chat/page.tsx
// Main chat layout — sidebar on left, chat on right.
// This is the core page of the app.

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useConversationStore } from "@/store/conversationStore";
import { conversationsAPI } from "@/lib/api";
import wsManager from "@/lib/ws";
import Sidebar from "@/components/sidebar/Sidebar";
import EmptyChat from "@/components/chat/EmptyChat";

export default function ChatPage() {
  const router      = useRouter();
  const { user, isLoggedIn } = useAuthStore();
  const { setConversations, updateConversation } = useConversationStore();
  const [loading, setLoading] = useState(true);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.push("/");
      return;
    }

    // Connect WebSocket
    wsManager.connect(user.id);

    // Load conversations
    async function loadConversations() {
      try {
        const convs = await conversationsAPI.getUserConversations(user!.id);
        setConversations(convs);
      } catch (e) {
        console.error("Failed to load conversations:", e);
      } finally {
        setLoading(false);
      }
    }

    loadConversations();

    // Listen for new messages to update sidebar preview
    const handleNewMessage = (payload: Record<string, unknown>) => {
      const convId  = payload.conversation_id as string;
      const content = payload.content as string;
      updateConversation(convId, {
        last_message:    content,
        last_message_at: new Date().toISOString(),
      });
    };

    wsManager.on("message", handleNewMessage);

    return () => {
      wsManager.off("message", handleNewMessage);
    };
  }, [isLoggedIn, user, router, setConversations, updateConversation]);

  if (!isLoggedIn) return null;

  return (
    <div style={{
      display:    "flex",
      height:     "100vh",
      overflow:   "hidden",
      backgroundColor: "#121212",
    }}>
      {/* Left sidebar */}
      <Sidebar loading={loading} />

      {/* Right panel — empty state */}
      <div style={{ flex: 1, display: "flex" }}>
        <EmptyChat />
      </div>
    </div>
  );
}