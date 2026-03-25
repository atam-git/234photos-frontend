import { create } from "zustand";
import { User } from "@/types";

interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: false,
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  
  login: async (credentials) => {
    set({ isLoading: true });
    try {
      // TODO: Implement login API call
      console.log("Login with:", credentials);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  
  logout: async () => {
    set({ isLoading: true });
    try {
      // TODO: Implement logout API call
      set({ user: null, session: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  
  refreshSession: async () => {
    // TODO: Implement session refresh
    console.log("Refreshing session");
  },
}));
