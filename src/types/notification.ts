export type NotificationType = 'download' | 'like' | 'comment' | 'follow' | 'earning' | 'system' | 'approval' | 'rejection'

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  icon?: string
  emoji?: string
  iconBg?: string
  iconColor?: string
  actionUrl?: string
  link?: string
  metadata?: Record<string, any>
  isRead: boolean
  time: string
  createdAt: string
}

export interface NotificationPreferences {
  email: NotificationChannelPrefs
  push: NotificationChannelPrefs
  inApp: NotificationChannelPrefs
}

export interface NotificationChannelPrefs {
  downloads: boolean
  likes: boolean
  comments: boolean
  follows: boolean
  earnings: boolean
  system: boolean
}
