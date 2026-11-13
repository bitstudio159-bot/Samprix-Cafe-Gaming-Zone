import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ThreeBackground } from './components/ThreeBackground';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { BookingSection } from './components/BookingSection';
import { OrderTrackingView } from './components/OrderTrackingView';
import { CartDrawer } from './components/CartDrawer';
import { PaymentModal } from './components/PaymentModal';
import { LoyaltyDashboard } from './components/LoyaltyDashboard';
import { AIChatbot } from './components/AIChatbot';
import { AdminPanel } from './components/AdminPanel';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';

import { MenuItem, CartItem, Order, Reservation, UserLoyalty, OrderStatus } from './types';
import { INITIAL_ORDERS, INITIAL_RESERVATIONS, INITIAL_LOYALTY } from './data/sampleData';
import { MENU_ITEMS } from './data/menuData';
import { Utensils, Calendar, MapPin, Phone, ShoppingBag, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [menuError, setMenuError] = useState('');
  const refreshMenu = async () => {
    try {
      const response = await fetch('/api/menu');
      if (!response.ok) throw new Error('Menu API unavailable');
      const items: MenuItem[] = await response.json();
      setMenuItems(items);
      setMenuError('');
    } catch {
      setMenuError('Live menu unavailable. Showing saved sample menu.');
    }
  };
  useEffect(() => { void refreshMenu(); }, []);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [orderDraftForPayment, setOrderDraftForPayment] = useState<Partial<Order> | null>(null);
  const [trackingActiveOrderId, setTrackingActiveOrderId] = useState<string | null>(null);

  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('samprix_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state persisted and synced
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('samprix_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Reservations state persisted
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('samprix_reservations');
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  // Loyalty and XP state
  const [loyalty, setLoyalty] = useState<UserLoyalty>(() => {
    try {
      const saved = localStorage.getItem('samprix_loyalty');
      return saved ? JSON.parse(saved) : INITIAL_LOYALTY;
    } catch {
      return INITIAL_LOYALTY;
    }
  });

  // Persist state updates
  useEffect(() => {
    localStorage.setItem('samprix_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('samprix_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('samprix_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('samprix_loyalty', JSON.stringify(loyalty));
  }, [loyalty]);

  // Sync dark class on document root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  // Fetch orders & reservations from backend if available
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [ordersRes, resvRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/reservations')
        ]);
        if (ordersRes.ok) {
          const remoteOrders = await ordersRes.json();
          if (Array.isArray(remoteOrders) && remoteOrders.length > 0) {
            setOrders(remoteOrders);
          }
        }
        if (resvRes.ok) {
          const remoteResv = await resvRes.json();
          if (Array.isArray(remoteResv) && remoteResv.length > 0) {
            setReservations(remoteResv);
          }
        }
      } catch {
        // use local cache safely
      }
    };
    fetchBackendData();
  }, []);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Cart Handlers
  const handleAddToCart = (item: MenuItem, size: string = 'Regular', notes: string = '', customPrice?: number) => {
    const itemPrice = customPrice !== undefined ? customPrice : item.price;
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (ci) => ci.menuItem.id === item.id && ci.size === size && ci.instructions === notes
      );
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      } else {
        return [
          ...prev,
          {
            id: `ci-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            menuItem: item,
            size: size as any,
            price: itemPrice,
            quantity: 1,
            instructions: notes
          }
        ];
      }
    });
  };

  const handleUpdateCartQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.id === cartItemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  // Checkout flow
  const handleStartCheckout = (draft: Partial<Order>) => {
    setOrderDraftForPayment(draft);
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = async (createdOrder: Order) => {
    setOrders((prev) => [createdOrder, ...prev]);
    setCartItems([]);
    setTrackingActiveOrderId(createdOrder.id);

    // Sync with server API
    try {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createdOrder)
      });
    } catch {
      // offline fallback
    }

    // Award XP to Loyalty profile
    setLoyalty((prev) => {
      const addedXp = Math.round(createdOrder.total * 0.2);
      const newXp = prev.xp + addedXp;
      const newBeans = prev.coffeeBeansEarned + Math.floor(createdOrder.total / 100);
      const newLevel = Math.floor(newXp / 250) + 1;
      let newTier = prev.tier;
      if (newLevel >= 5) newTier = 'Samprix Royal VIP';
      else if (newLevel >= 4) newTier = 'Gold Master';
      else if (newLevel >= 3) newTier = 'Silver Legend';
      else if (newLevel >= 2) newTier = 'Bronze Grinder';

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        tier: newTier,
        coffeeBeansEarned: newBeans
      };
    });
  };

  // Reservation handler
  const handleReservationCreated = async (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev]);

    try {
      fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRes)
      });
    } catch {
      // offline fallback
    }

    // Add gaming hours to loyalty if esports
    if (newRes.gamingHours) {
      setLoyalty((prev) => ({
        ...prev,
        gamingHoursLogged: prev.gamingHoursLogged + (newRes.gamingHours || 2),
        xp: prev.xp + 150
      }));
    }
  };

  // Admin order status update
  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updatedTimeline = o.timeline.map((step) => {
            if (step.status === newStatus) {
              return { ...step, isCompleted: true, isCurrent: true, timestamp: 'Just now' };
            }
            return step;
          });
          return {
            ...o,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            timeline: updatedTimeline
          };
        }
        return o;
      })
    );

    try {
      fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch {
      // safe fallback
    }
  };

  const handleUpdateReservationStatus = async (resvId: string, newStatus: Reservation['status']) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === resvId ? { ...r, status: newStatus } : r))
    );

    try {
      fetch(`/api/reservations/${resvId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch {
      // safe fallback
    }
  };

  // Loyalty milestone claim
  const handleClaimMilestone = (milestoneId: string, xpReward: number) => {
    setLoyalty((prev) => ({
      ...prev,
      xp: prev.xp + xpReward,
      milestones: prev.milestones.map((m) =>
        m.id === milestoneId ? { ...m, completed: true } : m
      )
    }));
  };

  const handleUpgradeVIP = () => {
    setLoyalty((prev) => ({
      ...prev,
      tier: 'Samprix Royal VIP',
      level: Math.max(prev.level, 5),
      unlockedPerks: [
        ...prev.unlockedPerks,
        'VIP Cloud Shisha 15% off',
        'Unlimited priority PC battlestation bookings'
      ]
    }));
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className={`min-h-screen relative flex flex-col font-sans transition-colors duration-300 ${
      isDark ? 'bg-[#090d16] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* 3D Procedural Canvas with Coffee Beans & Gaming Polyhedrons */}
      <ThreeBackground isDark={isDark} />

      {/* Top Navigation Bar adhering to Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
        isAdmin={isAdminOpen}
        toggleAdmin={() => setIsAdminOpen(!isAdminOpen)}
        openLoyalty={() => setIsLoyaltyOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        
        {/* Render sections according to active tab */}
        {activeTab === 'home' && (
          <>
            <HeroSection
              onExploreMenu={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBookSession={() => {
                setActiveTab('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onTrackOrder={() => {
                setActiveTab('tracking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              isDark={isDark}
            />

            {/* Featured Menu Teaser */}
            <MenuSection onAddToCart={handleAddToCart} isDark={isDark} items={menuItems} menuError={menuError} />

            {/* Table & Gaming Rig Booking */}
            <BookingSection onReservationCreated={handleReservationCreated} isDark={isDark} />

            {/* Atmosphere Gallery */}
            <GallerySection isDark={isDark} />

            {/* Customer Trust Reviews */}
            <ReviewsSection isDark={isDark} />

            {/* Blog & Story */}
            <BlogSection isDark={isDark} />

            {/* FAQs */}
            <FaqSection isDark={isDark} />

            {/* Contact & Map */}
            <ContactSection isDark={isDark} />
          </>
        )}

        {activeTab === 'menu' && (
          <div className="pt-4">
            <MenuSection onAddToCart={handleAddToCart} isDark={isDark} items={menuItems} menuError={menuError} />
          </div>
        )}

        {activeTab === 'booking' && (
          <div className="pt-4">
            <BookingSection onReservationCreated={handleReservationCreated} isDark={isDark} />
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="pt-4">
            <OrderTrackingView
              orders={orders}
              activeOrderId={trackingActiveOrderId || undefined}
              isDark={isDark}
            />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="pt-4">
            <GallerySection isDark={isDark} />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-4">
            <AboutSection isDark={isDark} />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="pt-4">
            <ReviewsSection isDark={isDark} />
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="pt-4">
            <BlogSection isDark={isDark} />
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="pt-4">
            <FaqSection isDark={isDark} />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-4">
            <ContactSection isDark={isDark} />
          </div>
        )}

      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleStartCheckout}
        isDark={isDark}
      />

      {/* Payment Gateway Modal */}
      {isPaymentOpen && orderDraftForPayment && (
        <PaymentModal
          orderData={orderDraftForPayment}
          totalAmount={cartItems.reduce((s, i) => s + i.price * i.quantity, 0)}
          items={cartItems}
          onPaymentSuccess={(newOrd) => {
            handlePaymentSuccess(newOrd);
            setIsPaymentOpen(false);
            setActiveTab('tracking');
          }}
          onClose={() => setIsPaymentOpen(false)}
          isDark={isDark}
        />
      )}

      {/* Personalized Loyalty Dashboard */}
      <LoyaltyDashboard
        loyalty={loyalty}
        onClaimMilestone={handleClaimMilestone}
        onUpgradeVIP={handleUpgradeVIP}
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
        isDark={isDark}
      />

      {/* Admin Panel Modal */}
      {isAdminOpen && (
        <AdminPanel
          menuItems={menuItems}
          onMenuUpdated={refreshMenu}
          orders={orders}
          reservations={reservations}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onUpdateReservationStatus={handleUpdateReservationStatus}
          isDark={isDark}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {/* Floating AI Concierge Chatbot */}
      <AIChatbot
        onAutoReserve={(draft) => {
          setActiveTab('booking');
        }}
        isDark={isDark}
      />

      {/* Offline Mode Indicator & PWA Install Prompt */}
      <OfflineIndicator />

      {/* Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isDark={isDark}
      />

      {/* Mobile Sticky Quick-Action Bar */}
      <nav className="sm:hidden sticky bottom-0 inset-x-0 z-30 bg-slate-950/95 border-t border-slate-800 backdrop-blur-md px-3 py-2 flex items-center justify-around text-[10px] font-semibold text-slate-400">
        <button
          onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'menu' ? 'text-amber-400 font-bold' : ''}`}
        >
          <Utensils className="w-4 h-4" />
          <span>Menu</span>
        </button>

        <button
          onClick={() => { setActiveTab('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'booking' ? 'text-cyan-400 font-bold' : ''}`}
        >
          <Calendar className="w-4 h-4" />
          <span>Book Rig</span>
        </button>

        <button
          onClick={() => { setActiveTab('tracking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex flex-col items-center gap-1 ${activeTab === 'tracking' ? 'text-cyan-400 font-bold' : ''}`}
        >
          <Clock className="w-4 h-4" />
          <span>Track</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 text-slate-300"
        >
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>Tray</span>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 right-2 min-w-4 h-4 px-1 rounded-full bg-amber-500 text-slate-950 text-[9px] font-bold flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>
      </nav>

    </div>
  );
}
