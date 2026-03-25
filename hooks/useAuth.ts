'use client';

import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  type: 'buyer' | 'contributor' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // API call would go here
      // const response = await fetch('/api/auth/login', { ... });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: async () => {
    set({ user: null, isAuthenticated: false });
  },
  
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },
}));
