import React, { useState } from 'react';
import { UserLoyalty } from '../types';
import { Award, Coffee, Gamepad2, Trophy, Star, CheckCircle, Gift, Sparkles, X, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoyaltyDashboardProps {
  loyalty: UserLoyalty;
  onClaimMilestone: (milestoneId: string, xpReward: number) => void;
  onUpgradeVIP: () => void;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const LoyaltyDashboard: React.FC<LoyaltyDashboardProps> = ({
  loyalty,
  onClaimMilestone,
  onUpgradeVIP,
  isOpen,
  onClose,
  isDark
}) => {
  if (!isOpen) return null;

  const nextLevelXp = loyalty.level * 250;
  const progressPercent = Math.min(100, Math.round((loyalty.xp / nextLevelXp) * 100));

  const handleClaim = (id: string, xp: number) => {
    onClaimMilestone(id, xp);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 shadow-2xl relative ${
        isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Samprix Gamer & Foodie Pass
            </div>
            <h3 className="text-2xl font-bold font-display">
              Personalized Milestone Tracker
            </h3>
          </div>
        </div>

        {/* Tier & XP Summary Hero Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 shadow-xl mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Current Member Tier
              </span>
              <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-display flex items-center gap-2">
                <span>{loyalty.tier}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
                  Lvl {loyalty.level}
                </span>
              </div>
            </div>

            <button
              onClick={onUpgradeVIP}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:brightness-110 text-slate-950 font-bold text-xs shadow transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upgrade to VIP Pass</span>
            </button>
          </div>

          {/* Level XP Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>XP Progress to Level {loyalty.level + 1}</span>
              <span className="font-mono font-bold text-cyan-400">{loyalty.xp} / {nextLevelXp} XP</span>
            </div>
            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Stat Badges Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Coffee className="w-3.5 h-3.5 text-amber-400" />
                <span>Coffee Beans</span>
              </div>
              <div className="text-lg font-bold font-mono text-white mt-0.5">
                {loyalty.coffeeBeansEarned} Beans
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Gaming Logged</span>
              </div>
              <div className="text-lg font-bold font-mono text-white mt-0.5">
                {loyalty.gamingHoursLogged} hrs
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                <span>Milestones Won</span>
              </div>
              <div className="text-lg font-bold font-mono text-white mt-0.5">
                {loyalty.milestones.filter(m => m.completed).length} / {loyalty.milestones.length}
              </div>
            </div>
          </div>
        </div>

        {/* Milestones Checklist */}
        <div className="space-y-4 mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Individual Quests & Milestones
          </div>

          <div className="space-y-2.5">
            {loyalty.milestones.map((m) => (
              <div
                key={m.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                  m.completed
                    ? 'border-emerald-500/30 bg-emerald-950/20 text-slate-200'
                    : 'border-slate-800 bg-slate-950/50 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    m.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {m.completed ? <CheckCircle className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white font-display">
                      {m.title}
                    </div>
                    <div className="text-[11px] text-slate-400">{m.description}</div>
                  </div>
                </div>

                <div className="shrink-0">
                  {m.completed ? (
                    <span className="text-[11px] font-mono font-bold text-emerald-400">
                      +{m.xpReward} XP Claimed
                    </span>
                  ) : (
                    <button
                      onClick={() => handleClaim(m.id, m.xpReward)}
                      className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition"
                    >
                      Complete (+{m.xpReward} XP)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unlocked Lounge Perks */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5" />
            <span>Active VIP Lounge Perks</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-1.5 pl-1">
            {loyalty.unlockedPerks.map((perk, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};
