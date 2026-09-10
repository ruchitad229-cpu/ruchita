import React from 'react';
import { ArrowRight, Flame, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroSection: React.FC = () => {
  const { setActiveView, setSelectedCategory, trackEvent } = useStore();

  const handleShopNow = () => {
    setSelectedCategory('all');
    setActiveView('listing');
    trackEvent('Engagement', 'Hero CTA Clicked', { cta: 'Shop Now' });
  };

  const handleExploreBestSellers = () => {
    setSelectedCategory('Best Sellers');
    setActiveView('listing');
    trackEvent('Engagement', 'Hero CTA Clicked', { cta: 'Explore Best Sellers' });
  };

  return (
    <section className="relative overflow-hidden bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              2026 Season Collection Just Dropped
            </div>

            {/* Main Headline from PRD */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Official Google <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-emerald-600 to-amber-600 bg-clip-text text-transparent">
                Merchandise
              </span>
            </h1>

            {/* Subheadline from PRD */}
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Gear up with your favorite Google products. Premium organic hoodies, accessories, developer drinkware, and tech essentials designed for everyday creators.
            </p>

            {/* Action Buttons from PRD */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
              <button
                id="hero-shop-now-cta"
                onClick={handleShopNow}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold tracking-wide shadow-sm hover:shadow transition-all"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-explore-bestsellers-cta"
                onClick={handleExploreBestSellers}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-800 text-sm font-semibold border border-gray-300 hover:border-gray-400 transition-all"
              >
                <Flame className="w-4 h-4 text-amber-500" />
                <span>EXPLORE BEST SELLERS</span>
              </button>
            </div>

            {/* Trust Badges under CTA */}
            <div className="pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs text-gray-600">
                <Truck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Fast 3–5 Day Delivery</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs text-gray-600">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Genuine Google Gear</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs text-gray-600">
                <RotateCcw className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Easy 30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Right Product Image Column (Optimized for Mobile) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-b from-gray-100 to-gray-50 border border-gray-200 overflow-hidden shadow-sm group">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&auto=format&fit=crop&q=80"
                alt="Google Logo Hoodie in Charcoal"
                loading="eager"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />

              {/* Overlaid Floating Feature Card */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-gray-200 shadow-md flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                    Featured Item
                  </div>
                  <div className="text-sm font-bold text-gray-900">Google Logo Hoodie</div>
                  <div className="text-xs text-gray-500">★★★★★ 4.8 (124 reviews) • ₹3,999</div>
                </div>
                <button
                  id="hero-quick-view-button"
                  onClick={handleShopNow}
                  className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shrink-0"
                >
                  View
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
