import React, { useState } from 'react';
import { Reservation, ReservationZone } from '../types';
import { Gamepad2, Calendar, Clock, Users, Coffee, CheckCircle, Share2, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingSectionProps {
  onReservationCreated: (reservation: Reservation) => void;
  isDark: boolean;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ onReservationCreated, isDark }) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('18:00');
  const [guests, setGuests] = useState(2);
  const [zone, setZone] = useState<ReservationZone>('esports_arena');
  const [gamingHours, setGamingHours] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const zones: { id: ReservationZone; title: string; subtitle: string; icon: any; popular?: boolean }[] = [
    {
      id: 'esports_arena',
      title: 'Esports Battlestation',
      subtitle: '240Hz Gaming Monitor, RTX 4070, Mechanical Gear',
      icon: Gamepad2,
      popular: true
    },
    {
      id: 'ps5_battlestation',
      title: 'PlayStation 5 Suite',
      subtitle: '4K OLED Display, DualSense Wireless, FIFA/Tekken',
      icon: Gamepad2
    },
    {
      id: 'vip_booth',
      title: 'VIP Lounge Booth',
      subtitle: 'Plush velvet booth, private audio, table service',
      icon: Sparkles
    },
    {
      id: 'cafe_lounge',
      title: 'Cafe Terrace & Dining',
      subtitle: 'Cozy wooden tables, natural light, espresso bar',
      icon: Coffee
    },
    {
      id: 'hookah_cloud_deck',
      title: 'Hookah Cloud Deck',
      subtitle: 'Open-air lounge with premium flavored shisha',
      icon: Sparkles
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    const resNumber = `SMP-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      reservationNumber: resNumber,
      customerName,
      phone,
      email: email || `${phone}@guest.samprix.com`,
      date,
      time,
      guests,
      zone,
      gamingHours: zone === 'esports_arena' || zone === 'ps5_battlestation' ? gamingHours : undefined,
      specialRequests,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    onReservationCreated(newReservation);
    setConfirmedReservation(newReservation);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  const getWhatsAppShareUrl = (res: Reservation) => {
    const text = encodeURIComponent(
      `Hello Samprix Cafe N Gaming Zone! I have booked a session:\n` +
      `Booking ID: ${res.reservationNumber}\n` +
      `Name: ${res.customerName}\n` +
      `Date & Time: ${res.date} at ${res.time}\n` +
      `Party Size: ${res.guests} person(s)\n` +
      `Zone: ${res.zone.replace('_', ' ').toUpperCase()}\n` +
      (res.gamingHours ? `Gaming Duration: ${res.gamingHours} Hour(s)\n` : '') +
      `Looking forward to visiting Basundhara Chowki!`
    );
    return `https://wa.me/9779700287796?text=${text}`;
  };

  return (
    <section id="booking" className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Instant Confirmation & Zero Waiting Time
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Reserve Table or Gaming Rig
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Book your tournament battlestation, PS5 booth, or cozy cafe table at Basundhara Chowki. Instant WhatsApp confirmation sent automatically.
          </p>
        </div>

        {confirmedReservation ? (
          <div className={`rounded-3xl border p-8 sm:p-10 text-center space-y-6 ${
            isDark ? 'bg-slate-900/90 border-emerald-500/40 text-white' : 'bg-white border-emerald-500 text-slate-900'
          } shadow-2xl animate-fade-in`}>
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
                We're Getting Your Station Ready!
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Hi <span className="font-semibold text-white">{confirmedReservation.customerName}</span>, your reservation code is:
              </p>
              <div className="inline-block py-2 px-4 mt-2 rounded-xl bg-slate-950 border border-slate-700 font-mono text-xl font-bold text-amber-400 tracking-wider">
                {confirmedReservation.reservationNumber}
              </div>
            </div>

            {/* Summary Details Grid */}
            <div className="max-w-md mx-auto grid grid-cols-2 gap-4 text-left p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500">Date & Time</span>
                <p className="font-semibold text-slate-200">{confirmedReservation.date} · {confirmedReservation.time}</p>
              </div>
              <div>
                <span className="text-slate-500">Zone</span>
                <p className="font-semibold text-cyan-400 capitalize">{confirmedReservation.zone.replace('_', ' ')}</p>
              </div>
              <div>
                <span className="text-slate-500">Party Size</span>
                <p className="font-semibold text-slate-200">{confirmedReservation.guests} Guest(s)</p>
              </div>
              <div>
                <span className="text-slate-500">Contact Number</span>
                <p className="font-semibold text-slate-200">{confirmedReservation.phone}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={getWhatsAppShareUrl(confirmedReservation)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition"
              >
                <Share2 className="w-4 h-4" />
                <span>Notify via WhatsApp</span>
              </a>

              <button
                onClick={() => setConfirmedReservation(null)}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition"
              >
                Make Another Reservation
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`rounded-3xl border p-6 sm:p-10 space-y-8 shadow-xl ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Step 1: Select Zone */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Select Experience & Zone
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {zones.map((z) => {
                  const Icon = z.icon;
                  const isSelected = zone === z.id;
                  return (
                    <button
                      type="button"
                      key={z.id}
                      onClick={() => setZone(z.id)}
                      className={`relative text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400 text-white'
                          : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {z.popular && (
                        <span className="absolute top-3 right-3 text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          Popular
                        </span>
                      )}
                      <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <div className="text-sm font-bold text-slate-200">{z.title}</div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-1">{z.subtitle}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date, Time, Guests & Gaming Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">01:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                  <option value="18:00">06:00 PM (Prime Gaming)</option>
                  <option value="19:30">07:30 PM (Dinner & Esports)</option>
                  <option value="21:00">09:00 PM (Late Night Session)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  Party Size
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value={1}>1 Person (Solo Battlestation)</option>
                  <option value={2}>2 Persons (Duo Match / Date)</option>
                  <option value={4}>4 Persons (Squad LAN)</option>
                  <option value={6}>6 Persons (Full Party)</option>
                  <option value={10}>10+ Persons (Tournament / VIP)</option>
                </select>
              </div>

              {(zone === 'esports_arena' || zone === 'ps5_battlestation') && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
                    Gaming Duration
                  </label>
                  <select
                    value={gamingHours}
                    onChange={(e) => setGamingHours(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value={1}>1 Hour Session</option>
                    <option value={2}>2 Hours (Recommended)</option>
                    <option value={3}>3 Hours (Ranked Grind)</option>
                    <option value={5}>5 Hours (All-Night LAN)</option>
                  </select>
                </div>
              )}

            </div>

            {/* Step 3: Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Aayush Shrestha"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Phone / WhatsApp Number <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9801234567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Special Request */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Special Requests or Specific Games (Optional)
              </label>
              <input
                type="text"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. Valorant pre-installed on PC rigs, birthday cake candle, quiet corner"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>No advance deposit required. We hold tables for 15 minutes past time.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 active:scale-98 font-bold text-slate-950 text-sm shadow-xl transition cursor-pointer"
              >
                Confirm Instant Booking
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
