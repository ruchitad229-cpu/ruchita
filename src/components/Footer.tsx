import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Heart, ExternalLink, HelpCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useStore();

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      {/* 4 Value Pillars */}
      <div className="border-b border-gray-100 bg-gray-50/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mx-auto sm:mx-0 mb-2">
                <Truck className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">Fast 3–5 Day Delivery</h4>
              <p className="text-[11px] text-gray-500">Free priority shipping across India on orders over ₹999</p>
            </div>

            <div className="space-y-1">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto sm:mx-0 mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">100% Official Gear</h4>
              <p className="text-[11px] text-gray-500">Authentic Google-branded apparel, drinkware & tech bags</p>
            </div>

            <div className="space-y-1">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mx-auto sm:mx-0 mb-2">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">Easy 30-Day Returns</h4>
              <p className="text-[11px] text-gray-500">Hassle-free replacement or full refund with doorstep pickup</p>
            </div>

            <div className="space-y-1">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mx-auto sm:mx-0 mb-2">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">Guest Checkout</h4>
              <p className="text-[11px] text-gray-500">No account required. Complete your purchase in under 60 seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-6 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-sm">Google Merchandise Store</span>
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">Concept Prototype</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-gray-600">
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setActiveView('listing');
              }}
              className="hover:text-blue-600 transition-colors"
            >
              All Merchandise
            </button>
            <button 
              onClick={() => {
                setSelectedCategory('Best Sellers');
                setActiveView('listing');
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Best Sellers
            </button>
            <button 
              onClick={() => {
                setSelectedCategory('Hoodies');
                setActiveView('listing');
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Hoodies & Sweatshirts
            </button>
            <button 
              onClick={() => {
                setSelectedCategory('Drinkware');
                setActiveView('listing');
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Drinkware
            </button>
          </div>
        </div>

        {/* Disclaimer & Copyright (PRD Section 29) */}
        <div className="pt-6 text-center space-y-2 text-[11px] text-gray-400">
          <p>
            <strong>Prototype Disclaimer:</strong> This application is a design & conversion optimization prototype created to evaluate mobile customer journeys, frictionless guest checkout, and product discovery. It is not an official Google retail storefront.
          </p>
          <p>© 2026 Google Merchandise Store Mobile UX Redesign Concept. Built for high conversion & seamless mobile touch experience.</p>
        </div>
      </div>
    </footer>
  );
};
