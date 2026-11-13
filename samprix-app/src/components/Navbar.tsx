import React, { useState } from 'react';
import { Logo } from './Logo';
import { ShoppingBag, Sun, Moon, ShieldCheck, MapPin, Phone, Menu as MenuIcon, X, Award, Search } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  isAdmin: boolean;
  toggleAdmin: () => void;
  openLoyalty: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  isDark,
  toggleTheme,
  isAdmin,
  toggleAdmin,
  openLoyalty
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'booking', label: 'Booking' },
    { id: 'tracking', label: 'Order Tracking' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-[12px] text-slate-300 py-1.5 px-4 z-40 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              Basundhara Chowki, MN Hospital, Kathmandu
            </span>
            <span className="hidden sm:inline text-slate-500">·</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              9700287796 / 9740685162
            </span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-emerald-400 font-medium">
              Open Daily 10:00 AM – 11:00 PM
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={openLoyalty}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer text-xs font-medium"
              title="Gamer XP & Coffee Bean Rewards"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Gamer Pass (Lvl 3)</span>
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={toggleAdmin}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                isAdmin 
                  ? 'bg-amber-500 text-slate-950 font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>{isAdmin ? 'Exit Admin' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Navigation conforming strictly to Top Bar Contract */}
      <header className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
        isDark 
          ? 'bg-[#090d16]/95 border-slate-800/80 text-white' 
          : 'bg-white/95 border-slate-200 text-slate-900'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single Brand Wordmark lockup */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left cursor-pointer focus:outline-none"
          >
            <Logo size="md" />
          </button>

          {/* Zone 2: 4-5 concise, single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? isDark ? 'text-amber-400 font-semibold' : 'text-amber-600 font-semibold'
                      : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Theme, Cart with badge, Primary CTA) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isDark 
                  ? 'border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-amber-400' 
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
              aria-label="Toggle theme mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className={`relative p-2.5 rounded-lg border transition-all cursor-pointer ${
                isDark 
                  ? 'border-slate-800 bg-slate-900/60 text-slate-200 hover:border-cyan-500/50' 
                  : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-amber-500/50'
              }`}
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-full flex items-center justify-center shadow-md animate-scale">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('booking')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-105 active:scale-98 transition shadow-[0_0_15px_-3px_rgba(245,158,11,0.4)] cursor-pointer whitespace-nowrap"
            >
              Book Table & Battlestation
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden fixed inset-x-0 top-[110px] bottom-0 z-50 ${
          isDark ? 'bg-slate-950/98 text-white' : 'bg-white/98 text-slate-900'
        } backdrop-blur-xl border-t border-slate-800 p-6 flex flex-col justify-between overflow-y-auto animate-fade-in`}>
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Navigation
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left py-3 px-4 rounded-xl text-lg font-medium transition ${
                  activeTab === link.id
                    ? 'bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => handleNavClick('reviews')}
              className="block w-full text-left py-3 px-4 rounded-xl text-lg font-medium text-slate-300 hover:bg-slate-900"
            >
              Customer Reviews
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="block w-full text-left py-3 px-4 rounded-xl text-lg font-medium text-slate-300 hover:bg-slate-900"
            >
              Cafe & Esports Blog
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="block w-full text-left py-3 px-4 rounded-xl text-lg font-medium text-slate-300 hover:bg-slate-900"
            >
              Frequently Asked Questions
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="block w-full text-left py-3 px-4 rounded-xl text-lg font-medium text-slate-300 hover:bg-slate-900"
            >
              Contact & Location
            </button>
          </div>

          <div className="pt-6 border-t border-slate-800 space-y-3">
            <button
              onClick={() => {
                handleNavClick('booking');
              }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold rounded-xl text-center shadow-lg"
            >
              Book Table & Gaming Rig
            </button>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>Basundhara Chowki, MN Hospital</span>
              <a href="tel:9700287796" className="text-cyan-400 font-semibold underline">Call Now</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
