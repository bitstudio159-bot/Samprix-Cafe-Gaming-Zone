import React, { useState } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles, X } from 'lucide-react';

interface GallerySectionProps {
  isDark: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ isDark }) => {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 'g-1',
      title: 'Esports Rigs & Tournament Battlestations',
      category: 'Gaming Lounge',
      image: '/src/assets/images/gaming_zone_setup_1792049418085.jpg',
      likes: 342,
      comments: 48,
      aspect: 'col-span-1 md:col-span-2 row-span-1'
    },
    {
      id: 'g-2',
      title: 'Himalayan Chicken & Buff Jhol Mo:Mo',
      category: 'Kitchen Specials',
      image: '/src/assets/images/steam_dumplings_momo_1792049416222.jpg',
      likes: 512,
      comments: 64,
      aspect: 'col-span-1 row-span-1'
    },
    {
      id: 'g-3',
      title: 'Stone-Baked Pizza & Smash Burger',
      category: 'Artisan Eats',
      image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg',
      likes: 428,
      comments: 39,
      aspect: 'col-span-1 row-span-1'
    },
    {
      id: 'g-4',
      title: 'Hand-Poured Velvet Latte Art',
      category: 'Espresso Bar',
      image: '/src/assets/images/barista_espresso_pour_1792049417660.jpg',
      likes: 295,
      comments: 26,
      aspect: 'col-span-1 row-span-1'
    },
    {
      id: 'g-5',
      title: 'Warm Vibes & Esports Neon Arena',
      category: 'Cafe Ambiance',
      image: '/src/assets/images/cafe_gaming_hero_1792049416356.jpg',
      likes: 670,
      comments: 89,
      aspect: 'col-span-1 md:col-span-2 row-span-1'
    }
  ];

  return (
    <section id="gallery" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Community & Atmosphere
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Samprix Lounge & Bites Gallery
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Glimpses into our tournament nights, artisanal culinary creations, and vibrant Kathmandu youth community.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold text-xs shadow-lg hover:brightness-110 transition shrink-0"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @samprix_cafenight</span>
          </a>
        </div>

        {/* Bento Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item.image)}
              className={`group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer ${item.aspect} shadow-xl`}
            >
              <div className="h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent transition-opacity duration-300" />

              {/* Information Pill */}
              <div className="absolute bottom-4 inset-x-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    {item.category}
                  </span>
                  <h4 className="text-base font-bold text-white font-display mt-0.5 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-700/50">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    {item.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
                    {item.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {activePhoto && (
          <div
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          >
            <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-800 transition z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={activePhoto}
                alt="Enlarged view"
                className="w-full h-auto max-h-[85vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
