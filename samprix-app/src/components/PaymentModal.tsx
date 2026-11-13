import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { CheckCircle2, ShieldCheck, CreditCard, Lock, Smartphone, ArrowRight, Printer, X, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  orderData: Partial<Order>;
  totalAmount: number;
  items: CartItem[];
  onPaymentSuccess: (order: Order) => void;
  onClose: () => void;
  isDark: boolean;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  orderData,
  totalAmount,
  items,
  onPaymentSuccess,
  onClose,
  isDark
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'esewa' | 'khalti' | 'card' | 'cash'>('esewa');
  const [esewaId, setEsewaId] = useState('');
  const [khaltiId, setKhaltiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMethod === 'cash') {
      finalizeOrder('cash', 'pending');
      return;
    }
    // For digital payment, simulate 2-Factor OTP verification
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOtpStep(true);
    }, 900);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      finalizeOrder(selectedMethod, 'paid');
    }, 1200);
  };

  const finalizeOrder = (method: 'esewa' | 'khalti' | 'card' | 'cash', paymentStatus: 'paid' | 'pending') => {
    const orderNumber = `SMP-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: orderData.customerName || 'Valued Guest',
      phone: orderData.phone || '9840000000',
      email: orderData.email || 'guest@samprix.com',
      deliveryType: orderData.deliveryType || 'dine-in',
      tableNumber: orderData.tableNumber,
      deliveryAddress: orderData.deliveryAddress,
      notes: orderData.notes,
      items,
      subtotal: totalAmount,
      tax: 0,
      discount: orderData.discount || 0,
      total: Math.max(0, totalAmount - (orderData.discount || 0)),
      paymentMethod: method,
      paymentStatus,
      status: 'received',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          status: 'received',
          title: 'Order Confirmed',
          description: 'Payment authorized. Order sent directly to Samprix kitchen dispatch.',
          timestamp: 'Just now',
          isCompleted: true,
          isCurrent: true
        },
        {
          status: 'preparing',
          title: 'Kitchen Preparation',
          description: 'Chef selecting artisanal ingredients.',
          timestamp: 'Pending',
          isCompleted: false,
          isCurrent: false
        },
        {
          status: 'in_oven_grill',
          title: 'In Oven / Wok',
          description: 'Cooking to order.',
          timestamp: 'Pending',
          isCompleted: false,
          isCurrent: false
        },
        {
          status: 'ready',
          title: 'Plated / Ready for Service',
          description: 'Quality check and garnish.',
          timestamp: 'Pending',
          isCompleted: false,
          isCurrent: false
        },
        {
          status: 'completed',
          title: 'Served to Table / Delivered',
          description: 'Enjoy your food and gaming vibes!',
          timestamp: 'Pending',
          isCompleted: false,
          isCurrent: false
        }
      ]
    };

    setCompletedOrder(fullOrder);
    onPaymentSuccess(fullOrder);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className={`w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl relative overflow-hidden ${
        isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Close Button */}
        {!completedOrder && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {completedOrder ? (
          /* Success Receipt State */
          <div className="text-center space-y-6 py-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                Payment Authorized
              </span>
              <h3 className="text-2xl font-bold font-display mt-1">
                Order Placed Successfully!
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Receipt reference: <strong className="text-amber-400 font-mono">#{completedOrder.orderNumber}</strong>
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="text-left p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Customer</span>
                <span className="font-semibold text-slate-200">{completedOrder.customerName} ({completedOrder.phone})</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Dining Mode</span>
                <span className="font-semibold text-slate-200 capitalize">
                  {completedOrder.deliveryType} {completedOrder.tableNumber ? `(${completedOrder.tableNumber})` : ''}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Payment Gateway</span>
                <span className="font-semibold text-cyan-400 uppercase">
                  {completedOrder.paymentMethod} · {completedOrder.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-1">
                <span className="text-slate-300">Total Amount Paid</span>
                <span className="text-amber-400 font-mono">Rs. {completedOrder.total}/-</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-bold shadow-lg"
              >
                Go to Live Order Tracking
              </button>
            </div>
          </div>
        ) : otpStep ? (
          /* OTP 2FA Verification Step */
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display">
                Verify Payment Authorization
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We sent a 6-digit confirmation code to your registered wallet/card mobile number. (Demo code: <strong className="text-amber-400">884920</strong>)
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Enter One-Time Password (OTP)
              </label>
              <input
                type="text"
                maxLength={6}
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="884920"
                className="w-full text-center tracking-[0.5em] text-2xl font-mono py-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="hover:underline text-slate-400"
              >
                Back to Payment Method
              </button>
              <button
                type="button"
                onClick={() => setOtpCode('884920')}
                className="text-cyan-400 hover:underline font-semibold"
              >
                Auto-fill Demo OTP
              </button>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition cursor-pointer"
            >
              {isProcessing ? 'Verifying Gateway...' : `Authorize Rs. ${totalAmount}/- Payment`}
            </button>
          </form>
        ) : (
          /* Payment Method Selection */
          <form onSubmit={handleInitiatePayment} className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                256-Bit SSL Encrypted Checkout
              </span>
              <h3 className="text-2xl font-bold font-display mt-0.5">
                Select Payment Method
              </h3>
              <div className="text-xs text-slate-400 mt-1">
                Total payable amount: <span className="text-amber-400 font-bold font-mono text-sm">Rs. {totalAmount}/-</span>
              </div>
            </div>

            {/* Methods Grid */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedMethod('esewa')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition cursor-pointer ${
                  selectedMethod === 'esewa'
                    ? 'border-emerald-500 bg-emerald-950/30 text-white ring-1 ring-emerald-500'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-bold text-sm text-emerald-400">eSewa</span>
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-[10px] text-slate-400">Nepal's #1 Wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('khalti')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition cursor-pointer ${
                  selectedMethod === 'khalti'
                    ? 'border-purple-500 bg-purple-950/30 text-white ring-1 ring-purple-500'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-bold text-sm text-purple-400">Khalti</span>
                  <Smartphone className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-[10px] text-slate-400">Instant Wallet & Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('card')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition cursor-pointer ${
                  selectedMethod === 'card'
                    ? 'border-blue-500 bg-blue-950/30 text-white ring-1 ring-blue-500'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-bold text-sm text-blue-400">Debit / Card</span>
                  <CreditCard className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-[10px] text-slate-400">Visa / Mastercard</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('cash')}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition cursor-pointer ${
                  selectedMethod === 'cash'
                    ? 'border-amber-500 bg-amber-950/30 text-white ring-1 ring-amber-500'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-bold text-sm text-amber-400">Cash / Counter</span>
                  <Lock className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-[10px] text-slate-400">Pay on Delivery/Table</span>
              </button>
            </div>

            {/* Inputs corresponding to method */}
            {selectedMethod === 'esewa' && (
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <label className="text-slate-300 font-semibold">eSewa Mobile ID</label>
                <input
                  type="text"
                  required
                  value={esewaId}
                  onChange={(e) => setEsewaId(e.target.value)}
                  placeholder="e.g. 9841234567"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {selectedMethod === 'khalti' && (
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <label className="text-slate-300 font-semibold">Khalti Mobile / ID</label>
                <input
                  type="text"
                  required
                  value={khaltiId}
                  onChange={(e) => setKhaltiId(e.target.value)}
                  placeholder="e.g. 9801234567"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            )}

            {selectedMethod === 'card' && (
              <div className="space-y-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4111 2222 3333 4444"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-blue-500 mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-300 font-semibold">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold">CVV</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === 'cash' && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 leading-relaxed">
                You will pay <strong>Rs. {totalAmount}/-</strong> directly at your cafe table or to the delivery rider upon arrival.
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold text-sm shadow-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition cursor-pointer"
            >
              {isProcessing ? (
                'Connecting to Gateway...'
              ) : selectedMethod === 'cash' ? (
                'Place Order & Pay Later'
              ) : (
                <>
                  <span>Proceed to OTP Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
