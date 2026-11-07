import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Tag, Utensils, Bike, ShoppingCart, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: (orderDraft: Partial<Order>) => void;
  isDark: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isDark
}) => {
  const [deliveryType, setDeliveryType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
  const [tableNumber, setTableNumber] = useState('Table 4 (Gaming Zone)');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = Math.max(0, subtotal - appliedDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'SAMPRIX10') {
      const disc = Math.round(subtotal * 0.1);
      setAppliedDiscount(disc);
      setCouponMessage(`✓ Code SAMPRIX10 applied! (Rs. ${disc}/- saved)`);
    } else if (code === 'GAMERPASS') {
      setAppliedDiscount(100);
      setCouponMessage('✓ Gamer Pass special: Rs. 100/- discount applied!');
    } else {
      setCouponMessage('❌ Invalid coupon. Try SAMPRIX10 or GAMERPASS');
    }
  };

  const handleProceedToPayment = () => {
    if (!customerName || !phone) {
      alert('Please enter your Name and Phone Number to continue.');
      return;
    }

    onCheckout({
      customerName,
      phone,
      deliveryType,
      tableNumber: deliveryType === 'dine-in' ? tableNumber : undefined,
      deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : undefined,
      discount: appliedDiscount
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md flex flex-col justify-between shadow-2xl ${
          isDark ? 'bg-slate-900 border-l border-slate-800 text-white' : 'bg-white border-l border-slate-200 text-slate-900'
        }`}>
          
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold font-display">Your Food & Drink Tray</h3>
              <span className="text-xs text-slate-400 font-mono">({items.length} items)</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-sm">Your order tray is currently empty.</p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-amber-400 text-slate-950 text-xs font-bold rounded-lg"
                >
                  Browse Menu Items
                </button>
              </div>
            ) : (
              <>
                {items.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="font-bold text-sm text-slate-100 font-display">
                        {cartItem.menuItem.name}
                      </div>
                      {cartItem.size && cartItem.size !== 'Regular' && (
                        <div className="text-[11px] text-amber-400 font-medium">
                          Portion: {cartItem.size}
                        </div>
                      )}
                      {cartItem.instructions && (
                        <div className="text-[10px] text-slate-400 italic">
                          Note: "{cartItem.instructions}"
                        </div>
                      )}
                      <div className="text-xs font-bold font-mono text-cyan-400 mt-1">
                        Rs. {cartItem.price * cartItem.quantity}/-
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-lg bg-slate-800 border border-slate-700 p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.id, -1)}
                          className="p-1 hover:text-amber-400 text-slate-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold font-mono">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.id, 1)}
                          className="p-1 hover:text-amber-400 text-slate-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(cartItem.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Delivery Mode Tabs */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Dining Preference:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('dine-in')}
                      className={`p-2 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition ${
                        deliveryType === 'dine-in'
                          ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-bold'
                          : 'border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Dine-In</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType('takeaway')}
                      className={`p-2 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition ${
                        deliveryType === 'takeaway'
                          ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-bold'
                          : 'border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Takeaway</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`p-2 rounded-xl text-xs font-semibold border flex flex-col items-center gap-1 transition ${
                        deliveryType === 'delivery'
                          ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-bold'
                          : 'border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Bike className="w-3.5 h-3.5" />
                      <span>Delivery</span>
                    </button>
                  </div>

                  {deliveryType === 'dine-in' && (
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Table / Station Number</label>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="e.g. Table 3 or PS5 Station #2"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  )}

                  {deliveryType === 'delivery' && (
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Delivery Address in Kathmandu</label>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="e.g. Basundhara, near Mega Bank"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  )}
                </div>

                {/* Customer Contact */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-slate-400">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Aayush"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400">Phone (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9841234567"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo Code (SAMPRIX10)"
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white uppercase placeholder-slate-500 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <div className="text-[11px] mt-1 text-amber-400 font-medium">{couponMessage}</div>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/80 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">Rs. {subtotal}/-</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount Code</span>
                    <span className="font-mono tabular-nums">-Rs. {appliedDiscount}/-</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base text-white pt-2 border-t border-slate-800">
                  <span>Payable Total</span>
                  <span className="font-mono text-amber-400 text-lg tabular-nums">Rs. {finalTotal}/-</span>
                </div>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 active:scale-98 transition text-slate-950 font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Secure Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
