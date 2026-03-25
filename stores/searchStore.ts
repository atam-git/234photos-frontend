import { create } from "zustand";
import { Asset, SearchFilters } from "@/types";

type SortOption = "relevance" | "popular" | "recent" | "downloads";

interface SearchState {
  query: string;
  filters: SearchFilters;
  sortBy: SortOption;
  results: Asset[];
  isLoading: boolean;
  hasMore: boolean;
  page: number;
  
  setQuery: (query: string) => void;
  setFilters: (filters: SearchFilters) => void;
  setSortBy: (sortBy: SortOption) => void;
  resetFilters: () => void;
  loadMore: () => Promise<void>;
  search: () => Promise<void>;
}

const initialFilters: SearchFilters = {};

export const useSearchStore = create<SearchState>((set, get) => ({
  query: "",
  filters: initialFilters,
  sortBy: "relevance",
  results: [],
  isLoading: false,
  hasMore: true,
  page: 1,
  
  setQuery: (query) => set({ query }),
  
  setFilters: (filters) => set({ filters }),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  resetFilters: () => set({ filters: initialFilters }),
  
  search: async () => {
    set({ isLoading: true, page: 1 });
    try {
      // TODO: Implement search API call
      const { query, filters, sortBy } = get();
      console.log("Searching:", { query, filters, sortBy });
      
      // Mock results
      set({ results: [], hasMore: true });
    } catch (error) {
      console.error("Search failed:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  
  loadMore: async () => {
    const { hasMore, isLoading, page } = get();
    if (!hasMore || isLoading) return;
    
    set({ isLoading: true });
    try {
      // TODO: Implement load more API call
      console.log("Loading more results, page:", page + 1);
      set({ page: page + 1 });
    } catch (error) {
      console.error("Load more failed:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
