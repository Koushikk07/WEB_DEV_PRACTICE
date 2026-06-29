// store/authStore.ts
// Stores the logged-in user's information.
// Persists to localStorage so user stays logged in after refresh.

import { create } from "zustand";
import { User } from "@/app/types";

interface AuthState {
  // The currently logged in user
  user:       User | null;
  // The JWT token
  token:      string | null;
  // Is the user logged in?
  isLoggedIn: boolean;

  // Actions
  setAuth:   (user: User, token: string) => void;
  clearAuth: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Load from localStorage on startup
  user:  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null,
  token: typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null,
  isLoggedIn: typeof window !== "undefined"
    ? !!localStorage.getItem("token")
    : false,

  // Save user and token to state and localStorage
  setAuth: (user, token) => {
    localStorage.setItem("user",  JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token, isLoggedIn: true });
  },

  // Clear user and token from state and localStorage
  clearAuth: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null, isLoggedIn: false });
  },

  // Update user profile without logging out
  updateUser: (updates) => {
    set((state) => {
      if (!state.user) return state;
      const updatedUser = { ...state.user, ...updates };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },
}));