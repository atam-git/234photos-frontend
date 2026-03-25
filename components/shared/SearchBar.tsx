'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for authentic African imagery..."
          className="w-full px-6 py-4 pr-32 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none text-lg"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded" title="Visual search">
            📷
          </button>
          <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark">
            Search
          </button>
        </div>
      </div>
      
      {/* Autocomplete dropdown would go here */}
    </div>
  );
}
