import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  ChevronLeft, 
  Share2, 
  ZoomIn, 
  Check, 
  Info,
  Layers,
  Sparkles,
  ShoppingBag,
  Zap
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    setActiveView, 
    addToCart, 
    startBuyNow,
    wishlist, 
    toggleWishlist,
    trackEvent,
    showNotification
  } = useStore();

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-sm">No product selected.</p>
        <button
          onClick={() => setActiveView('listing')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
        >
          Browse Merchandise
        </button>
      </div>
    );
  }

  const [activeImageKey, setActiveImageKey] = useState<'front' | 'back' | 'detail' | 'lifestyle'>('front');
  const [selectedSize, setSelectedSize] = useState<string>(selectedProduct.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(selectedProduct.colors[0]?.name || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  const isWishlisted = wishlist.includes(selectedProduct.id);

  const imageEntries: { key: 'front' | 'back' | 'detail' | 'lifestyle'; label: string; url: string }[] = [
    { key: 'front', label: 'Front', url: selectedProduct.images.front },
    { key: 'back', label: 'Back', url: selectedProduct.images.back },
    { key: 'detail', label: 'Close-up', url: selectedProduct.images.detail },
    { key: 'lifestyle', label: 'Lifestyle', url: selectedProduct.images.lifestyle },
  ];

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    startBuyNow(selectedProduct, selectedSize, selectedColor);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showNotification('Product link copied to clipboard!');
      trackEvent('Engagement', 'Product Link Shared', { product: selectedProduct.name });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-28 sm:pb-12 space-y-6 sm:space-y-8">
      
      {/* Breadcrumb / Back Button */}
      <div className="flex items-center justify-between">
        <button
          id="pdp-back-button"
          type="button"
          onClick={() => setActiveView('listing')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            title="Share merchandise"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleWishlist(selectedProduct.id)}
            className={`p-2 rounded-full transition-colors ${
              isWishlisted ? 'text-red-600 bg-red-50' : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left: Product Images (Gallery, Thumbnails, Zoom) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Active Big Image */}
          <div className="relative aspect-square w-full rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden shadow-2xs group">
            <img
              src={selectedProduct.images[activeImageKey]}
              alt={`${selectedProduct.name} - ${activeImageKey}`}
              loading="eager"
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 cursor-zoom-in"
              onClick={() => setIsZoomOpen(true)}
            />

            {/* Badge */}
            {selectedProduct.badge && (
              <div className="absolute top-3 left-3 z-10">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-600 text-white shadow-xs">
                  {selectedProduct.badge}
                </span>
              </div>
            )}

            {/* Zoom Button overlay */}
            <button
              id="pdp-zoom-trigger"
              type="button"
              onClick={() => setIsZoomOpen(true)}
              className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full text-gray-700 hover:text-blue-600 shadow-sm transition-colors"
              title="Zoom image"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails row (Front, Back, Close-up, Lifestyle) as per PRD Section 12 */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {imageEntries.map((entry) => (
              <button
                key={entry.key}
                type="button"
                id={`thumb-${entry.key}`}
                onClick={() => {
                  setActiveImageKey(entry.key);
                  trackEvent('Engagement', 'Product Image Switched', { view: entry.key });
                }}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
                  activeImageKey === entry.key
                    ? 'border-blue-600 ring-2 ring-blue-100 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={entry.url}
                  alt={entry.label}
                  className="w-full h-full object-cover rounded-lg"
                />
                <span className="absolute bottom-1 left-1 right-1 text-[9px] font-semibold bg-black/60 text-white text-center rounded py-0.5 backdrop-blur-xs">
                  {entry.label}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* Right: Product Details, Selection, Trust & Action */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          
          {/* Header info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Official Google Merchandise
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                In Stock ({selectedProduct.stockCount} left)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {selectedProduct.name}
            </h1>

            {/* Rating and Reviews (PRD Section 11) */}
            <div className="flex items-center gap-2 pt-0.5">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-900">{selectedProduct.rating}</span>
              <span className="text-xs text-gray-500 underline cursor-pointer">
                {selectedProduct.reviewCount} verified reviews
              </span>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                ₹{selectedProduct.price.toLocaleString('en-IN')}
              </span>
              {selectedProduct.originalPrice && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    You save ₹{(selectedProduct.originalPrice - selectedProduct.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-gray-500">Inclusive of all taxes. Free shipping over ₹999.</p>
          </div>

          {/* Color Selection (PRD Section 11) */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-800">
                Color: <span className="text-gray-500 font-normal">{selectedColor}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              {selectedProduct.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    setSelectedColor(c.name);
                    trackEvent('Engagement', 'Color Swatch Changed', { color: c.name });
                  }}
                  className={`relative p-1 rounded-full border-2 transition-all ${
                    selectedColor === c.name
                      ? 'border-blue-600 ring-2 ring-blue-100'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  title={c.name}
                >
                  <span
                    style={{ backgroundColor: c.hex }}
                    className="block w-6 h-6 rounded-full border border-gray-300 shadow-2xs"
                  />
                  {selectedColor === c.name && (
                    <span className="sr-only">Selected</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection (PRD Section 11) */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-800">
                Size: <span className="text-gray-500 font-normal">{selectedSize}</span>
              </span>
              <button
                type="button"
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {selectedProduct.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  id={`pdp-size-${sz.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => {
                    setSelectedSize(sz);
                    trackEvent('Engagement', 'Size Selected', { size: sz });
                  }}
                  className={`py-2.5 text-xs font-semibold rounded-lg border transition-all ${
                    selectedSize === sz
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Quick Size Guide Drawer / Popup */}
            {showSizeGuide && (
              <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs space-y-1.5 animate-in fade-in">
                <div className="font-semibold text-gray-800">Unisex Sizing Reference (Inches)</div>
                <div className="grid grid-cols-5 text-center font-mono text-[11px] text-gray-600 pt-1">
                  <div>S: 36"</div>
                  <div>M: 38"</div>
                  <div>L: 40"</div>
                  <div>XL: 42"</div>
                  <div>XXL: 44"</div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop CTAs (PRD Section 11 & 21: ADD TO CART & BUY NOW) */}
          <div className="hidden sm:flex flex-col gap-3 pt-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                id="pdp-add-to-cart-cta-desktop"
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold tracking-wide shadow-sm hover:shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO CART</span>
              </button>

              <button
                id="pdp-buy-now-cta-desktop"
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-4 rounded-xl bg-gray-900 hover:bg-black active:bg-gray-800 text-white text-sm font-bold tracking-wide shadow-sm hover:shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>BUY NOW</span>
              </button>
            </div>
          </div>

          {/* Trust & Shipping Information (PRD Section 13) */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-800 font-semibold">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Estimated delivery: 3–5 business days</span>
              </div>
              <span className="text-emerald-600 font-bold">FREE</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Secure 256-bit Checkout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Easy 30-Day Returns</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fast Express Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Official Google Merchandise</span>
              </div>
            </div>
          </div>

          {/* Product Specifications & Details (PRD Section 11) */}
          <div className="space-y-3 pt-2 text-xs sm:text-sm text-gray-700">
            <h3 className="font-bold text-gray-900 text-sm">Product Specifications</h3>
            
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              <div className="py-2 flex justify-between">
                <span className="text-gray-500">Material</span>
                <span className="font-medium text-gray-900 text-right">{selectedProduct.material}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-500">Dimensions / Fit</span>
                <span className="font-medium text-gray-900 text-right">{selectedProduct.dimensions}</span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-500">Availability</span>
                <span className="font-medium text-emerald-600 text-right">In Stock • Ships in 24h</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed pt-1">
              {selectedProduct.description}
            </p>

            <div className="space-y-1 pt-1">
              <span className="font-semibold text-gray-800 text-xs">Highlights:</span>
              <ul className="space-y-1 list-disc list-inside text-xs text-gray-600">
                {selectedProduct.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>

      {/* STICKY MOBILE BOTTOM BAR (PRD Section 11: The Add to Cart button should remain visible while scrolling) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-lg flex items-center gap-3">
        <div className="shrink-0">
          <div className="text-[10px] text-gray-500">Total Price</div>
          <div className="text-base font-bold text-gray-900">
            ₹{selectedProduct.price.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-2">
          <button
            id="mobile-sticky-add-to-cart"
            type="button"
            onClick={handleAddToCart}
            className="w-full py-3 px-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ADD TO CART</span>
          </button>

          <button
            id="mobile-sticky-buy-now"
            type="button"
            onClick={handleBuyNow}
            className="w-full py-3 px-2 bg-gray-900 hover:bg-black active:bg-gray-800 text-white rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>BUY NOW</span>
          </button>
        </div>
      </div>

      {/* Image Zoom Lightbox Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 rounded-full bg-white/10"
          >
            ✕ Close
          </button>
          <img
            src={selectedProduct.images[activeImageKey]}
            alt="Enlarged zoom view"
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
        </div>
      )}

    </div>
  );
};
