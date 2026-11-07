import React, { useState } from 'react';
import { UserReview } from '../types';
import { REVIEWS } from '../data/sampleData';
import { Star, ShieldCheck, MessageSquarePlus, Check, X, ThumbsUp } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReviewsSectionProps {
  isDark: boolean;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ isDark }) => {
  const [reviewsList, setReviewsList] = useState<UserReview[]>(REVIEWS);
  const [showAddReview, setShowAddReview] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [itemRecommended, setItemRecommended] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newRev: UserReview = {
      id: `rev-${Date.now()}`,
      name,
      rating,
      date: 'Just now',
      comment,
      itemRecommended: itemRecommended || 'Chicken Jhol Mo:Mo',
      verifiedVisit: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setSubmitted(false);
      setShowAddReview(false);
      setName('');
      setComment('');
      setItemRecommended('');
    }, 1800);
  };

  return (
    <section id="reviews" className="py-12 sm:py-20 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Verified Customer Trust
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              What Gamers & Foodies Say
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Authentic experiences shared by our community members at Basundhara Chowki.
            </p>
          </div>

          <button
            onClick={() => setShowAddReview(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-98 transition shrink-0 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
              } shadow-lg hover:border-slate-700 transition`}
            >
              <div className="space-y-3">
                {/* Stars and verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>

                  {rev.verifiedVisit && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Visit
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <div className="font-bold text-sm text-white font-display">{rev.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Loves: <strong className="text-amber-400 font-normal">{rev.itemRecommended}</strong>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">{rev.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        {showAddReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
            <div className={`w-full max-w-md rounded-3xl border p-6 sm:p-8 shadow-2xl relative ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              
              <button
                onClick={() => setShowAddReview(false)}
                className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-white">Review Submitted!</h4>
                  <p className="text-xs text-slate-400">Thank you for supporting Samprix Cafe N Gaming Zone.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">Share Your Experience</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Tell other foodies and gamers how was your visit.</p>
                  </div>

                  {/* Rating Selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Your Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-110 transition"
                        >
                          <Star className={`w-6 h-6 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Subash KC"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Favorite Dish / Station</label>
                    <input
                      type="text"
                      value={itemRecommended}
                      onChange={(e) => setItemRecommended(e.target.value)}
                      placeholder="e.g. Special Skyscraper Burger & PS5 Rig"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Your Review *</label>
                    <textarea
                      required
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts about food taste, gaming gear, hospitality..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 transition"
                  >
                    Post Community Review
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
