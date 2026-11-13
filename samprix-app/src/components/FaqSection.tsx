import React, { useState } from 'react';
import { FAQS } from '../data/sampleData';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  isDark: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ isDark }) => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-12 sm:py-20 bg-slate-950/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-500">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400">
            Everything you need to know about dining, table reservations, PS5 rates, and Basundhara Chowki directions.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-amber-500/40 bg-slate-900/90 shadow-lg'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white font-display">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
