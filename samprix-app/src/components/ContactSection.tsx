import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Check, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  isDark: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isDark }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSent(true);

    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 2500);
  };

  return (
    <section id="contact" className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Visit Us in Basundhara
          </h2>
          <p className="text-sm text-slate-400">
            Located right near MN Hospital, Basundhara Chowki. Drop in for artisanal food, casual matches, or call for group bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact & Location Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Lounge Address</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Basundhara Chowki, near MN Hospital, Ring Road, Kathmandu, Nepal
                  </p>
                  <a
                    href="https://maps.google.com/?q=Basundhara+Chowki+Kathmandu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:underline mt-2"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Phone & WhatsApp</h4>
                  <div className="text-xs text-slate-300 mt-1 space-y-1 font-mono">
                    <div>
                      <a href="tel:9700287796" className="hover:text-amber-400">9700287796</a>
                    </div>
                    <div>
                      <a href="tel:9740685162" className="hover:text-amber-400">9740685162</a>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/9779700287796?text=Hello%20Samprix%20Cafe!%20I%20have%20an%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-600/30"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Operating Hours</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Monday – Sunday: <strong className="text-white">10:00 AM – 11:00 PM</strong>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Open during all public holidays. Kitchen closes at 10:30 PM.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="mb-6">
                <h3 className="text-xl font-bold font-display text-white">Send Us a Direct Message</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Have a question regarding corporate events, esports tournament hosting, or dietary requests?
                </p>
              </div>

              {sent ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-display text-white">Message Dispatched!</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Thank you, {name}. Our manager will reply to {phone} within 30 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Roshan Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Phone (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9841234567"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. roshan@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Message / Event Inquiry *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you'd like to arrange (e.g. 10-person birthday LAN tournament, special dietary request)..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Samprix Team</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
