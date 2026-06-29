// lib/api.ts
// This is our API client.
// All HTTP requests to the backend go through this file.
// We use axios to make requests and automatically attach the auth token.

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request interceptor ──
// Before every request, attach the token from localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ── Response interceptor ──
// If we get a 401 (unauthorized), clear storage and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

// ─────────────────────────────────────────────
// AUTH API CALLS
// ─────────────────────────────────────────────

export const authAPI = {
  // Register a new user
  register: async (data: {
    phone_number: string;
    password:     string;
    display_name: string;
    avatar_url?:  string;
  }) => {
    const res = await api.post("/api/auth/register", data);
    return res.data;
  },

  // Login with phone number and password
  login: async (data: {
    phone_number: string;
    password:     string;
  }) => {
    const res = await api.post("/api/auth/login", data);
    return res.data;
  },

  // Verify OTP (always 1234)
  verifyOTP: async (data: {
    phone_number: string;
    otp:          string;
  }) => {
    const res = await api.post("/api/auth/verify-otp", data);
    return res.data;
  },

  // Logout
  logout: async (user_id: string) => {
    const res = await api.post(`/api/auth/logout?user_id=${user_id}`);
    return res.data;
  },
};

// ─────────────────────────────────────────────
// USERS API CALLS
// ─────────────────────────────────────────────

export const usersAPI = {
  // Get all users
  getAllUsers: async () => {
    const res = await api.get("/api/users/");
    return res.data;
  },

  // Get one user by ID
  getUser: async (user_id: string) => {
    const res = await api.get(`/api/users/${user_id}`);
    return res.data;
  },

  // Update user profile
  updateUser: async (user_id: string, data: {
    display_name?: string;
    avatar_url?:   string;
    about?:        string;
  }) => {
    const res = await api.put(`/api/users/${user_id}`, data);
    return res.data;
  },

  // Search users by name or phone
  searchUsers: async (query: string) => {
    const res = await api.get(`/api/users/search/${query}`);
    return res.data;
  },
};

// ─────────────────────────────────────────────
// CONVERSATIONS API CALLS
// ─────────────────────────────────────────────

export const conversationsAPI = {
  // Get all conversations for a user
  getUserConversations: async (user_id: string) => {
    const res = await api.get(`/api/conversations/user/${user_id}`);
    return res.data;
  },

  // Create or get a direct conversation
  createDirect: async (current_user_id: string, participant_id: string) => {
    const res = await api.post(
      `/api/conversations/direct?current_user_id=${current_user_id}`,
      { participant_id }
    );
    return res.data;
  },

  // Get one conversation by ID
  getConversation: async (conv_id: string) => {
    const res = await api.get(`/api/conversations/${conv_id}`);
    return res.data;
  },
};

// ─────────────────────────────────────────────
// MESSAGES API CALLS
// ─────────────────────────────────────────────

export const messagesAPI = {
  // Get all messages in a conversation
  getMessages: async (conv_id: string) => {
    const res = await api.get(`/api/messages/${conv_id}`);
    return res.data;
  },

  // Send a message via REST (fallback if WebSocket fails)
  sendMessage: async (sender_id: string, data: {
    conversation_id: string;
    content:         string;
    reply_to_id?:    string;
  }) => {
    const res = await api.post(
      `/api/messages/?sender_id=${sender_id}`,
      data
    );
    return res.data;
  },

  // Update message status
  updateStatus: async (message_id: string, status: string) => {
    const res = await api.put(
      `/api/messages/${message_id}/status?status=${status}`
    );
    return res.data;
  },

  // Delete a message
  deleteMessage: async (message_id: string) => {
    const res = await api.delete(`/api/messages/${message_id}`);
    return res.data;
  },
};

// ─────────────────────────────────────────────
// GROUPS API CALLS
// ─────────────────────────────────────────────

export const groupsAPI = {
  // Create a group
  createGroup: async (creator_id: string, data: {
    name:        string;
    member_ids:  string[];
    avatar_url?: string;
  }) => {
    const res = await api.post(
      `/api/groups/?creator_id=${creator_id}`,
      data
    );
    return res.data;
  },

  // Update group info
  updateGroup: async (group_id: string, data: {
    name?:       string;
    avatar_url?: string;
  }) => {
    const res = await api.put(`/api/groups/${group_id}`, data);
    return res.data;
  },

  // Add members
  addMembers: async (group_id: string, user_ids: string[]) => {
    const res = await api.post(`/api/groups/${group_id}/members`, {
      user_ids,
    });
    return res.data;
  },

  // Remove a member
  removeMember: async (group_id: string, user_id: string) => {
    const res = await api.delete(`/api/groups/${group_id}/members`, {
      data: { user_id },
    });
    return res.data;
  },
};

export default api;