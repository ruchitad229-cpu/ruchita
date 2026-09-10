import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';

export const CategorySection: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setActiveView, trackEvent } = useStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveView('listing');
    trackEvent('Discovery', 'Category Card Clicked', { category: categoryId });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 sm:py-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
              Explore Categories
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-normal">
              Swipe to discover gear tailored to your style
            </p>
          </div>

          {/* Desktop Arrow Controls */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label="Previous categories"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label="Next categories"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontally Scrollable Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                id={`category-card-${category.id.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleSelect(category.id)}
                className={`flex-shrink-0 group flex flex-col items-center text-center w-28 sm:w-32 p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/80 border-2 border-blue-600 shadow-xs'
                    : 'bg-gray-50/80 border border-gray-200 hover:border-gray-300 hover:bg-gray-100/80'
                }`}
              >
                {/* Category Image container */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden mb-2 bg-white shadow-xs">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-300"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-blue-600/10 border-2 border-blue-600 rounded-lg pointer-events-none" />
                  )}
                </div>

                {/* Category Name */}
                <span
                  className={`text-xs font-semibold leading-tight line-clamp-1 ${
                    isSelected ? 'text-blue-700' : 'text-gray-800 group-hover:text-blue-600'
                  }`}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
