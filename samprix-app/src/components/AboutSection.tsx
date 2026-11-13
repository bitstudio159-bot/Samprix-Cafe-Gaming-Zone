import React from 'react';
import { Coffee, Gamepad2, Users, Award, Shield, Wifi, Sparkles, MapPin } from 'lucide-react';

interface AboutSectionProps {
  isDark: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isDark }) => {
  return (
    <section id="about" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-500">
            Good Food · Great Vibes · Play On!
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            The Story of Samprix
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Born from a passion for specialty coffee, artisan street food, and competitive gaming. Located in the heart of Basundhara Chowki, Kathmandu.
          </p>
        </div>

        {/* 2-Column Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 text-left">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Where Kathmandu’s Foodies & Gamers Converge
            </h3>
            
            <p className="text-slate-300 leading-relaxed">
              We realized that Kathmandu lacked a sanctuary where friends could experience the luxury of a specialty Italian espresso bar alongside a serious, zero-compromise esports battlestation.
            </p>

            <p className="text-slate-400 leading-relaxed">
              At <strong className="text-amber-400">Samprix Cafe N Gaming Zone</strong>, you never have to settle for stale snacks while gaming. We slow-simmer our Himalayan Jhol Mo:Mo broth for 4 hours with wild Mustang timur, stone-bake our artisan pizzas with bubbly buffalo mozzarella, and pull velvety espresso shots from single-origin beans.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <Wifi className="w-5 h-5 text-cyan-400 mb-2" />
                <h4 className="text-sm font-bold text-white">Dedicated Leased Line</h4>
                <p className="text-xs text-slate-400 mt-1">Sub-10ms ping to South Asian esports game servers.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <Coffee className="w-5 h-5 text-amber-400 mb-2" />
                <h4 className="text-sm font-bold text-white">Barista Craftsmanship</h4>
                <p className="text-xs text-slate-400 mt-1">Freshly roasted beans & handcrafted latte art.</p>
              </div>
            </div>
          </div>

          {/* Visual Grid */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="/src/assets/images/cafe_gaming_hero_1792049416356.jpg"
                alt="Samprix cafe and esports lounge"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-slate-900/95 border border-amber-500/40 p-5 rounded-2xl shadow-xl max-w-xs backdrop-blur-md">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                <MapPin className="w-4 h-4" />
                <span>Prime Location</span>
              </div>
              <p className="text-xs text-slate-300">
                Basundhara Chowki, right near MN Hospital. Free parking for bikes and cars!
              </p>
            </div>
          </div>
        </div>

        {/* Lounge Standards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <Gamepad2 className="w-8 h-8 text-cyan-400 mb-3" />
            <h4 className="text-base font-bold text-white font-display">240Hz G-Sync Monitors</h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Ultra-high refresh rate displays with NVIDIA RTX 4070 rigs for esports titles.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <Users className="w-8 h-8 text-amber-400 mb-3" />
            <h4 className="text-base font-bold text-white font-display">PS5 Luxury Suites</h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Private comfortable couch setups with 4K OLED screens for FIFA, Tekken & split-screen.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <Award className="w-8 h-8 text-emerald-400 mb-3" />
            <h4 className="text-base font-bold text-white font-display">100% Halal & Fresh</h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Finest local poultry and farm-fresh produce with strict hygienic kitchen standards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <Sparkles className="w-8 h-8 text-purple-400 mb-3" />
            <h4 className="text-base font-bold text-white font-display">Hookah Cloud Lounge</h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Open-air terrace serving imported herbal shisha blends and chill beats.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
