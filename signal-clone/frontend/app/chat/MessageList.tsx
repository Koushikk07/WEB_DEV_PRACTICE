// components/chat/MessageList.tsx
// Shows all messages in the current conversation.

"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { useChatStore } from "@/store/chatStore";
import { formatMessageTime } from "@/lib/utils";
import TypingIndicator from "./TypingIndicator";

export default function MessageList() {
  const { user }                    = useAuthStore();
  const { messages, isLoading, typingUsers } = useChatStore();
  const bottomRef                   = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  if (isLoading) {
    return (
      <div style={{
        flex:            1,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        backgroundColor: "#121212",
        color:           "#8a8a8a",
        fontSize:        "14px",
      }}>
        Loading messages...
      </div>
    );
  }

  return (
    <div style={{
      flex:            1,
      overflowY:       "auto",
      padding:         "16px",
      backgroundColor: "#121212",
      display:         "flex",
      flexDirection:   "column",
      gap:             "4px",
    }}>
      {messages.length === 0 ? (
        <div style={{
          flex:           1,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          color:          "#8a8a8a",
          fontSize:       "14px",
        }}>
          No messages yet. Say hello! 👋
        </div>
      ) : (
        messages.map((msg, index) => {
          const isMine     = msg.sender_id === user?.id;
          const prevMsg    = messages[index - 1];
          const showAvatar = !isMine && (
            !prevMsg || prevMsg.sender_id !== msg.sender_id
          );
          const showName   = !isMine && showAvatar;

          return (
            <div
              key={msg.id}
              style={{
                display:       "flex",
                flexDirection: isMine ? "row-reverse" : "row",
                alignItems:    "flex-end",
                gap:           "8px",
                marginTop:     showAvatar ? "12px" : "2px",
              }}
            >
              {/* Other user avatar */}
              {!isMine && (
                <div style={{ width: "28px", flexShrink: 0 }}>
                  {showAvatar && (
                    <div style={{
                      width:           "28px",
                      height:          "28px",
                      borderRadius:    "50%",
                      backgroundColor: "#2c6bed",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      fontSize:        "11px",
                      fontWeight:      "600",
                      color:           "#fff",
                      overflow:        "hidden",
                    }}>
                      {msg.sender?.avatar_url ? (
                        <img
                          src={msg.sender.avatar_url}
                          alt={msg.sender.display_name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        msg.sender?.display_name?.[0]?.toUpperCase() || "?"
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Message bubble */}
              <div style={{ maxWidth: "65%" }}>
                {/* Sender name (group chats) */}
                {showName && (
                  <div style={{
                    color:        "#2c6bed",
                    fontSize:     "12px",
                    fontWeight:   "600",
                    marginBottom: "4px",
                    paddingLeft:  "12px",
                  }}>
                    {msg.sender?.display_name}
                  </div>
                )}

                <div style={{
                  padding:         msg.is_deleted ? "8px 12px" : "8px 12px",
                  borderRadius:    isMine ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  backgroundColor: msg.is_deleted
                    ? "#1a1a1a"
                    : isMine
                    ? "#2c6bed"
                    : "#2a2a2a",
                  color:           msg.is_deleted ? "#8a8a8a" : "#e9e9e9",
                  fontSize:        "15px",
                  lineHeight:      "1.4",
                  fontStyle:       msg.is_deleted ? "italic" : "normal",
                  wordBreak:       "break-word",
                }}>
                  {msg.content}
                </div>

                {/* Timestamp and status */}
                <div style={{
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: isMine ? "flex-end" : "flex-start",
                  gap:            "4px",
                  marginTop:      "2px",
                  paddingLeft:    isMine ? 0 : "4px",
                  paddingRight:   isMine ? "4px" : 0,
                }}>
                  <span style={{ color: "#8a8a8a", fontSize: "11px" }}>
                    {formatMessageTime(msg.created_at)}
                  </span>
                  {/* Read receipts — only for sent messages */}
                  {isMine && (
                    <span style={{
                      fontSize: "12px",
                      color:    msg.status === "read" ? "#2c6bed" : "#8a8a8a",
                    }}>
                      {msg.status === "sending"   && "○"}
                      {msg.status === "sent"      && "✓"}
                      {msg.status === "delivered" && "✓✓"}
                      {msg.status === "read"      && "✓✓"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Typing indicator */}
      {typingUsers.length > 0 && <TypingIndicator />}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}