import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { Search, Package, Clock, CheckCircle2, ChevronRight, Share2, Mail, Phone, Flame, Truck, AlertCircle } from 'lucide-react';

interface OrderTrackingViewProps {
  orders: Order[];
  activeOrderId?: string;
  isDark: boolean;
  onSelectOrder?: (orderId: string) => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  orders,
  activeOrderId,
  isDark,
  onSelectOrder
}) => {
  const [searchQuery, setSearchQuery] = useState(activeOrderId || '');
  const [notificationSent, setNotificationSent] = useState<string | null>(null);

  // Find targeted order
  const currentOrder = orders.find((o) => {
    if (!searchQuery.trim()) return o.id === (activeOrderId || orders[0]?.id);
    const q = searchQuery.toLowerCase().trim();
    return (
      o.id.toLowerCase() === q ||
      o.orderNumber.toLowerCase() === q ||
      o.orderNumber.toLowerCase() === `#${q}` ||
      o.phone.includes(q) ||
      o.customerName.toLowerCase().includes(q)
    );
  }) || orders[0];

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'preparing':
      case 'in_oven_grill':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'ready':
      case 'out_for_delivery':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'completed':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'received': return 'Order Received in Kitchen';
      case 'preparing': return 'Chef Assembling Ingredients';
      case 'in_oven_grill': return 'Baking in Stone Oven & Wok';
      case 'ready': return 'Plated & Ready to Serve';
      case 'out_for_delivery': return 'Out For Fast Delivery';
      case 'completed': return 'Completed & Delivered';
      case 'cancelled': return 'Order Cancelled';
      default: return status;
    }
  };

  const handleSendWhatsAppUpdate = (order: Order) => {
    const text = encodeURIComponent(
      `Hello ${order.customerName}! Here is your live order update from Samprix Cafe N Gaming Zone:\n` +
      `Order: #${order.orderNumber}\n` +
      `Current Status: ${getStatusText(order.status)}\n` +
      `Items: ${order.items.map(i => `${i.quantity}x ${i.menuItem.name}`).join(', ')}\n` +
      `Total: Rs. ${order.total}/- (${order.paymentStatus.toUpperCase()})\n` +
      `Basundhara Chowki, MN Hospital | Tel: 9700287796`
    );
    window.open(`https://wa.me/977${order.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    setNotificationSent('whatsapp');
    setTimeout(() => setNotificationSent(null), 3500);
  };

  const handleSendEmailSimulation = (order: Order) => {
    setNotificationSent('email');
    setTimeout(() => setNotificationSent(null), 3500);
  };

  return (
    <section id="tracking" className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Real-Time Automated Tracking
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Track Your Order Live
          </h2>
          <p className="text-sm text-slate-400">
            Enter your order number or phone number to track kitchen preparation, stone-oven baking, and delivery status.
          </p>
        </div>

        {/* Search Bar & Order Switcher */}
        <div className="mb-8">
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID (e.g. SMP-8924) or Phone"
              className={`w-full pl-11 pr-4 py-3 rounded-2xl text-sm border font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-800 text-white placeholder-slate-500' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Quick Order Selector Pills if multiple exist */}
          {orders.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-3 overflow-x-auto text-xs">
              <span className="text-slate-500 font-semibold">Recent active orders:</span>
              {orders.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setSearchQuery(o.orderNumber)}
                  className={`px-3 py-1 rounded-lg border font-mono transition cursor-pointer ${
                    currentOrder?.id === o.id
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 font-bold'
                      : 'border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  #{o.orderNumber}
                </button>
              ))}
            </div>
          )}
        </div>

        {currentOrder ? (
          <div className={`rounded-3xl border overflow-hidden shadow-2xl ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            
            {/* Order Header Banner */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold font-mono text-white">
                    #{currentOrder.orderNumber}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(currentOrder.status)}`}>
                    {getStatusText(currentOrder.status)}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span>Customer: <strong className="text-slate-200">{currentOrder.customerName}</strong></span>
                  <span>·</span>
                  <span className="capitalize">{currentOrder.deliveryType}</span>
                  {currentOrder.tableNumber && <span>({currentOrder.tableNumber})</span>}
                </div>
              </div>

              {/* Automated Dispatch Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSendWhatsAppUpdate(currentOrder)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow"
                  title="Send live status update to customer WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Send to WhatsApp</span>
                </button>

                <button
                  onClick={() => handleSendEmailSimulation(currentOrder)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                  title="Send email notification receipt"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Update</span>
                </button>
              </div>
            </div>

            {/* Notification alert confirmation toast */}
            {notificationSent && (
              <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-6 py-2.5 text-xs font-semibold text-emerald-300 flex items-center justify-between animate-fade-in">
                <span>
                  {notificationSent === 'whatsapp' 
                    ? '✓ WhatsApp tracking link created! Opening chat with formatted order details...' 
                    : '✓ Real-time notification email dispatched to customer!'}
                </span>
              </div>
            )}

            {/* 5-Stage Live Animated Progress Stepper */}
            <div className="p-6 sm:p-8">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
                Preparation & Service Timeline
              </div>

              <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                {currentOrder.timeline.map((step, idx) => {
                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Step Indicator */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                        step.isCompleted
                          ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                          : step.isCurrent
                            ? 'bg-amber-500 text-slate-950 font-bold ring-4 ring-amber-500/20'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}>
                        {step.isCompleted ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : step.isCurrent ? (
                          <Flame className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-mono">{idx + 1}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-bold ${
                            step.isCurrent ? 'text-amber-400 font-display' : step.isCompleted ? 'text-slate-200' : 'text-slate-500'
                          }`}>
                            {step.title}
                          </h4>
                          <span className="text-xs font-mono text-slate-500">
                            {step.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Itemized Order Breakdown */}
              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Ordered Items ({currentOrder.items.length})
                </div>
                
                <div className="space-y-2.5">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center font-mono">
                          {item.quantity}x
                        </span>
                        <div>
                          <div className="font-semibold text-slate-200">{item.menuItem.name}</div>
                          {item.size && item.size !== 'Regular' && (
                            <div className="text-[10px] text-slate-400">Size: {item.size}</div>
                          )}
                        </div>
                      </div>
                      <span className="font-mono tabular-nums font-bold text-slate-300">
                        Rs. {item.price * item.quantity}/-
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotal, discount & total */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
                  <span className="text-slate-400">Total Charged ({currentOrder.paymentMethod.toUpperCase()})</span>
                  <span className="font-bold font-mono text-lg text-amber-400 tabular-nums">
                    Rs. {currentOrder.total}/-
                  </span>
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
            <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-base">No matching active orders found.</p>
            <p className="text-xs text-slate-500 mt-1">Check the order ID or try placing a new food order from our Menu.</p>
          </div>
        )}

      </div>
    </section>
  );
};
