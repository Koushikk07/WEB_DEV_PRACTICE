// store/chatStore.ts
// Stores messages for the currently open conversation.
// Also stores typing indicators and online status.

import { create } from "zustand";
import { Message } from "@/app/types";

interface TypingUser {
  user_id:      string;
  display_name: string;
}

interface ChatState {
  // Messages in the current conversation
  messages:    Message[];
  // Is messages loading?
  isLoading:   boolean;
  // Which users are currently typing
  typingUsers: TypingUser[];
  // Online status of other users
  onlineUsers: Set<string>;

  // Actions
  setMessages:      (messages: Message[]) => void;
  addMessage:       (message: Message) => void;
  updateMessage:    (id: string, updates: Partial<Message>) => void;
  setLoading:       (loading: boolean) => void;
  setTyping:        (user: TypingUser, isTyping: boolean) => void;
  setUserOnline:    (user_id: string, isOnline: boolean) => void;
  clearMessages:    () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages:    [],
  isLoading:   false,
  typingUsers: [],
  onlineUsers: new Set(),

  setMessages: (messages) => set({ messages }),

  // Add a new message to the list
  addMessage: (message) =>
    set((state) => {
      // Avoid duplicate messages
      const exists = state.messages.find((m) => m.id === message.id);
      if (exists) return state;
      return { messages: [...state.messages, message] };
    }),

  // Update an existing message (e.g. status change)
  updateMessage: (id, updates) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  // Add or remove a user from the typing list
  setTyping: (user, isTyping) =>
    set((state) => {
      if (isTyping) {
        const exists = state.typingUsers.find(
          (u) => u.user_id === user.user_id
        );
        if (exists) return state;
        return { typingUsers: [...state.typingUsers, user] };
      } else {
        return {
          typingUsers: state.typingUsers.filter(
            (u) => u.user_id !== user.user_id
          ),
        };
      }
    }),

  // Update online status
  setUserOnline: (user_id, isOnline) =>
    set((state) => {
      const newSet = new Set(state.onlineUsers);
      if (isOnline) {
        newSet.add(user_id);
      } else {
        newSet.delete(user_id);
      }
      return { onlineUsers: newSet };
    }),

  clearMessages: () =>
    set({ messages: [], typingUsers: [] }),
}));