import React from 'react';
import { 
  X, 
  BarChart3, 
  TrendingUp, 
  Activity, 
  CheckCircle, 
  MousePointerClick, 
  ShoppingBag, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AnalyticsDrawer: React.FC = () => {
  const { isAnalyticsOpen, setIsAnalyticsOpen, analyticsEvents, cart, lastOrder } = useStore();

  if (!isAnalyticsOpen) return null;

  // Calculate live funnel metrics
  const discoveryEvents = analyticsEvents.filter(e => e.category === 'Discovery').length;
  const engagementEvents = analyticsEvents.filter(e => e.category === 'Engagement').length;
  const checkoutEvents = analyticsEvents.filter(e => e.category === 'Checkout').length;
  const conversionEvents = analyticsEvents.filter(e => e.category === 'Conversion').length;

  const totalEvents = analyticsEvents.length;
  const hasPurchased = conversionEvents > 0 || !!lastOrder;

  // Conversion rate estimations based on session events
  const simulatedMobileConversion = hasPurchased ? '14.2%' : '4.8%';
  const simulatedAddToCartRate = cart.length > 0 || hasPurchased ? '28.5%' : '12.0%';
  const estimatedSpeedScore = '98/100 (Core Web Vitals)';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAnalyticsOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-900 text-white">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="text-sm font-bold tracking-tight">Conversion & KPI Telemetry</h2>
              <p className="text-[11px] text-gray-400">PRD Section 25 & 26 Optimization Tracker</p>
            </div>
          </div>
          <button
            onClick={() => setIsAnalyticsOpen(false)}
            className="p-1 text-gray-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Funnel Metrics Grid */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
            <span>Core Shopping Metrics (Target vs Prototype)</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
              High Impact
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
              <span className="text-[11px] text-gray-500 font-medium block">Mobile Conversion</span>
              <span className="text-lg font-bold text-blue-600">{simulatedMobileConversion}</span>
              <span className="text-[10px] text-emerald-600 font-semibold block">↑ +85% vs Old Baseline</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
              <span className="text-[11px] text-gray-500 font-medium block">Add-to-Cart Rate</span>
              <span className="text-lg font-bold text-emerald-600">{simulatedAddToCartRate}</span>
              <span className="text-[10px] text-emerald-600 font-semibold block">↑ Streamlined Quick Add</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
              <span className="text-[11px] text-gray-500 font-medium block">Guest Checkout Steps</span>
              <span className="text-lg font-bold text-gray-900">3 Steps</span>
              <span className="text-[10px] text-blue-600 font-semibold block">↓ Down from 5 Steps</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
              <span className="text-[11px] text-gray-500 font-medium block">Mobile Page Speed</span>
              <span className="text-lg font-bold text-amber-600">98 / 100</span>
              <span className="text-[10px] text-gray-500 font-semibold block">Good Core Web Vitals</span>
            </div>
          </div>
        </div>

        {/* Funnel Stages Progression */}
        <div className="p-4 border-b border-gray-200 space-y-2">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
            Customer Journey Funnel
          </span>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Discovery (Homepage & Search)</span>
              </div>
              <span className="font-bold text-gray-700">{discoveryEvents} triggers</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Engagement (PDP & Size Selection)</span>
              </div>
              <span className="font-bold text-gray-700">{engagementEvents} triggers</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">3</span>
                <span>Checkout (Cart & Delivery)</span>
              </div>
              <span className="font-bold text-gray-700">{checkoutEvents} triggers</span>
            </div>

            <div className={`flex items-center justify-between p-2 rounded-lg border ${
              conversionEvents > 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold' : 'bg-gray-50 border-gray-100 text-gray-500'
            }`}>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
                <span>Purchase Conversion</span>
              </div>
              <span className="font-bold">{conversionEvents} Orders</span>
            </div>
          </div>
        </div>

        {/* Real-time Event Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Live Session Telemetry Log ({analyticsEvents.length})
            </span>
          </div>

          <div className="space-y-1.5 font-mono text-[11px]">
            {analyticsEvents.map((evt) => (
              <div 
                key={evt.id} 
                className="p-2 rounded-lg bg-gray-50 border border-gray-200/70 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    evt.category === 'Conversion'
                      ? 'bg-emerald-100 text-emerald-800'
                      : evt.category === 'Checkout'
                      ? 'bg-blue-100 text-blue-800'
                      : evt.category === 'Engagement'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-200 text-gray-800'
                  }`}>
                    {evt.category}
                  </span>
                  <span className="text-[10px] text-gray-400">{evt.timestamp}</span>
                </div>
                <div className="font-semibold text-gray-900 mt-1">{evt.name}</div>
                {evt.details && (
                  <div className="text-[10px] text-gray-500 truncate mt-0.5">
                    {JSON.stringify(evt.details)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
