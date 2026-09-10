import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  Heart, 
  BarChart3, 
  ChevronRight,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';

export const Header: React.FC = () => {
  const { 
    cartCount, 
    setIsCartOpen, 
    wishlist, 
    activeView, 
    setActiveView,
    selectedCategory,
    setSelectedCategory,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setIsAnalyticsOpen,
    setSearchQuery,
    trackEvent
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [headerSearchInput, setHeaderSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearchInput.trim()) {
      setSearchQuery(headerSearchInput.trim());
      setActiveView('listing');
      setIsSearchOpen(false);
      trackEvent('Discovery', 'Search Submitted', { query: headerSearchInput.trim() });
    }
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setActiveView('listing');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Prototype & Free Delivery Announcement Bar */}
      <div className="bg-gray-900 text-white text-xs py-1.5 px-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-white">Free delivery</span> on orders above ₹999 | Concept Mobile Prototype
          </div>
          <button 
            id="header-kpi-button"
            onClick={() => setIsAnalyticsOpen(true)}
            className="flex items-center gap-1 text-[11px] text-blue-300 hover:text-white bg-gray-800 hover:bg-gray-700 px-2 py-0.5 rounded transition-colors whitespace-nowrap ml-2"
          >
            <BarChart3 className="w-3 h-3" />
            <span className="hidden sm:inline">Conversion Funnel</span>
            <span className="sm:hidden">KPIs</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-drawer-toggle"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-gray-700 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Open mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo with Google Colors */}
          <div className="flex items-center">
            <button
              id="brand-logo-button"
              onClick={() => {
                setActiveView('home');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="flex items-center gap-2 text-left group"
            >
              {/* Google 4-Color Icon */}
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 group-hover:border-blue-400 transition-colors shadow-xs">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-medium text-base sm:text-lg text-gray-900 tracking-tight">Google</span>
                  <span className="font-normal text-xs text-gray-500 uppercase tracking-wider">Store</span>
                </div>
                <div className="text-[10px] text-gray-500 font-normal leading-tight hidden sm:block">
                  Official Merchandise
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Categories Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-gray-700">
            {['Apparel', 'Accessories', 'Drinkware', 'Office', 'Best Sellers', 'New Arrivals'].map((cat) => (
              <button
                key={cat}
                id={`nav-link-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleCategoryClick(cat)}
                className={`hover:text-blue-600 transition-colors py-1 ${
                  selectedCategory === cat && activeView === 'listing' 
                    ? 'text-blue-600 font-semibold border-b-2 border-blue-600' 
                    : ''
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Toggle */}
            <button
              id="search-header-toggle"
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Search store"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              id="wishlist-header-button"
              onClick={() => {
                setActiveView('listing');
                trackEvent('Discovery', 'Wishlist Tab Clicked');
              }}
              className="hidden sm:flex p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors relative"
              aria-label="Saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Cart Icon with Live Count */}
            <button
              id="cart-header-button"
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors relative"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-xs font-semibold text-gray-700">
                Cart
              </span>
            </button>
          </div>
        </div>

        {/* Expandable Search Input Bar (smooth toggle) */}
        {isSearchOpen && (
          <div className="py-2.5 border-t border-gray-100">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                id="header-search-input"
                type="text"
                autoFocus
                value={headerSearchInput}
                onChange={(e) => setHeaderSearchInput(e.target.value)}
                placeholder="Search Google merchandise (e.g. hoodie, t-shirt, mug)..."
                className="w-full bg-gray-100 border border-gray-200 rounded-lg pl-10 pr-10 py-2 text-sm text-gray-900 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              {headerSearchInput && (
                <button
                  type="button"
                  onClick={() => setHeaderSearchInput('')}
                  className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-lg text-gray-900">Google</span>
                <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded">Store</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Badges */}
            <div className="p-3 bg-gray-50 border-b border-gray-100 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  handleCategoryClick('Best Sellers');
                }}
                className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-gray-200 text-gray-800 font-medium hover:border-blue-400"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Best Sellers
              </button>
              <button
                onClick={() => {
                  handleCategoryClick('New Arrivals');
                }}
                className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-gray-200 text-gray-800 font-medium hover:border-blue-400"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                New Arrivals
              </button>
            </div>

            {/* Categories List */}
            <div className="py-2 flex-1">
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Shop By Category
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between text-sm font-medium text-gray-800 hover:bg-blue-50 hover:text-blue-600 border-b border-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-7 h-7 rounded-md object-cover border border-gray-200" 
                    />
                    <span>{cat.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>

            {/* Mobile Trust Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Fast 3–5 Day Delivery Across India</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>100% Genuine Official Merchandise</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
