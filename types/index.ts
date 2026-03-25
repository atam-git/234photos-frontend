// Core types for 234photos

export interface User {
  id: string;
  email: string;
  name: string;
  type: "buyer" | "contributor" | "admin";
  country: string;
  plan?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Asset {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  blurHash: string;
  mediaType: "photo" | "video" | "vector" | "illustration";
  orientation: "horizontal" | "vertical" | "square";
  width: number;
  height: number;
  fileSize: number;
  tags: string[];
  category: string;
  contributorId: string;
  contributor: Contributor;
  aiGenerated: boolean;
  editorial: boolean;
  downloads: number;
  views: number;
  licenses: License[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Contributor {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  country: string;
  totalAssets: number;
  totalDownloads: number;
  totalEarnings: number;
  rank?: number;
  badges: Badge[];
}

export interface License {
  type: "standard" | "enhanced" | "editorial";
  price: number;
  currency: string;
  features: string[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: Date;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  type: "private" | "shared" | "team";
  ownerId: string;
  assets: Asset[];
  collaborators: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  mediaType?: ("photo" | "video" | "vector" | "illustration")[];
  orientation?: ("horizontal" | "vertical" | "square")[];
  license?: ("standard" | "enhanced" | "editorial")[];
  color?: string;
  price?: "free" | "paid" | "subscription";
  contributors?: string[];
  aiContent?: "all" | "human" | "ai";
  dateAdded?: "24h" | "week" | "month" | "year";
  resolution?: ("sd" | "hd" | "4k" | "vector")[];
  location?: string;
  modelRelease?: boolean;
  propertyRelease?: boolean;
}

export interface SearchParams {
  query: string;
  filters?: SearchFilters;
  sortBy?: "relevance" | "popular" | "recent" | "downloads";
  page?: number;
  limit?: number;
}

export interface Notification {
  id: string;
  type: "download" | "approval" | "rejection" | "comment" | "campaign" | "earnings" | "system";
  title: string;
  message: string;
  icon: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface UploadFile {
  id: string;
  file: File;
  status: "queued" | "uploading" | "processing" | "complete" | "failed";
  progress: number;
  error?: string;
  metadata?: {
    title?: string;
    description?: string;
    tags?: string[];
    category?: string;
  };
}
