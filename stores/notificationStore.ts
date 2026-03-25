import { create } from "zustand";
import { Notification } from "@/types";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isConnected: boolean;
  
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  addNotification: (notification: Notification) => void;
  connectSSE: () => void;
  disconnectSSE: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isConnected: false,
  
  fetchNotifications: async () => {
    try {
      // TODO: Implement fetch notifications API call
      console.log("Fetching notifications");
      set({ notifications: [] });
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      throw error;
    }
  },
  
  markAsRead: async (id) => {
    try {
      // TODO: Implement mark as read API call
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      throw error;
    }
  },
  
  markAllAsRead: async () => {
    try {
      // TODO: Implement mark all as read API call
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      throw error;
    }
  },
  
  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: notification.read ? state.unreadCount : state.unreadCount + 1,
    }));
  },
  
  connectSSE: () => {
    // TODO: Implement SSE connection
    console.log("Connecting to SSE");
    set({ isConnected: true });
  },
  
  disconnectSSE: () => {
    // TODO: Implement SSE disconnection
    console.log("Disconnecting from SSE");
    set({ isConnected: false });
  },
}));
