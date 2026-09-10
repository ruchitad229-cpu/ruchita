import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, Filter, Check, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SEARCH_AUTOCOMPLETE_MAP } from '../data/products';

interface SearchBarProps {
  onFilterToggle?: () => void;
  activeFilterCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onFilterToggle, activeFilterCount = 0 }) => {
  const { searchQuery, setSearchQuery, setActiveView, trackEvent } = useStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state if searchQuery changes externally
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // Handle typing & autocomplete lookup
  useEffect(() => {
    const trimmed = inputValue.trim().toLowerCase();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    // Check map keys
    const matchedKey = Object.keys(SEARCH_AUTOCOMPLETE_MAP).find(key => 
      trimmed.includes(key) || key.includes(trimmed)
    );

    if (matchedKey && SEARCH_AUTOCOMPLETE_MAP[matchedKey]) {
      setSuggestions(SEARCH_AUTOCOMPLETE_MAP[matchedKey]);
    } else {
      // Generic suggestions
      setSuggestions([
        `${inputValue} in Apparel`,
        `${inputValue} in Accessories`,
        `Best-selling ${inputValue}`,
        `New ${inputValue} merchandise`
      ]);
    }
  }, [inputValue]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setSearchQuery(suggestion);
    setIsOpen(false);
    setActiveView('listing');
    trackEvent('Discovery', 'Autocomplete Suggestion Clicked', { suggestion });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue.trim());
    setIsOpen(false);
    setActiveView('listing');
    if (inputValue.trim()) {
      trackEvent('Discovery', 'Search Query Executed', { query: inputValue.trim() });
    }
  };

  const handleClear = () => {
    setInputValue('');
    setSearchQuery('');
    setSuggestions([]);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="relative flex-1">
          <input
            id="main-search-input"
            type="text"
            value={inputValue}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Search Google merchandise..."
            className="w-full bg-white border border-gray-300 rounded-full pl-11 pr-10 py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-xs transition-all"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 p-0.5 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Optional Filter Drawer Toggle Button for mobile */}
        {onFilterToggle && (
          <button
            type="button"
            id="mobile-filter-modal-trigger"
            onClick={onFilterToggle}
            className={`ml-2 p-3 rounded-full border flex items-center justify-center transition-colors relative ${
              activeFilterCount > 0
                ? 'bg-blue-50 border-blue-600 text-blue-600'
                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
            aria-label="Filter products"
          >
            <Filter className="w-5 h-5" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-gray-100 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-4 py-2 bg-gray-50/70 text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center justify-between">
            <span>Suggestions for "{inputValue}"</span>
            <span className="text-[10px] text-blue-600 font-normal">Press enter to view all</span>
          </div>

          <div className="py-1 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSuggestion(suggestion)}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500" />
                  <span className="font-medium">{suggestion}</span>
                </div>
                <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  View →
                </span>
              </button>
            ))}
          </div>

          {/* Quick Popular Keywords */}
          <div className="p-3 bg-gray-50 flex flex-wrap gap-1.5">
            <span className="text-xs text-gray-500 mr-1 self-center">Popular:</span>
            {['Hoodie', 'T-Shirt', 'Water Bottle', 'Backpack', 'Cap'].map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => handleSelectSuggestion(kw)}
                className="text-xs bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 px-2.5 py-1 rounded-full text-gray-600 transition-colors"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
