import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, Instagram, Facebook, MessageSquare, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenLoyalty: () => void;
  onOpenAdmin: () => void;
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onNavClick,
  onOpenLoyalty,
  onOpenAdmin,
  isDark
}) => {
  return (
    <footer className="border-t border-slate-800 bg-[#070b13] text-slate-400 text-xs py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Logo size="md" showTagline={true} />
            <p className="text-slate-400 text-xs leading-relaxed">
              Kathmandu's premier gaming lounge & artisanal cafe. High-FPS gaming battlestations, authentic Himalayan Jhol Mo:Mo, and specialty Italian coffee.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-amber-400 transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/9779700287796"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-400 transition"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-display uppercase tracking-wider text-white">
              Explore Samprix
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavClick('menu')} className="hover:text-amber-400 transition">
                  Full Food & Drink Menu
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('booking')} className="hover:text-amber-400 transition">
                  Book Table & Battlestation
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('tracking')} className="hover:text-amber-400 transition">
                  Direct Live Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('gallery')} className="hover:text-amber-400 transition">
                  Atmosphere Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('reviews')} className="hover:text-amber-400 transition">
                  Customer Testimonials
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Stories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-display uppercase tracking-wider text-white">
              Community & Loyalty
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenLoyalty} className="text-amber-400 hover:underline">
                  Gamer Pass & XP Milestones
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('blog')} className="hover:text-cyan-400 transition">
                  Esports Stamina & Nutrition Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('faq')} className="hover:text-cyan-400 transition">
                  Booking FAQs & Rates
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="text-slate-500 hover:text-slate-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Management Console</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Times */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-display uppercase tracking-wider text-white">
              Basundhara Lounge
            </h4>
            <div className="space-y-1.5 text-slate-400">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Basundhara Chowki, near MN Hospital, Kathmandu</span>
              </p>
              <p className="flex items-center gap-1.5 pt-1">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>9700287796 / 9740685162</span>
              </p>
              <p className="pt-1 text-[11px] text-emerald-400 font-medium">
                Open 7 Days: 10:00 AM – 11:00 PM
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Samprix Cafe N Gaming Zone. All rights reserved. Good Food · Great Vibes · Play On!
          </div>
          <div className="flex items-center gap-4">
            <span>Kathmandu, Nepal</span>
            <span>·</span>
            <button onClick={() => onNavClick('faq')} className="hover:underline">Terms & Policies</button>
            <span>·</span>
            <span>256-bit Secure Gateway</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
