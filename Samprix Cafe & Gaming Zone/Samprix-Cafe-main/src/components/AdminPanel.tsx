import React, { useState } from 'react';
import { Order, OrderStatus, Reservation, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  UtensilsCrossed, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Gamepad2, 
  CheckCircle, 
  Clock, 
  Share2, 
  Check, 
  X, 
  AlertCircle,
  Eye
} from 'lucide-react';

interface AdminPanelProps {
  orders: Order[];
  reservations: Reservation[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdateReservationStatus: (reservationId: string, newStatus: Reservation['status']) => void;
  isDark: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  orders,
  reservations,
  onUpdateOrderStatus,
  onUpdateReservationStatus,
  isDark,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'analytics' | 'menu'>('orders');
  const [menuItemsState, setMenuItemsState] = useState<MenuItem[]>(MENU_ITEMS);

  // Compute analytics metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const pendingOrders = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length;
  const activeReservations = reservations.filter(r => r.status === 'confirmed').length;

  const handleTogglePopular = (id: string) => {
    setMenuItemsState(prev => prev.map(item => item.id === id ? { ...item, isPopular: !item.isPopular } : item));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/90 backdrop-blur-md animate-fade-in flex flex-col">
      
      {/* Top Admin Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-display text-white">Samprix Cafe & Gaming Lounge — Admin Portal</h2>
            <div className="text-xs text-slate-400">Real-time Kitchen Orders, Reservations & Analytics System</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'orders' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'reservations' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Reservations ({reservations.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'analytics' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'menu' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Menu Manager
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
          >
            Exit Admin
          </button>
        </div>
      </header>

      {/* Main Admin Content Area */}
      <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">
        
        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-display text-white">Live Kitchen & Delivery Orders</h3>
              <span className="text-xs text-amber-400 font-semibold">{pendingOrders} active in kitchen</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold font-mono text-amber-400">#{order.orderNumber}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-200 border border-slate-700 uppercase font-semibold">
                        {order.deliveryType} {order.tableNumber ? `· ${order.tableNumber}` : ''}
                      </span>
                      <span className="text-xs text-slate-400">
                        Placed by <strong className="text-white">{order.customerName}</strong> ({order.phone})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white">
                        Total: Rs. {order.total}/- ({order.paymentMethod.toUpperCase()} · {order.paymentStatus})
                      </span>

                      {/* Direct WhatsApp Customer Notification Link */}
                      <a
                        href={`https://wa.me/977${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${order.customerName}, update on your Samprix Cafe order #${order.orderNumber}: Current status is ${order.status.toUpperCase()}. Basundhara Chowki.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1 hover:bg-emerald-600/30"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>WhatsApp Customer</span>
                      </a>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                    {order.items.map((i, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex justify-between">
                        <div>
                          <strong className="text-slate-200">{i.quantity}x {i.menuItem.name}</strong>
                          {i.size && i.size !== 'Regular' && <span className="text-[10px] text-amber-400 ml-1">({i.size})</span>}
                          {i.instructions && <div className="text-[10px] text-slate-500 italic">"{i.instructions}"</div>}
                        </div>
                        <span className="font-mono text-slate-400">Rs. {i.price * i.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Status Progression Controls */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-slate-400">Advance Kitchen Stage:</span>
                    <div className="flex items-center gap-2">
                      {(['received', 'preparing', 'in_oven_grill', 'ready', 'completed'] as OrderStatus[]).map((st) => (
                        <button
                          key={st}
                          onClick={() => onUpdateOrderStatus(order.id, st)}
                          className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer capitalize ${
                            order.status === st
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                          }`}
                        >
                          {st.replace(/_/g, ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: RESERVATIONS */}
        {activeTab === 'reservations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-display text-white">Table & Esports Station Reservations</h3>
              <span className="text-xs text-cyan-400 font-semibold">{activeReservations} confirmed bookings</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reservations.map((res) => (
                <div
                  key={res.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-400">{res.reservationNumber}</span>
                      <h4 className="text-base font-bold text-white mt-0.5">{res.customerName}</h4>
                      <div className="text-xs text-slate-400">{res.phone} · {res.guests} Guests</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                      res.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      res.status === 'seated' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {res.status}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Date & Time:</span>
                      <span className="font-semibold text-slate-200">{res.date} at {res.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Zone:</span>
                      <span className="font-semibold text-cyan-400 capitalize">{res.zone.replace('_', ' ')}</span>
                    </div>
                    {res.gamingHours && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Gaming Session:</span>
                        <span className="font-semibold text-amber-400">{res.gamingHours} Hours</span>
                      </div>
                    )}
                    {res.specialRequests && (
                      <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                        Note: <span className="italic text-slate-300">"{res.specialRequests}"</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => onUpdateReservationStatus(res.id, 'seated')}
                      className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                    >
                      Seat Guests
                    </button>
                    <button
                      onClick={() => onUpdateReservationStatus(res.id, 'completed')}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => onUpdateReservationStatus(res.id, 'cancelled')}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ROBUST ANALYTICS DASHBOARD */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-display text-white">Lounge & Restaurant Performance Analytics</h3>

            {/* KPI Cards Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Total Daily Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-2 tabular-nums">
                  Rs. {totalRevenue.toLocaleString()}/-
                </div>
                <div className="text-[11px] text-emerald-500 mt-1 font-semibold">+18.4% vs last week</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Total Food Orders</span>
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">
                  {orders.length} orders
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Average ticket: Rs. 840/-</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Gaming Rig Occupancy</span>
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-cyan-400 mt-2 tabular-nums">
                  88% Active
                </div>
                <div className="text-[11px] text-slate-400 mt-1">14/16 PC & PS5 stations booked</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Guest Satisfaction</span>
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">
                  4.9 / 5.0
                </div>
                <div className="text-[11px] text-slate-400 mt-1">From 640 verified customer reviews</div>
              </div>
            </div>

            {/* Popular Dishes Breakdown */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold font-display uppercase tracking-wider text-slate-300">
                Top Revenue Dishes & Combos
              </h4>
              <div className="space-y-3">
                {[
                  { name: 'Himalayan Chicken & Buff Jhol Mo:Mo', count: 184, rev: 55200, pct: '92%' },
                  { name: 'Fully Loaded Gamer Box Deal', count: 96, rev: 67200, pct: '84%' },
                  { name: 'Special Skyscraper Burger Deal', count: 88, rev: 39600, pct: '76%' },
                  { name: 'Chicken Feast & Tandoori Charcoal Pizza', count: 74, rev: 44400, pct: '68%' },
                  { name: 'Lotus Biscoff Speculoos Shake', count: 110, rev: 33000, pct: '60%' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-200">
                      <span>{item.name}</span>
                      <span className="font-mono text-amber-400 tabular-nums">Rs. {item.rev.toLocaleString()}/- ({item.count} orders)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-cyan-400 rounded-full" style={{ width: item.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: MENU MANAGER */}
        {activeTab === 'menu' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-display text-white">Menu Item Availability & Specials</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {menuItemsState.slice(0, 18).map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-white">{item.name}</h5>
                    <div className="text-xs text-amber-400 font-mono">Rs. {item.price}/-</div>
                  </div>
                  <button
                    onClick={() => handleTogglePopular(item.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      item.isPopular ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.isPopular ? '★ Popular' : 'Normal'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
