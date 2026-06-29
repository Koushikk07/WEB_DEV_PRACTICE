// app/chat/[id]/page.tsx
// Shows the full chat for one conversation.

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useConversationStore } from "@/store/conversationStore";
import { useChatStore } from "@/store/chatStore";
import { conversationsAPI, messagesAPI } from "@/lib/api";
import wsManager from "@/lib/ws";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";
import { Message } from "@/app/types";

export default function ConversationPage() {
  const router  = useRouter();
  const params  = useParams();
  const convId  = params.id as string;

  const { user, isLoggedIn }                         = useAuthStore();
  const { setActiveConversation, updateConversation } = useConversationStore();
  const { setMessages, addMessage, setLoading,
          setTyping, setUserOnline, clearMessages }   = useChatStore();

  const [sidebarLoading, setSidebarLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !user) {
      router.push("/");
      return;
    }

    // Connect WebSocket if not already connected
    if (!wsManager.isConnected()) {
      wsManager.connect(user.id);
    }

    // Load conversation info
    async function loadConversation() {
      try {
        const conv = await conversationsAPI.getConversation(convId);
        setActiveConversation(conv);
      } catch (e) {
        console.error("Failed to load conversation:", e);
      }
    }

    // Load messages
    async function loadMessages() {
      setLoading(true);
      clearMessages();
      try {
        const msgs = await messagesAPI.getMessages(convId);
        setMessages(msgs);
      } catch (e) {
        console.error("Failed to load messages:", e);
      } finally {
        setLoading(false);
      }
    }

    loadConversation();
    loadMessages();

    // Join WebSocket room for this conversation
    setTimeout(() => {
      wsManager.joinConversation(convId);
      // Mark messages as read
      wsManager.sendRead(convId);
    }, 500);

    // ── WebSocket event handlers ──

    const handleMessage = (payload: Record<string, unknown>) => {
      if (payload.conversation_id === convId) {
        addMessage(payload as unknown as Message);
        // Send read receipt
        wsManager.sendRead(convId);
        // Update sidebar preview
        updateConversation(convId, {
          last_message:    payload.content as string,
          last_message_at: new Date().toISOString(),
        });
      }
    };

    const handleTyping = (payload: Record<string, unknown>) => {
      if (payload.conversation_id === convId &&
          payload.user_id !== user.id) {
        setTyping(
          { user_id: payload.user_id as string, display_name: "" },
          payload.is_typing as boolean
        );
      }
    };

    const handleOnlineStatus = (payload: Record<string, unknown>) => {
      setUserOnline(payload.user_id as string, payload.is_online as boolean);
    };

    wsManager.on("message",       handleMessage);
    wsManager.on("typing",        handleTyping);
    wsManager.on("online_status", handleOnlineStatus);

    return () => {
      wsManager.off("message",       handleMessage);
      wsManager.off("typing",        handleTyping);
      wsManager.off("online_status", handleOnlineStatus);
      setActiveConversation(null);
      clearMessages();
    };
  }, [convId, isLoggedIn, user, router]);

  if (!isLoggedIn) return null;

  return (
    <div style={{
      display:         "flex",
      height:          "100vh",
      overflow:        "hidden",
      backgroundColor: "#121212",
    }}>
      {/* Left sidebar */}
      <Sidebar loading={sidebarLoading} />

      {/* Right chat panel */}
      <div style={{
        flex:            1,
        display:         "flex",
        flexDirection:   "column",
        backgroundColor: "#121212",
        overflow:        "hidden",
      }}>
        <ChatHeader />
        <MessageList />
        <MessageInput conversationId={convId} />
      </div>
    </div>
  );
}