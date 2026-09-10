import React, { useState } from 'react';
import { Heart, Star, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    setSelectedProduct, 
    setActiveView, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    trackEvent 
  } = useStore();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [showQuickSize, setShowQuickSize] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const handleCardClick = () => {
    setSelectedProduct(product);
    setActiveView('detail');
    trackEvent('Discovery', 'Product Card Clicked', { product: product.name, price: product.price });
  };

  const handleQuickAdd = (e: React.MouseEvent, size?: string) => {
    e.stopPropagation();
    addToCart(product, size || product.sizes[0], selectedColor, 1);
    setShowQuickSize(false);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 flex flex-col overflow-hidden"
    >
      {/* Product Image Area */}
      <div 
        onClick={handleCardClick}
        className="relative aspect-square w-full bg-gray-50 overflow-hidden cursor-pointer"
      >
        <img
          src={product.images.front}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge Pill */}
        {product.badge && (
          <div className="absolute top-2 left-2 z-10">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs ${
              product.badge === 'Best Seller'
                ? 'bg-amber-500 text-white'
                : product.badge === 'New'
                ? 'bg-blue-600 text-white'
                : 'bg-emerald-600 text-white'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          id={`wishlist-button-${product.id}`}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-xs transition-colors z-10 ${
            isWishlisted 
              ? 'bg-red-50 text-red-600 shadow-xs' 
              : 'bg-white/80 text-gray-500 hover:text-red-500 hover:bg-white shadow-2xs'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Size Picker Overlay if open */}
        {showQuickSize && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 bg-white/95 backdrop-blur-xs p-3 z-20 flex flex-col justify-between animate-in fade-in duration-150"
          >
            <div>
              <div className="text-xs font-semibold text-gray-800 mb-1">Select Size</div>
              <div className="grid grid-cols-3 gap-1.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={(e) => handleQuickAdd(e, sz)}
                    className="py-1.5 text-xs font-semibold border border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-gray-800 rounded transition-colors"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickSize(false);
              }}
              className="text-xs text-gray-500 underline text-center pt-1"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div onClick={handleCardClick} className="cursor-pointer space-y-1">
          
          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-gray-800">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviewCount})</span>
          </div>

          {/* Product Name */}
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 pt-0.5">
            <span className="text-sm sm:text-base font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Available Colors Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="pt-1 flex items-center gap-1.5">
              <span className="text-[10px] text-gray-500">Colors:</span>
              <div className="flex items-center gap-1">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedColor(c.name);
                    }}
                    style={{ backgroundColor: c.hex }}
                    className={`w-3.5 h-3.5 rounded-full border ${
                      selectedColor === c.name 
                        ? 'ring-1.5 ring-blue-600 ring-offset-1 border-white' 
                        : 'border-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Add CTA Button */}
        <div className="pt-2 mt-2 border-t border-gray-100">
          {product.sizes.length > 1 ? (
            <button
              id={`quick-add-${product.id}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickSize(true);
              }}
              className="w-full py-2 px-2 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-400 text-gray-800 hover:text-blue-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          ) : (
            <button
              id={`quick-add-${product.id}`}
              type="button"
              onClick={(e) => handleQuickAdd(e)}
              className="w-full py-2 px-2 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-400 text-gray-800 hover:text-blue-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
