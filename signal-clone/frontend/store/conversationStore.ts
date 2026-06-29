// store/conversationStore.ts
// Stores the list of conversations shown in the sidebar.

import { create } from "zustand";
import { Conversation } from "@/app/types";

interface ConversationState {
  // All conversations for the logged in user
  conversations:       Conversation[];
  // The currently open conversation
  activeConversation:  Conversation | null;
  // Is the list loading?
  isLoading:           boolean;

  // Actions
  setConversations:      (convs: Conversation[]) => void;
  setActiveConversation: (conv: Conversation | null) => void;
  addConversation:       (conv: Conversation) => void;
  updateConversation:    (id: string, updates: Partial<Conversation>) => void;
  setLoading:            (loading: boolean) => void;
  incrementUnread:       (conv_id: string) => void;
  clearUnread:           (conv_id: string) => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
  conversations:      [],
  activeConversation: null,
  isLoading:          false,

  setConversations: (convs) => set({ conversations: convs }),

  setActiveConversation: (conv) => set({ activeConversation: conv }),

  addConversation: (conv) =>
    set((state) => ({
      conversations: [conv, ...state.conversations],
    })),

  updateConversation: (id, updates) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
      activeConversation:
        state.activeConversation?.id === id
          ? { ...state.activeConversation, ...updates }
          : state.activeConversation,
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  // Add 1 to unread count for a conversation
  incrementUnread: (conv_id) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conv_id
          ? { ...c, unread_count: c.unread_count + 1 }
          : c
      ),
    })),

  // Set unread count to 0 when user opens a conversation
  clearUnread: (conv_id) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conv_id ? { ...c, unread_count: 0 } : c
      ),
    })),
}));