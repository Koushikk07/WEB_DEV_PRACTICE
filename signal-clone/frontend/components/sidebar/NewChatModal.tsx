// components/sidebar/NewChatModal.tsx
// Modal for starting a new direct or group conversation.

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useConversationStore } from "@/store/conversationStore";
import { usersAPI, conversationsAPI, groupsAPI } from "@/lib/api";
import { User } from "@/app/types";
import { getInitials } from "@/lib/utils";

interface Props {
  onClose: () => void;
}

export default function NewChatModal({ onClose }: Props) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { addConversation } = useConversationStore();

  const [tab,      setTab]      = useState<"direct" | "group">("direct");
  const [users,    setUsers]    = useState<User[]>([]);
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [groupName,setGroupName]= useState("");
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    async function loadUsers() {
      try {
        const all = await usersAPI.getAllUsers();
        setUsers(all.filter((u: User) => u.id !== user?.id));
      } catch (e) {
        console.error(e);
      }
    }
    loadUsers();
  }, [user]);

  const filtered = users.filter((u) =>
    u.display_name.toLowerCase().includes(search.toLowerCase()) ||
    u.phone_number.includes(search)
  );

  async function handleStartDirect(userId: string) {
    if (!user) return;
    setLoading(true);
    try {
      const conv = await conversationsAPI.createDirect(user.id, userId);
      addConversation(conv);
      router.push(`/chat/${conv.id}`);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateGroup() {
    if (!user || !groupName || selected.length === 0) return;
    setLoading(true);
    try {
      const conv = await groupsAPI.createGroup(user.id, {
        name:       groupName,
        member_ids: selected,
      });
      addConversation(conv);
      router.push(`/chat/${conv.id}`);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      position:        "fixed",
      inset:           0,
      backgroundColor: "rgba(0,0,0,0.7)",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      zIndex:          200,
    }}
    onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width:           "420px",
          backgroundColor: "#1e1e1e",
          borderRadius:    "16px",
          overflow:        "hidden",
          boxShadow:       "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div style={{
          padding:        "20px",
          borderBottom:   "1px solid #3a3a3a",
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
        }}>
          <h2 style={{ color: "#e9e9e9", fontSize: "18px", fontWeight: "600", margin: 0 }}>
            New Conversation
          </h2>
          <button onClick={onClose} style={{
            background: "none", border: "none",
            color: "#8a8a8a", fontSize: "20px", cursor: "pointer",
          }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{
          display:      "flex",
          padding:      "12px 20px",
          gap:          "8px",
          borderBottom: "1px solid #3a3a3a",
        }}>
          {(["direct", "group"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding:         "6px 16px",
                borderRadius:    "20px",
                border:          "none",
                cursor:          "pointer",
                fontSize:        "13px",
                fontWeight:      "500",
                backgroundColor: tab === t ? "#2c6bed" : "#2a2a2a",
                color:           tab === t ? "#fff" : "#8a8a8a",
              }}
            >
              {t === "direct" ? "Direct Message" : "New Group"}
            </button>
          ))}
        </div>

        {/* Group name input */}
        {tab === "group" && (
          <div style={{ padding: "12px 20px 0" }}>
            <input
              type="text"
              placeholder="Group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              style={{
                width:           "100%",
                padding:         "10px 14px",
                backgroundColor: "#2a2a2a",
                border:          "1px solid #3a3a3a",
                borderRadius:    "8px",
                color:           "#e9e9e9",
                fontSize:        "14px",
                outline:         "none",
                boxSizing:       "border-box",
              }}
            />
          </div>
        )}

        {/* Search */}
        <div style={{ padding: "12px 20px 0" }}>
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width:           "100%",
              padding:         "10px 14px",
              backgroundColor: "#2a2a2a",
              border:          "1px solid #3a3a3a",
              borderRadius:    "8px",
              color:           "#e9e9e9",
              fontSize:        "14px",
              outline:         "none",
              boxSizing:       "border-box",
            }}
          />
        </div>

        {/* User list */}
        <div style={{ maxHeight: "300px", overflowY: "auto", padding: "8px 0" }}>
          {filtered.map((u) => (
            <div
              key={u.id}
              onClick={() => {
                if (tab === "direct") {
                  handleStartDirect(u.id);
                } else {
                  setSelected((prev) =>
                    prev.includes(u.id)
                      ? prev.filter((id) => id !== u.id)
                      : [...prev, u.id]
                  );
                }
              }}
              style={{
                display:         "flex",
                alignItems:      "center",
                gap:             "12px",
                padding:         "10px 20px",
                cursor:          "pointer",
                backgroundColor: selected.includes(u.id) ? "#1a2d4a" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!selected.includes(u.id))
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#252525";
              }}
              onMouseLeave={(e) => {
                if (!selected.includes(u.id))
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              <div style={{
                width:           "40px",
                height:          "40px",
                borderRadius:    "50%",
                backgroundColor: "#2c6bed",
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                fontSize:        "14px",
                fontWeight:      "600",
                color:           "#fff",
                overflow:        "hidden",
                flexShrink:      0,
              }}>
                {u.avatar_url ? (
                  <img
                    src={u.avatar_url}
                    alt={u.display_name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : getInitials(u.display_name)}
              </div>
              <div>
                <div style={{ color: "#e9e9e9", fontSize: "14px", fontWeight: "500" }}>
                  {u.display_name}
                </div>
                <div style={{ color: "#8a8a8a", fontSize: "12px" }}>
                  {u.phone_number}
                </div>
              </div>
              {tab === "group" && selected.includes(u.id) && (
                <div style={{ marginLeft: "auto", color: "#2c6bed", fontSize: "18px" }}>
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Create group button */}
        {tab === "group" && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid #3a3a3a" }}>
            <button
              onClick={handleCreateGroup}
              disabled={loading || !groupName || selected.length === 0}
              style={{
                width:           "100%",
                padding:         "12px",
                backgroundColor: "#2c6bed",
                color:           "#fff",
                border:          "none",
                borderRadius:    "8px",
                fontSize:        "14px",
                fontWeight:      "600",
                cursor:          "pointer",
                opacity:         loading || !groupName || selected.length === 0 ? 0.5 : 1,
              }}
            >
              {loading
                ? "Creating..."
                : `Create Group (${selected.length} members)`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}