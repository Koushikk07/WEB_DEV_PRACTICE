// components/sidebar/Sidebar.tsx
// The left panel showing all conversations.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useConversationStore } from "@/store/conversationStore";
import { formatConvTime, getInitials, truncate } from "@/lib/utils";
import NewChatModal from "./NewChatModal";

interface SidebarProps {
  loading: boolean;
}

export default function Sidebar({ loading }: SidebarProps) {
  const router              = useRouter();
  const { user, clearAuth } = useAuthStore();
  const { conversations, activeConversation } = useConversationStore();

  const [search,      setSearch]      = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [showMenu,    setShowMenu]    = useState(false);

  const filtered = conversations.filter((c) => {
    const name = c.type === "group"
      ? c.name || "Group"
      : c.participants.find((p) => p.user_id !== user?.id)?.user.display_name || "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  function handleLogout() {
    clearAuth();
    router.push("/");
  }

  function getConvName(conv: typeof conversations[0]) {
    if (conv.type === "group") return conv.name || "Group";
    const other = conv.participants.find((p) => p.user_id !== user?.id);
    return other?.user.display_name || "Unknown";
  }

  function getConvAvatar(conv: typeof conversations[0]) {
    if (conv.type === "group") return conv.avatar_url;
    const other = conv.participants.find((p) => p.user_id !== user?.id);
    return other?.user.avatar_url;
  }

  function getOnlineStatus(conv: typeof conversations[0]) {
    if (conv.type === "group") return false;
    const other = conv.participants.find((p) => p.user_id !== user?.id);
    return other?.user.is_online || false;
  }

  return (
    <>
      <div style={{
        width:           "360px",
        minWidth:        "360px",
        height:          "100vh",
        backgroundColor: "#1e1e1e",
        borderRight:     "1px solid #3a3a3a",
        display:         "flex",
        flexDirection:   "column",
        overflow:        "hidden",
      }}>

        {/* Header */}
        <div style={{
          padding:        "16px",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          borderBottom:   "1px solid #3a3a3a",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              onClick={() => setShowMenu(!showMenu)}
              style={{
                width:           "40px",
                height:          "40px",
                borderRadius:    "50%",
                backgroundColor: "#2c6bed",
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                cursor:          "pointer",
                fontSize:        "14px",
                fontWeight:      "600",
                color:           "#fff",
                overflow:        "hidden",
              }}
            >
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.display_name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                getInitials(user?.display_name || "U")
              )}
            </div>
            <span style={{
              color:      "#e9e9e9",
              fontWeight: "600",
              fontSize:   "16px",
            }}>
              Signal
            </span>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "8px", position: "relative" }}>
            <button
              onClick={() => setShowNewChat(true)}
              title="New Chat"
              style={iconBtnStyle}
            >
              ✏️
            </button>
            <button
              onClick={() => setShowMenu(!showMenu)}
              title="Menu"
              style={iconBtnStyle}
            >
              ⋮
            </button>

            {/* Dropdown menu */}
            {showMenu && (
              <>
                {/* Backdrop to close menu */}
                <div
                  style={{
                    position: "fixed",
                    inset:    0,
                    zIndex:   99,
                  }}
                  onClick={() => setShowMenu(false)}
                />
                <div style={{
                  position:        "absolute",
                  top:             "40px",
                  right:           "0",
                  backgroundColor: "#2a2a2a",
                  border:          "1px solid #3a3a3a",
                  borderRadius:    "8px",
                  padding:         "4px",
                  zIndex:          100,
                  minWidth:        "160px",
                  boxShadow:       "0 4px 20px rgba(0,0,0,0.4)",
                }}>
                  {[
                    {
                      label:  "New Group",
                      action: () => { setShowNewChat(true); setShowMenu(false); },
                    },
                    {
                      label:  "Settings",
                      action: () => { router.push("/settings"); setShowMenu(false); },
                    },
                    {
                      label:  "Sign Out",
                      action: handleLogout,
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      style={{
                        display:         "block",
                        width:           "100%",
                        padding:         "10px 16px",
                        backgroundColor: "transparent",
                        border:          "none",
                        color:           item.label === "Sign Out" ? "#ff6b6b" : "#e9e9e9",
                        fontSize:        "14px",
                        textAlign:       "left",
                        cursor:          "pointer",
                        borderRadius:    "6px",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "#3a3a3a";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: "10px 16px" }}>
          <div style={{
            display:         "flex",
            alignItems:      "center",
            backgroundColor: "#2a2a2a",
            borderRadius:    "20px",
            padding:         "8px 14px",
            gap:             "8px",
          }}>
            <span style={{ color: "#8a8a8a", fontSize: "14px" }}>🔍</span>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex:            1,
                backgroundColor: "transparent",
                border:          "none",
                outline:         "none",
                color:           "#e9e9e9",
                fontSize:        "14px",
              }}
            />
          </div>
        </div>

        {/* Conversation List */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{
                padding:    "12px 16px",
                display:    "flex",
                gap:        "12px",
                alignItems: "center",
              }}>
                <div style={{
                  width:           "50px",
                  height:          "50px",
                  borderRadius:    "50%",
                  backgroundColor: "#2a2a2a",
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    width:           "60%",
                    height:          "14px",
                    backgroundColor: "#2a2a2a",
                    borderRadius:    "4px",
                    marginBottom:    "8px",
                  }} />
                  <div style={{
                    width:           "80%",
                    height:          "12px",
                    backgroundColor: "#2a2a2a",
                    borderRadius:    "4px",
                  }} />
                </div>
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div style={{
              padding:   "40px 16px",
              textAlign: "center",
              color:     "#8a8a8a",
              fontSize:  "14px",
            }}>
              {search ? "No conversations found" : "No conversations yet"}
            </div>
          ) : (
            filtered.map((conv) => {
              const isActive = activeConversation?.id === conv.id;
              const convName = getConvName(conv);
              const avatar   = getConvAvatar(conv);
              const isOnline = getOnlineStatus(conv);

              return (
                <div
                  key={conv.id}
                  onClick={() => router.push(`/chat/${conv.id}`)}
                  style={{
                    display:         "flex",
                    alignItems:      "center",
                    padding:         "12px 16px",
                    gap:             "12px",
                    cursor:          "pointer",
                    backgroundColor: isActive ? "#2c2c2c" : "transparent",
                    borderLeft:      isActive
                      ? "3px solid #2c6bed"
                      : "3px solid transparent",
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#252525";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  {/* Avatar */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{
                      width:           "50px",
                      height:          "50px",
                      borderRadius:    "50%",
                      backgroundColor: "#2c6bed",
                      display:         "flex",
                      alignItems:      "center",
                      justifyContent:  "center",
                      fontSize:        "18px",
                      fontWeight:      "600",
                      color:           "#fff",
                      overflow:        "hidden",
                    }}>
                      {avatar ? (
                        <img
                          src={avatar}
                          alt={convName}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        getInitials(convName)
                      )}
                    </div>
                    {isOnline && (
                      <div style={{
                        position:        "absolute",
                        bottom:          "2px",
                        right:           "2px",
                        width:           "12px",
                        height:          "12px",
                        backgroundColor: "#4caf50",
                        borderRadius:    "50%",
                        border:          "2px solid #1e1e1e",
                      }} />
                    )}
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display:        "flex",
                      justifyContent: "space-between",
                      alignItems:     "center",
                      marginBottom:   "4px",
                    }}>
                      <span style={{
                        color:        "#e9e9e9",
                        fontWeight:   "600",
                        fontSize:     "15px",
                        overflow:     "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace:   "nowrap",
                      }}>
                        {convName}
                      </span>
                      <span style={{
                        color:      "#8a8a8a",
                        fontSize:   "12px",
                        flexShrink: 0,
                        marginLeft: "8px",
                      }}>
                        {formatConvTime(conv.last_message_at)}
                      </span>
                    </div>
                    <div style={{
                      display:        "flex",
                      justifyContent: "space-between",
                      alignItems:     "center",
                    }}>
                      <span style={{
                        color:        "#8a8a8a",
                        fontSize:     "13px",
                        overflow:     "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace:   "nowrap",
                        flex:         1,
                      }}>
                        {conv.last_message
                          ? truncate(conv.last_message, 40)
                          : "No messages yet"}
                      </span>
                      {conv.unread_count > 0 && (
                        <div style={{
                          backgroundColor: "#2c6bed",
                          color:           "#fff",
                          borderRadius:    "50%",
                          width:           "20px",
                          height:          "20px",
                          display:         "flex",
                          alignItems:      "center",
                          justifyContent:  "center",
                          fontSize:        "11px",
                          fontWeight:      "700",
                          flexShrink:      0,
                          marginLeft:      "8px",
                        }}>
                          {conv.unread_count > 99 ? "99+" : conv.unread_count}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* New Chat Modal — rendered outside the sidebar div so it overlays everything */}
      {showNewChat && (
        <NewChatModal onClose={() => setShowNewChat(false)} />
      )}
    </>
  );
}

const iconBtnStyle: React.CSSProperties = {
  width:           "36px",
  height:          "36px",
  borderRadius:    "50%",
  backgroundColor: "transparent",
  border:          "none",
  cursor:          "pointer",
  fontSize:        "18px",
  display:         "flex",
  alignItems:      "center",
  justifyContent:  "center",
  color:           "#8a8a8a",
};