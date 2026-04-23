import { TrendingUp, Download, Eye, DollarSign } from 'lucide-react'

// Dashboard stats
export const DASHBOARD_STATS = [
  { label: 'Earnings this month', value: '$1,240', change: '+18%', up: true, icon: TrendingUp },
  { label: 'Downloads this month', value: '847', change: '+12%', up: true, icon: Download },
  { label: 'Total views', value: '12.4K', change: '+8%', up: true, icon: Eye },
  { label: 'Leaderboard rank', value: '#42', change: '+5', up: true, icon: DollarSign },
]

export const DASHBOARD_ACTIVITY = [
  { icon: '⬇️', text: '5 downloads of "Lagos Skyline" today', sub: 'Earned $12.50 · 2 hours ago' },
  { icon: '✅', text: '12 assets approved and now live', sub: '4 hours ago' },
  { icon: '🎉', text: 'You reached 10K total downloads!', sub: 'Yesterday' },
  { icon: '💰', text: 'Withdrawal of $500 processed', sub: '2 days ago' },
]

export const DASHBOARD_BADGES = [
  { emoji: '🏆', label: 'Top 10 Nigeria', earned: true },
  { emoji: '🔥', label: '30-day streak', earned: true },
  { emoji: '🎯', label: 'Gap filler ×3', earned: true },
  { emoji: '👑', label: '1000 downloads', earned: true },
  { emoji: '⭐', label: '5000 downloads', earned: false, progress: 58 },
]

// Earnings data
export const EARNINGS_MONTHS = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']
export const EARNINGS_DATA = [320, 480, 390, 620, 890, 1240]

// Support FAQ
export const SUPPORT_FAQ_ITEMS = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I download an asset?',
        a: 'Browse or search for assets, click on the asset you want, then click the "Download" button. You\'ll need credits to download. Each standard download costs 1 credit.',
      },
      {
        q: 'What are credits and how do they work?',
        a: 'Credits are our currency for downloading assets. 1 credit = 1 standard download. You can purchase credit packages or subscribe to a monthly plan. Credits never expire.',
      },
      {
        q: 'Can I use downloaded assets commercially?',
        a: 'Yes! All assets come with a royalty-free license that allows commercial use. Check the specific license details on each asset page.',
      },
    ],
  },
  {
    category: 'Licensing',
    questions: [
      {
        q: 'What\'s the difference between Standard and Enhanced licenses?',
        a: 'Standard license allows up to 500,000 impressions and is perfect for most projects. Enhanced license offers unlimited impressions and additional usage rights for larger campaigns.',
      },
      {
        q: 'Can I use assets in client projects?',
        a: 'Yes, you can use assets in projects for your clients. The license transfers to the end product.',
      },
      {
        q: 'Do I need to credit the photographer?',
        a: 'Attribution is appreciated but not required for most assets. Editorial assets may require attribution - check the asset details.',
      },
    ],
  },
  {
    category: 'Account & Billing',
    questions: [
      {
        q: 'How do I cancel my subscription?',
        a: 'Go to Billing > Subscription tab and click "Cancel Subscription". You\'ll retain access until the end of your billing period.',
      },
      {
        q: 'Can I get a refund?',
        a: 'Credit purchases are non-refundable, but we\'re happy to help if you have issues. Contact support within 14 days of purchase.',
      },
      {
        q: 'Do unused credits expire?',
        a: 'No! Credits never expire. They remain in your account until you use them.',
      },
    ],
  },
  {
    category: 'Contributors',
    questions: [
      {
        q: 'How do I become a contributor?',
        a: 'Click "Become a Contributor" in your dashboard sidebar, fill out the application form, and submit your portfolio. We\'ll review within 2-3 business days.',
      },
      {
        q: 'How much do contributors earn?',
        a: 'Contributors earn 50% of each sale. Standard downloads pay $1.50, Enhanced downloads pay $7.50. Payments are made monthly via bank transfer or PayPal.',
      },
      {
        q: 'What are the photo requirements?',
        a: 'Photos must be at least 4MP (2000x2000px), high quality, properly exposed, and in focus. We accept JPG and PNG formats.',
      },
    ],
  },
]

export const SUPPORT_CONTACT_OPTIONS = [
  {
    icon: 'MessageCircle',
    title: 'Live Chat',
    description: 'Chat with our support team',
    action: 'Start chat',
    available: 'Mon-Fri, 9am-6pm WAT',
  },
  {
    icon: 'Mail',
    title: 'Email Support',
    description: 'support@234photos.com',
    action: 'Send email',
    available: 'Response within 24 hours',
  },
  {
    icon: 'Book',
    title: 'Help Center',
    description: 'Browse our documentation',
    action: 'Visit help center',
    available: 'Available 24/7',
  },
]

// Discover page
export const FOLLOWED_CONTRIBUTORS = [
  { name: 'Sarah Johnson', username: 'sarah-johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { name: 'Michael Chen', username: 'michael-chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'Emma Rodriguez', username: 'emma-rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
  { name: 'David Kim', username: 'david-kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
]

// Asset statuses
export const ASSET_STATUSES = ['all', 'live', 'pending', 'rejected'] as const

export const ASSET_STATUS_STYLES = {
  live: 'bg-green-50 text-green-700',
  pending: 'bg-yellow-50 text-yellow-700',
  rejected: 'bg-red-50 text-red-600',
}

// My Assets page collections
export const MOCK_ASSET_COLLECTIONS = [
  { 
    id: '1', 
    name: 'Lagos Collection', 
    assetCount: 24, 
    thumbnail: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=400&q=80' 
  },
  { 
    id: '2', 
    name: 'Business & Tech', 
    assetCount: 18, 
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80' 
  },
  { 
    id: '3', 
    name: 'Culture & Heritage', 
    assetCount: 32, 
    thumbnail: 'https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=400&q=80' 
  },
]

// Board detail page data
export const BOARD_DETAILS = [
  { 
    id: '1', 
    name: 'Campaign Q3 2024', 
    description: 'Assets for our Q3 marketing campaign across all channels', 
    count: 24, 
    type: 'shared' as const, 
    collaborators: 3, 
    shareLink: 'https://234photos.com/boards/shared/abc123' 
  },
  { 
    id: '2', 
    name: 'Brand Assets', 
    description: 'Official brand photography and graphics', 
    count: 12, 
    type: 'private' as const 
  },
  { 
    id: '3', 
    name: 'Inspiration', 
    description: 'Personal collection of inspiring visuals', 
    count: 47, 
    type: 'private' as const 
  },
]
