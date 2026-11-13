import React, { useState, useMemo } from 'react';
import { MenuItem, CategoryId, CartItem } from '../types';
import { CATEGORIES } from '../data/menuData';
import { Search, Plus, Star, Clock, Flame, Leaf, Check, ShoppingBag, Eye, X } from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, size?: string, notes?: string, customPrice?: number) => void;
  isDark: boolean;
  items: MenuItem[];
  menuError?: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, isDark, items, menuError }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [spicyOnly, setSpicyOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);

  // Modal for size selection / customized ordering
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [chosenSize, setChosenSize] = useState<string>('Regular');
  const [specialNotes, setSpecialNotes] = useState('');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // Filtered menu
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.categoryName.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      // Dietary filters
      if (vegetarianOnly && !item.isVegetarian) return false;
      if (spicyOnly && !item.isSpicy) return false;
      if (popularOnly && !item.isPopular) return false;

      return true;
    });
  }, [items, selectedCategory, searchQuery, vegetarianOnly, spicyOnly, popularOnly]);

  const handleOpenItemModal = (item: MenuItem) => {
    setSelectedItemForModal(item);
    setSpecialNotes('');
    if (item.sizePrices) {
      if (item.category === 'pizza') {
        setChosenSize('Small');
      } else if (item.category === 'hookah') {
        setChosenSize('Normal');
      } else {
        setChosenSize('Regular');
      }
    } else {
      setChosenSize('Regular');
    }
  };

  const getComputedPrice = (item: MenuItem, size: string): number => {
    if (!item.sizePrices) return item.price;
    if (size === 'Small' && item.sizePrices.small) return item.sizePrices.small;
    if (size === 'Medium' && item.sizePrices.medium) return item.sizePrices.medium;
    if (size === 'Large' && item.sizePrices.large) return item.sizePrices.large;
    if (size === 'Combo Small' && item.sizePrices.comboSmall) return item.sizePrices.comboSmall;
    if (size === 'Combo Medium' && item.sizePrices.comboMedium) return item.sizePrices.comboMedium;
    if (size === 'Combo Large' && item.sizePrices.comboLarge) return item.sizePrices.comboLarge;
    if (size === 'Normal' && item.sizePrices.normal) return item.sizePrices.normal;
    if (size === 'Cloud' && item.sizePrices.cloud) return item.sizePrices.cloud;
    return item.price;
  };

  const handleConfirmAddToCart = () => {
    if (!selectedItemForModal) return;
    const finalPrice = getComputedPrice(selectedItemForModal, chosenSize);
    onAddToCart(selectedItemForModal, chosenSize, specialNotes, finalPrice);

    setAddedAnimationId(selectedItemForModal.id);
    setTimeout(() => setAddedAnimationId(null), 1500);
    setSelectedItemForModal(null);
  };

  const handleQuickAdd = (item: MenuItem) => {
    if (item.sizePrices) {
      handleOpenItemModal(item);
    } else {
      onAddToCart(item, 'Regular', '', item.price);
      setAddedAnimationId(item.id);
      setTimeout(() => setAddedAnimationId(null), 1500);
    }
  };

  return (
    <section id="menu" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {menuError && <p role="status" className="mb-4 text-center text-amber-300 text-sm">{menuError}</p>}
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-500">
            Handcrafted From Fresh Ingredients
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Our Authentic Menu
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Explore authentic Nepali Himalayan Mo:Mo, artisan stone-baked pizzas, gourmet smash burgers, barista espresso drinks, and gamer combo boxes.
          </p>
        </div>

        {/* Search & Dietary Preference Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search burgers, pizzas, jhol momo, coffee..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border transition focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-800 text-white placeholder-slate-500' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Dietary Filters (Interactive Segmented Controls) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setVegetarianOnly(!vegetarianOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer whitespace-nowrap ${
                vegetarianOnly
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Veg Only</span>
            </button>

            <button
              onClick={() => setSpicyOnly(!spicyOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer whitespace-nowrap ${
                spicyOnly
                  ? 'bg-red-500/20 text-red-400 border-red-500/50'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Spicy Dishes</span>
            </button>

            <button
              onClick={() => setPopularOnly(!popularOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer whitespace-nowrap ${
                popularOnly
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Chef's Popular</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Bar (Horizontal Scrollable Tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryId)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : isDark
                      ? 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid: 3-column desktop / 2-column tablet */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
            <p className="text-slate-400 text-base mb-3">No menu items found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setVegetarianOnly(false);
                setSpicyOnly(false);
                setPopularOnly(false);
              }}
              className="text-xs font-bold text-amber-400 underline uppercase"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isJustAdded = addedAnimationId === item.id;
              return (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                    isDark 
                      ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/40 hover:shadow-xl' 
                      : 'bg-white border-slate-200 hover:border-amber-500/50 hover:shadow-lg'
                  }`}
                >
                  {/* Item Image / Fallback Container */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-4 text-center">
                        <span className="text-3xl mb-2">
                          {item.category === 'momo' ? '🥟' : 
                           item.category === 'coffee' ? '☕' : 
                           item.category === 'pizza' ? '🍕' : 
                           item.category === 'shakes' ? '🥤' : 
                           item.category === 'burgers' ? '🍔' : 
                           item.category === 'hookah' ? '💨' : '🍽️'}
                        </span>
                        <span className="text-xs font-semibold text-slate-300">{item.categoryName}</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                    {/* Metadata tags */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {item.isPopular && (
                        <span className="bg-amber-500/90 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          Popular
                        </span>
                      )}
                      {item.isVegetarian && (
                        <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          Veg
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          Spicy
                        </span>
                      )}
                    </div>

                    {/* Preparation Time & Rating Indicator */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-slate-200 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-md border border-slate-700/50">
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {item.rating}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {item.preparationTimeMinutes}m
                      </span>
                    </div>
                  </div>

                  {/* Item Content Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h3>
                        <div className="text-right shrink-0">
                          <span className="text-base font-bold font-mono text-amber-400 tabular-nums">
                            Rs. {item.price}/-
                          </span>
                          {item.sizePrices && (
                            <div className="text-[10px] text-slate-400">Multiple sizes</div>
                          )}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                      <span className="text-[11px] text-slate-500">
                        {item.reviewCount} customer reviews
                      </span>

                      <div className="flex items-center gap-2">
                        {item.sizePrices ? (
                          <button
                            onClick={() => handleOpenItemModal(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Select Size</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleQuickAdd(item)}
                            className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold transition active:scale-95 cursor-pointer ${
                              isJustAdded
                                ? 'bg-emerald-500 text-white'
                                : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added!</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add to Cart</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Customization & Size Modal */}
        {selectedItemForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl relative ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
                  {selectedItemForModal.categoryName}
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-1">
                  {selectedItemForModal.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedItemForModal.description}
                </p>
              </div>

              {/* Size Selector for Pizzas & Combos */}
              {selectedItemForModal.sizePrices && (
                <div className="mb-5 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Choose Portion & Style:
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedItemForModal.category === 'pizza' && (
                      <>
                        <button
                          onClick={() => setChosenSize('Small')}
                          className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition ${
                            chosenSize === 'Small'
                              ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-bold'
                              : 'border-slate-800 bg-slate-950/40 text-slate-300'
                          }`}
                        >
                          <span>Small (Personal 8")</span>
                          <span className="font-mono tabular-nums font-bold">Rs. {selectedItemForModal.sizePrices.small}/-</span>
                        </button>

                        <button
                          onClick={() => setChosenSize('Medium')}
                          className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition ${
                            chosenSize === 'Medium'
                              ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-bold'
                              : 'border-slate-800 bg-slate-950/40 text-slate-300'
                          }`}
                        >
                          <span>Medium (Sharing 10")</span>
                          <span className="font-mono tabular-nums font-bold">Rs. {selectedItemForModal.sizePrices.medium}/-</span>
                        </button>

                        <button
                          onClick={() => setChosenSize('Large')}
                          className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition ${
                            chosenSize === 'Large'
                              ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-bold'
                              : 'border-slate-800 bg-slate-950/40 text-slate-300'
                          }`}
                        >
                          <span>Large (Family 12")</span>
                          <span className="font-mono tabular-nums font-bold">Rs. {selectedItemForModal.sizePrices.large}/-</span>
                        </button>

                        {/* Special Any Pizza with Chips & Drink Combo */}
                        <button
                          onClick={() => setChosenSize('Combo Small')}
                          className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition ${
                            chosenSize === 'Combo Small'
                              ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300 font-bold'
                              : 'border-slate-800 bg-slate-950/40 text-slate-300'
                          }`}
                        >
                          <span>Pizza Combo + Chips & Drink (Small)</span>
                          <span className="font-mono tabular-nums font-bold">Rs. {selectedItemForModal.sizePrices.comboSmall}/-</span>
                        </button>

                        <button
                          onClick={() => setChosenSize('Combo Medium')}
                          className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition ${
                            chosenSize === 'Combo Medium'
                              ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300 font-bold'
                              : 'border-slate-800 bg-slate-950/40 text-slate-300'
                          }`}
                        >
                          <span>Pizza Combo + Chips & Drink (Medium)</span>
                          <span className="font-mono tabular-nums font-bold">Rs. {selectedItemForModal.sizePrices.comboMedium}/-</span>
                        </button>
                      </>
                    )}

                    {selectedItemForModal.category === 'hookah' && (
                      <>
                        <button
                          onClick={() => setChosenSize('Normal')}
                          className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition ${
                            chosenSize === 'Normal'
                              ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-bold'
                              : 'border-slate-800 bg-slate-950/40 text-slate-300'
                          }`}
                        >
                          <span>Normal Bowl</span>
                          <span className="font-mono tabular-nums font-bold">Rs. {selectedItemForModal.sizePrices.normal}/-</span>
                        </button>
                        <button
                          onClick={() => setChosenSize('Cloud')}
                          className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition ${
                            chosenSize === 'Cloud'
                              ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300 font-bold'
                              : 'border-slate-800 bg-slate-950/40 text-slate-300'
                          }`}
                        >
                          <span>Cloud Special Extra Dense</span>
                          <span className="font-mono tabular-nums font-bold">Rs. {selectedItemForModal.sizePrices.cloud}/-</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Special Instructions Input */}
              <div className="mb-6 space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Kitchen Instructions (Optional):
                </label>
                <input
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Less chili, crispy crust, extra jhol soup"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Modal Confirmation Button */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div>
                  <div className="text-[11px] text-slate-400">Total Selection</div>
                  <div className="text-lg font-bold font-mono text-amber-400">
                    Rs. {getComputedPrice(selectedItemForModal, chosenSize)}/-
                  </div>
                </div>

                <button
                  onClick={handleConfirmAddToCart}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm rounded-xl hover:brightness-110 active:scale-98 transition shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
