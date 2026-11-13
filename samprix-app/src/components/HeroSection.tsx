import React from 'react';
import { Gamepad2, Coffee, Clock, ArrowRight, ShieldCheck, Flame, ChevronRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onBookSession: () => void;
  onTrackOrder: () => void;
  isDark: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onBookSession,
  onTrackOrder,
  isDark
}) => {
  return (
    <section className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Split: Visual Balance and Zero-Pill Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Value Props, Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Quiet 1-line metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider">
              <span>Basundhara Chowki, MN Hospital</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>10:00 AM – 11:00 PM</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-cyan-400">Next-Gen Gaming & Cafe</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-balance leading-[1.08]">
              Artisanal Flavors. <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                High-FPS Gaming.
              </span> <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                One Epic Lounge.
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Welcome to <span className="font-semibold text-white">Samprix Cafe N Gaming Zone</span>. Indulge in wood-fired pizzas, authentic Himalayan Jhol Mo:Mo, and hand-pulled espresso while competing on tournament-grade 240Hz PC battlestations and PlayStation 5 consoles.
            </p>

            {/* Interactive Primary & Secondary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 active:scale-98 transition shadow-[0_0_25px_-5px_rgba(245,158,11,0.5)] cursor-pointer"
              >
                <Coffee className="w-4 h-4" />
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBookSession}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border transition active:scale-98 cursor-pointer ${
                  isDark
                    ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-400'
                    : 'border-cyan-600/30 bg-cyan-50 text-cyan-800 hover:bg-cyan-100'
                }`}
              >
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
                <span>Book Gaming Rig / Table</span>
              </button>

              <button
                onClick={onTrackOrder}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg transition ${
                  isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <span>Track Active Order</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Trust and Social Proof Strip */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl font-bold font-display text-white tabular-nums">4.9 ★</div>
                <div className="text-xs text-slate-400">Over 600+ Food & Gaming Reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-display text-cyan-400 tabular-nums">240Hz</div>
                <div className="text-xs text-slate-400">NVIDIA Esports Battlestations & PS5</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-display text-amber-400 tabular-nums">15 Mins</div>
                <div className="text-xs text-slate-400">Average Hot Kitchen Prep Time</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset Showcase with Fallback Scrim */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              
              {/* Main Atmosphere Image */}
              <img
                src="/src/assets/images/cafe_gaming_hero_1792049416356.jpg"
                alt="Samprix Cafe interior with barista bar and neon esports gaming zone"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Floating Highlight Cards */}
              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-3 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">VIP Esports Zone</div>
                  <div className="text-[11px] text-cyan-400">PS5 & RTX 4070 Battlestations</div>
                </div>
              </div>

              <div className="absolute bottom-4 inset-x-4 bg-slate-950/90 backdrop-blur-md border border-amber-500/30 rounded-xl p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Chef's Signature Himalayan Mo:Mo</div>
                      <div className="text-xs text-slate-300">Fresh Sesame & Timur Jhol Broth · Rs. 300/-</div>
                    </div>
                  </div>
                  <button
                    onClick={onExploreMenu}
                    className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition"
                  >
                    Order Now
                  </button>
                </div>
              </div>

            </div>

            {/* Glowing Accent Ambient Halo */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/15 via-amber-500/15 to-purple-500/10 rounded-3xl blur-2xl -z-10 pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
};
