// components/chat/ChatHeader.tsx
// Shows the name, avatar, and online status of the current conversation.

"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useConversationStore } from "@/store/conversationStore";
import { useChatStore } from "@/store/chatStore";
import { getInitials, formatLastSeen } from "@/lib/utils";

export default function ChatHeader() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { activeConversation } = useConversationStore();
  const { typingUsers, onlineUsers } = useChatStore();

  if (!activeConversation) return null;

  const isGroup = activeConversation.type === "group";

  const otherUser = !isGroup
    ? activeConversation.participants.find((p) => p.user_id !== user?.id)?.user
    : null;

  const name = isGroup
    ? activeConversation.name || "Group"
    : otherUser?.display_name || "Unknown";

  const avatar = isGroup
    ? activeConversation.avatar_url
    : otherUser?.avatar_url;

  const isOnline = otherUser
    ? onlineUsers.has(otherUser.id) || otherUser.is_online
    : false;

  const subtitle = typingUsers.length > 0
    ? `${typingUsers[0].display_name || "Someone"} is typing...`
    : isGroup
    ? `${activeConversation.participants.length} members`
    : formatLastSeen(otherUser?.last_seen || "", isOnline);

  return (
    <div style={{
      padding:         "12px 16px",
      backgroundColor: "#1e1e1e",
      borderBottom:    "1px solid #3a3a3a",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Avatar */}
        <div style={{ position: "relative" }}>
          <div style={{
            width:           "42px",
            height:          "42px",
            borderRadius:    "50%",
            backgroundColor: "#2c6bed",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            fontSize:        "15px",
            fontWeight:      "600",
            color:           "#fff",
            overflow:        "hidden",
          }}>
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : getInitials(name)}
          </div>
          {isOnline && !isGroup && (
            <div style={{
              position:        "absolute",
              bottom:          "1px",
              right:           "1px",
              width:           "10px",
              height:          "10px",
              backgroundColor: "#4caf50",
              borderRadius:    "50%",
              border:          "2px solid #1e1e1e",
            }} />
          )}
        </div>

        {/* Name and status */}
        <div>
          <div style={{
            color:      "#e9e9e9",
            fontWeight: "600",
            fontSize:   "16px",
          }}>
            {name}
          </div>
          <div style={{
            color:    typingUsers.length > 0 ? "#2c6bed" : "#8a8a8a",
            fontSize: "12px",
          }}>
            {subtitle}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "8px" }}>
        {[
          { icon: "📞", title: "Voice call — coming soon" },
          { icon: "📹", title: "Video call — coming soon" },
          { icon: "🔍", title: "Search messages" },
        ].map((btn) => (
          <button
            key={btn.title}
            title={btn.title}
            style={{
              width:           "36px",
              height:          "36px",
              borderRadius:    "50%",
              backgroundColor: "transparent",
              border:          "none",
              cursor:          "pointer",
              fontSize:        "16px",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
            }}
          >
            {btn.icon}
          </button>
        ))}
      </div>
    </div>
  );
}