'use client';

import { Camera, Clock3, Flame, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

const RECENT_SEARCHES_KEY = '234photos-recent-searches';
const DEFAULT_TRENDING_SEARCHES = [
  'Lagos skyline',
  'African entrepreneurs',
  'Nairobi tech office',
  'Wedding portraits',
  'Marketplace scenes',
];

type SearchBarProps = {
  className?: string;
  trendingSearches?: string[];
};

export default function SearchBar({
  className = '',
  trendingSearches = DEFAULT_TRENDING_SEARCHES,
}: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    const storedSearches = window.localStorage.getItem(RECENT_SEARCHES_KEY);

    if (!storedSearches) {
      return [];
    }

    try {
      return JSON.parse(storedSearches) as string[];
    } catch {
      window.localStorage.removeItem(RECENT_SEARCHES_KEY);
      return [];
    }
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (isTypingTarget) {
        return;
      }

      event.preventDefault();
      inputRef.current?.focus();
      setIsOpen(true);
    };

    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handlePointerDown);
    };
  }, []);

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return trendingSearches.slice(0, 5);
    }

    return trendingSearches.filter((item) =>
      item.toLowerCase().includes(normalizedQuery)
    );
  }, [query, trendingSearches]);

  const persistRecentSearches = (items: string[]) => {
    setRecentSearches(items);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(items));
    }
  };

  const saveSearch = (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    const nextSearches = [
      trimmedValue,
      ...recentSearches.filter((item) => item.toLowerCase() !== trimmedValue.toLowerCase()),
    ].slice(0, 5);

    persistRecentSearches(nextSearches);
  };

  const runSearch = (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      router.push('/search');
      setIsOpen(false);
      return;
    }

    saveSearch(trimmedValue);
    router.push(`/search?q=${encodeURIComponent(trimmedValue)}`);
    setIsOpen(false);
  };

  const handleClearHistory = () => {
    persistRecentSearches([]);
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <div className="overflow-hidden rounded-[28px] border border-white/15 bg-white shadow-2xl ring-1 ring-black/5 backdrop-blur">
        <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:p-4">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setIsOpen(true)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  runSearch(query);
                }

                if (event.key === 'Escape') {
                  setIsOpen(false);
                  setQuery('');
                }
              }}
              placeholder="Search authentic African photos, vectors, and videos"
              className="w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-500"
              aria-label="Search 234photos"
            />
            <span className="hidden rounded-full border border-gray-200 px-2 py-1 text-xs font-medium text-gray-500 sm:inline-flex">
              /
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 text-gray-600 transition hover:border-primary hover:text-primary"
              aria-label="Open visual search"
              title="Visual search"
            >
              <Camera className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => runSearch(query)}
              className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-dark sm:flex-none"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {isOpen && (recentSearches.length > 0 || suggestions.length > 0) ? (
        <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-50 rounded-3xl border border-white/15 bg-white p-4 shadow-2xl ring-1 ring-black/5">
          {recentSearches.length > 0 ? (
            <div className="mb-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">Recent searches</p>
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-gray-900"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => runSearch(item)}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 transition hover:border-primary hover:text-primary"
                  >
                    <Clock3 className="h-4 w-4" />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">
              {query.trim() ? 'Suggested searches' : 'Trending now'}
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => runSearch(item)}
                  className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-sm text-white transition hover:bg-primary"
                >
                  <Flame className="h-4 w-4" />
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
