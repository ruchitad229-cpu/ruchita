import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown, 
  SlidersHorizontal, 
  Check, 
  Star,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { SearchBar } from './SearchBar';
import { CATEGORIES } from '../data/products';

export const ProductListing: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    wishlist,
    trackEvent
  } = useStore();

  // Local filter states
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [priceMax, setPriceMax] = useState<number>(5000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);

  // Available filter options extracted dynamically
  const allSizes = ['S', 'M', 'L', 'XL', 'XXL', '750ml', '22 Liters', '400ml', 'One Size'];
  const allColors = ['Black', 'Grey', 'Blue', 'White', 'Green', 'Coral', 'Khaki'];

  // Toggle helpers
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceMax(5000);
    setSelectedSizes([]);
    setSelectedColors([]);
    setOnlyInStock(false);
    setMinRating(0);
    setSortBy('featured');
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (priceMax < 5000) count++;
    if (selectedSizes.length > 0) count += selectedSizes.length;
    if (selectedColors.length > 0) count += selectedColors.length;
    if (onlyInStock) count++;
    if (minRating > 0) count++;
    return count;
  }, [selectedCategory, priceMax, selectedSizes, selectedColors, onlyInStock, minRating]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'Best Sellers') {
          if (!product.isBestSeller) return false;
        } else if (selectedCategory === 'New Arrivals') {
          if (!product.isNewArrival) return false;
        } else if (product.category !== selectedCategory && product.subCategory !== selectedCategory) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesFeature = product.features.some(f => f.toLowerCase().includes(query));
        if (!matchesName && !matchesCategory && !matchesDesc && !matchesFeature) {
          return false;
        }
      }

      // Price filter
      if (product.price > priceMax) return false;

      // In stock filter
      if (onlyInStock && !product.inStock) return false;

      // Rating filter
      if (minRating > 0 && product.rating < minRating) return false;

      // Size filter
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some(s => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // Color filter
      if (selectedColors.length > 0) {
        const hasColor = product.colors.some(c => 
          selectedColors.some(sc => c.name.toLowerCase().includes(sc.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [products, selectedCategory, searchQuery, priceMax, onlyInStock, minRating, selectedSizes, selectedColors, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Search Bar on Listing Page */}
      <SearchBar 
        onFilterToggle={() => setIsFilterModalOpen(true)} 
        activeFilterCount={activeFilterCount}
      />

      {/* Title & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              {searchQuery 
                ? `Results for "${searchQuery}"`
                : selectedCategory === 'all' 
                ? 'All Google Merchandise' 
                : selectedCategory}
            </h1>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
              {filteredProducts.length} items
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Crafted for developers, designers, and Google fans
          </p>
        </div>

        {/* Action Controls: Filter & Sort */}
        <div className="flex items-center gap-2">
          {/* Mobile Filter Button */}
          <button
            id="listing-filter-button"
            type="button"
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <select
              id="listing-sort-select"
              value={sortBy}
              onChange={(e) => {
                const val = e.target.value as any;
                setSortBy(val);
                trackEvent('Discovery', 'Sort Changed', { sortBy: val });
              }}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-xs font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 pointer-events-none" />
          </div>

          {/* Clear Filters (if active) */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="p-2 text-gray-500 hover:text-red-600 rounded-lg border border-transparent hover:border-gray-200 text-xs flex items-center gap-1"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-gray-500">Active filters:</span>
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">
              {selectedCategory}
              <button onClick={() => setSelectedCategory('all')} className="hover:text-blue-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {priceMax < 5000 && (
            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium">
              Under ₹{priceMax}
              <button onClick={() => setPriceMax(5000)} className="hover:text-gray-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedSizes.map(sz => (
            <span key={sz} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium">
              Size: {sz}
              <button onClick={() => toggleSize(sz)} className="hover:text-gray-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {selectedColors.map(c => (
            <span key={c} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium">
              Color: {c}
              <button onClick={() => toggleColor(c)} className="hover:text-gray-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {onlyInStock && (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">
              In Stock Only
              <button onClick={() => setOnlyInStock(false)} className="hover:text-emerald-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {minRating > 0 && (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-full font-medium">
              ★ {minRating}+ Stars
              <button onClick={() => setMinRating(0)} className="hover:text-amber-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Product Grid (2-column on mobile, 3-4 on tablet/desktop) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center space-y-3 bg-white rounded-2xl border border-dashed border-gray-200 p-8">
          <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-gray-900">No matching merchandise found</h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
            Try broadening your search term, clearing your active filters, or exploring all Google merchandise categories.
          </p>
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Filter Modal / Sheet (Slide-over for mobile & tablet) */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsFilterModalOpen(false)}
          />

          {/* Modal Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gray-700" />
                <h3 className="text-base font-bold text-gray-900">Filter Products</h3>
                {activeFilterCount > 0 && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Filters Body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-6 text-sm text-gray-800">
              
              {/* Category Filter */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-xs uppercase tracking-wider text-gray-500">
                  Category
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-2 text-left text-xs rounded-lg border flex items-center justify-between transition-colors ${
                        selectedCategory === cat.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {selectedCategory === cat.id && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-500">
                    Max Price
                  </h4>
                  <span className="text-xs font-bold text-blue-600">
                    ₹{priceMax.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min={800}
                  max={5000}
                  step={100}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>₹800</span>
                  <span>₹5,000</span>
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Size
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => toggleSize(sz)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                        selectedSizes.includes(sz)
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Color
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => toggleColor(color)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                        selectedColors.includes(color)
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Customer Rating
                </h4>
                <div className="space-y-1.5">
                  {[4.8, 4.5, 4.0].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                      className={`w-full p-2 rounded-lg border text-left text-xs flex items-center justify-between transition-colors ${
                        minRating === rating
                          ? 'border-amber-500 bg-amber-50 text-amber-900 font-semibold'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{rating} stars and above</span>
                      </div>
                      {minRating === rating && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability Toggle */}
              <div className="pt-2 border-t border-gray-200">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-medium text-gray-800">In Stock Only</span>
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                  />
                </label>
              </div>

            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center gap-3">
              <button
                type="button"
                onClick={clearAllFilters}
                className="w-1/3 py-2.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="w-2/3 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
              >
                Show Results ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
