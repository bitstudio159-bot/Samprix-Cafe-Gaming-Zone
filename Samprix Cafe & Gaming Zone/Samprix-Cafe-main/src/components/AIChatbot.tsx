import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Calendar, Gamepad2, Coffee, Check } from 'lucide-react';
import { Reservation } from '../types';

interface AIChatbotProps {
  onAutoReserve?: (draft: Partial<Reservation>) => void;
  isDark: boolean;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  action?: {
    type: 'open_booking' | 'view_menu';
    label: string;
    data?: any;
  };
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ onAutoReserve, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-welcome',
      sender: 'bot',
      text: "Namaste! Welcome to Samprix Cafe N Gaming Zone. I'm your AI Concierge. You can ask me about our menu, prices, Basundhara Chowki location, gaming setups, or ask me to reserve a table/gaming station for you!",
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'What are your timings & location?',
    'What is your best pizza and momo?',
    'Book a PS5 battlestation for 2 people',
    'Do you have hookah lounge options?'
  ];

  const handleSend = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call backend /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.reply || "I'm delighted to assist! Come visit us at Basundhara Chowki.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: data.reservationRequest ? {
            type: 'open_booking',
            label: 'Confirm Table Reservation',
            data: data.reservationRequest
          } : undefined
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('Fallback response');
      }
    } catch {
      // Smart client-side fallback if backend not running or offline
      setTimeout(() => {
        let reply = "We are located at Basundhara Chowki, right near MN Hospital, Kathmandu. We are open every day from 10:00 AM to 11:00 PM! Our menu features artisan Pizzas (from Rs. 300), Himalayan Jhol Mo:Mo (Rs. 300), Burgers, and high-FPS gaming stations.";
        let action: any = undefined;

        const lower = userText.toLowerCase();
        if (lower.includes('book') || lower.includes('reserve') || lower.includes('table') || lower.includes('ps5') || lower.includes('pc')) {
          reply = "I can set up a reservation for you right away! We have 240Hz PC Battlestations, PlayStation 5 suites, and cozy cafe lounge tables.";
          action = {
            type: 'open_booking',
            label: 'Open Reservation Form'
          };
        } else if (lower.includes('timing') || lower.includes('time') || lower.includes('hour') || lower.includes('open')) {
          reply = "Samprix is open 7 days a week from 10:00 AM to 11:00 PM. Our kitchen serves hot pizzas, burgers, and momos until 10:30 PM!";
        } else if (lower.includes('location') || lower.includes('where') || lower.includes('address')) {
          reply = "We are located at Basundhara Chowki, MN Hospital, Ring Road, Kathmandu. You can call us directly at 9700287796 / 9740685162.";
        } else if (lower.includes('momo') || lower.includes('pizza') || lower.includes('burger') || lower.includes('menu')) {
          reply = "Our top picks: Chicken Jhol Mo:Mo (Rs. 300) with rich sesame timur broth, Special Skyscraper Burger (Rs. 450), and Chicken Feast Pizza (Rs. 300 Small / 450 Medium / 700 Large).";
          action = {
            type: 'view_menu',
            label: 'Explore Full Menu'
          };
        } else if (lower.includes('hookah') || lower.includes('shisha')) {
          reply = "We offer premium Double Apple, Mint, Strawberry, Blue Melon, and Mango Ice Hookah in both Normal (Rs. 350) and Cloud dense mist (Rs. 450).";
        }

        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action
        };
        setMessages((prev) => [...prev, botMsg]);
      }, 600);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-amber-400 text-slate-950 font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer group glow-cyan"
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-slate-950 animate-ping" />
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-22 right-4 sm:right-6 z-40 w-[92vw] sm:w-[400px] h-[520px] max-h-[80vh] rounded-3xl border shadow-2xl flex flex-col justify-between overflow-hidden animate-fade-in ${
          isDark ? 'bg-slate-900/95 border-slate-700 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
        } backdrop-blur-xl`}>
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-amber-400 flex items-center justify-center text-slate-950 shadow">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-display text-white flex items-center gap-1.5">
                  <span>Samprix AI Concierge</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h4>
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Online · Menu & Reservation Bot</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-medium rounded-br-none shadow-md'
                      : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}>
                    {m.text}
                  </div>

                  {/* Contextual Action Button */}
                  {m.action && (
                    <button
                      onClick={() => {
                        if (m.action?.type === 'open_booking') {
                          onAutoReserve?.(m.action.data || {});
                          setIsOpen(false);
                          const el = document.getElementById('booking');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        } else if (m.action?.type === 'view_menu') {
                          setIsOpen(false);
                          const el = document.getElementById('menu');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="mt-2 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] shadow flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{m.action.label}</span>
                    </button>
                  )}

                  <span className="text-[10px] text-slate-500 mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs p-2">
                <Bot className="w-4 h-4 animate-bounce text-cyan-400" />
                <span>Samprix Concierge is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Suggestions */}
          <div className="px-3 py-2 border-t border-slate-800/60 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 hover:text-white hover:border-amber-500/40 whitespace-nowrap shrink-0 transition"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputMessage);
            }}
            className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about momos, timings, booking..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="p-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 disabled:opacity-40 hover:brightness-110 transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
