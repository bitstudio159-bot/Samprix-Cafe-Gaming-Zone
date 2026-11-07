import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-[13px]'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Vector Emblem matching Samprix Logo */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Outer glowing shield ring */}
          <circle cx="60" cy="60" r="54" fill="#090d16" stroke="url(#ringGrad)" strokeWidth="4" />
          <path d="M22 64 C22 88, 40 108, 60 108 C80 108, 98 88, 98 64" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 3" opacity="0.8" />

          {/* Steaming Coffee Cup (Left Center) */}
          <ellipse cx="44" cy="68" rx="20" ry="6" fill="#0284c7" opacity="0.4" />
          <ellipse cx="44" cy="66" rx="16" ry="4" fill="#082f49" stroke="#06b6d4" strokeWidth="1.5" />
          {/* Cup Body */}
          <path d="M30 52 C30 68, 36 72, 44 72 C52 72, 58 68, 58 52 Z" fill="#0f172a" stroke="#e2e8f0" strokeWidth="2" />
          {/* Coffee surface */}
          <ellipse cx="44" cy="52" rx="14" ry="4" fill="#451a03" />
          {/* Cup Handle */}
          <path d="M57 54 C63 54, 65 62, 56 64" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
          {/* Rising Aroma Steam / Flame */}
          <path d="M41 47 C39 41, 46 37, 43 31 C47 34, 49 40, 47 47 Z" fill="url(#flameGrad)" />
          <path d="M47 45 C46 39, 52 35, 49 30 C53 33, 54 39, 52 45 Z" fill="url(#flameGrad)" opacity="0.85" />

          {/* Game Controller (Right Center) */}
          <g transform="translate(48, 34) scale(0.68)">
            {/* Controller Body */}
            <path d="M12 28 C16 14, 48 14, 52 28 C56 42, 60 52, 48 54 C40 55, 36 44, 32 44 C28 44, 24 55, 16 54 C4 52, 8 42, 12 28 Z" fill="#f8fafc" stroke="#0284c7" strokeWidth="2.5" />
            {/* D-Pad */}
            <path d="M20 28 h6 v6 h-6 z M17 31 h12 M23 25 v12" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
            {/* Action Buttons */}
            <circle cx="44" cy="27" r="1.8" fill="#ef4444" />
            <circle cx="48" cy="31" r="1.8" fill="#3b82f6" />
            <circle cx="40" cy="31" r="1.8" fill="#22c55e" />
            <circle cx="44" cy="35" r="1.8" fill="#eab308" />
            {/* Thumbsticks */}
            <circle cx="26" cy="40" r="3.5" fill="#334155" stroke="#64748b" strokeWidth="1" />
            <circle cx="38" cy="40" r="3.5" fill="#334155" stroke="#64748b" strokeWidth="1" />
            {/* Golden Crown */}
            <path d="M46 12 L49 19 L54 14 L59 19 L62 12 L60 22 L48 22 Z" fill="url(#crownGrad)" stroke="#b45309" strokeWidth="0.8" />
          </g>
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline gap-1.5">
          <span className={`font-extrabold tracking-tight font-display bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent ${textSizes[size]}`}>
            Samprix
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>
        <span className={`font-semibold tracking-wider uppercase text-amber-400 font-display ${subSizes[size]}`}>
          Cafe N Gaming Zone
        </span>
        {showTagline && (
          <span className="text-[10px] text-slate-400 tracking-wide mt-0.5">
            Good Food · Great Vibes · Play On!
          </span>
        )}
      </div>
    </div>
  );
};
