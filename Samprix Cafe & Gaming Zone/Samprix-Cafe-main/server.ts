import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database store with initial seeded records
let ordersStore = [
  {
    id: 'ord-101',
    orderNumber: 'SMP-8924',
    customerName: 'Bikash Karki',
    phone: '9841234567',
    email: 'bikash@gmail.com',
    deliveryType: 'dine-in',
    tableNumber: 'Booth 4 (Gaming Zone)',
    items: [
      {
        id: 'cl-1',
        menuItem: {
          id: 'box-fully-loaded',
          name: 'Fully Loaded Gamer Box',
          category: 'boxes',
          price: 700
        },
        price: 700,
        quantity: 1
      },
      {
        id: 'cl-2',
        menuItem: {
          id: 'shake-lotus-biscoff',
          name: 'Lotus Biscoff Speculoos Shake',
          category: 'shakes',
          price: 300
        },
        price: 300,
        quantity: 1
      }
    ],
    subtotal: 1000,
    discount: 50,
    total: 950,
    paymentMethod: 'esewa',
    paymentStatus: 'paid',
    status: 'in_oven_grill',
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60000).toISOString(),
    timeline: [
      {
        status: 'received',
        title: 'Order Confirmed',
        description: 'Order received in the kitchen POS system.',
        timestamp: '15 mins ago',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'preparing',
        title: 'Ingredient Prep',
        description: 'Chef selected fresh chicken fillets and potatoes.',
        timestamp: '10 mins ago',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'in_oven_grill',
        title: 'In Oven & Deep Fryer',
        description: 'Crispy fillet burger being toasted; shake being blended.',
        timestamp: '3 mins ago',
        isCompleted: false,
        isCurrent: true
      },
      {
        status: 'ready',
        title: 'Plated & Ready to Serve',
        description: 'Placed on serving tray with condiments.',
        timestamp: 'Pending',
        isCompleted: false,
        isCurrent: false
      },
      {
        status: 'completed',
        title: 'Served to Table / Delivered',
        description: 'Enjoy your meal and great vibes!',
        timestamp: 'Pending',
        isCompleted: false,
        isCurrent: false
      }
    ]
  }
];

let reservationsStore = [
  {
    id: 'res-501',
    reservationNumber: 'SMP-RES-3301',
    customerName: 'Anil Rana',
    phone: '9851123456',
    email: 'anil.rana@gmail.com',
    date: 'Today',
    time: '6:30 PM',
    guests: 4,
    zone: 'esports_arena',
    gamingHours: 3,
    specialRequests: 'Need 4 adjacent PC rigs for 5v5 Valorant practice',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 120 * 60000).toISOString()
  }
];

// Gemini AI Client configuration
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// 1. AI Concierge Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.json({
        reply: "Welcome to Samprix Cafe N Gaming Zone at Basundhara Chowki, Kathmandu! We're open 10:00 AM - 11:00 PM. Call us at 9700287796."
      });
    }

    const systemPrompt = `You are the friendly, helpful AI Concierge for "Samprix Cafe N Gaming Zone".
Location: Basundhara Chowki, MN Hospital, Ring Road, Kathmandu, Nepal.
Phone & WhatsApp: 9700287796 / 9740685162.
Opening Hours: 10:00 AM – 11:00 PM every day.
Menu Highlights & Exact Prices in Nepalese Rupees (Rs):
- PIZZA (Small Rs 300, Medium Rs 450, Large Rs 700. Any pizza with chips & drink combo: 620 / 720 / 950): Al Fungi, Margarita, Veg Pizza, Chicken Sweet Corn, Chicken Feast, Tandoori Charcoal, Hot Shot Pizza, Pepperoni, BBQ Chicken.
- COMBO BOXES: Boneless Box (4 Chicken Strips, 10 Popcorn, Chips & Jigri Coke) Rs 700; Fully Loaded Gamer Box (1 Fillet Burger, 10 Popcorn, Chips & Jigri Coke) Rs 700.
- BURGER MEALS: Chicken Burger meal deal Rs 400; Veg burger meal deal Rs 350; Special Burger Skyscraper Rs 450; Cheese chicken Rs 430.
- MO:MO (HIMALAYAN DUMPLINGS): Chicken Steamed Rs 200, Buff Steamed Rs 180, Chicken Sea (C) Mo:Mo Rs 300, Buff C Mo:Mo Rs 280, Chicken Jhol Mo:Mo Rs 300, Buff Jhol Mo:Mo Rs 300.
- COFFEE: Espresso Rs 150, Doppio Rs 100, Cappuccino Rs 120, Americano Rs 110, Latte Rs 145, Mocha Madness Rs 180, Iced Mocha Rs 170, Iced Latte Rs 160.
- SHAKES: Oreo Rs 260, Snickers Rs 300, Lotus Biscoff Rs 300, M&N Shake Rs 300.
- HOOKAH: Normal Rs 350, Cloud Rs 450 (Double Apple, Mint, Strawberry, Blue Melon, Mango Ice).
- GAMING LOUNGE: 240Hz esports PC battlestations with RTX graphics, PlayStation 5 suites with 4K screens, private VIP booths, ultra-low ping leased line internet.

Keep answers concise, warm, helpful, and polite. If the user wants to book or reserve, give clear confirmation and encourage them to click the booking option.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7
      }
    });

    const reply = response.text || "I am glad to assist you at Samprix Cafe!";
    
    // Check if user is asking to book
    let reservationRequest = null;
    const lower = message.toLowerCase();
    if (lower.includes('book') || lower.includes('reserve') || lower.includes('booking')) {
      reservationRequest = {
        detected: true,
        summary: message
      };
    }

    res.json({ reply, reservationRequest });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      reply: "Welcome to Samprix Cafe N Gaming Zone! Located at Basundhara Chowki, MN Hospital. Open 10 AM - 11 PM daily. Call 9700287796 to reserve." 
    });
  }
});

// 2. Orders Endpoints
app.get('/api/orders', (req, res) => {
  res.json(ordersStore);
});

app.post('/api/orders', (req, res) => {
  const newOrder = req.body;
  if (!newOrder || !newOrder.items) {
    return res.status(400).json({ error: 'Invalid order structure' });
  }
  ordersStore.unshift(newOrder);
  res.status(201).json(newOrder);
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = ordersStore.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  order.status = status;
  order.updatedAt = new Date().toISOString();
  
  // Update timeline
  const step = order.timeline.find(s => s.status === status);
  if (step) {
    step.isCompleted = true;
    step.isCurrent = true;
    step.timestamp = 'Just now';
  }

  res.json(order);
});

// 3. Reservations Endpoints
app.get('/api/reservations', (req, res) => {
  res.json(reservationsStore);
});

app.post('/api/reservations', (req, res) => {
  const newReservation = req.body;
  if (!newReservation) {
    return res.status(400).json({ error: 'Invalid reservation' });
  }
  reservationsStore.unshift(newReservation);
  res.status(201).json(newReservation);
});

app.patch('/api/reservations/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const resv = reservationsStore.find(r => r.id === id);
  if (!resv) {
    return res.status(404).json({ error: 'Reservation not found' });
  }
  resv.status = status;
  res.json(resv);
});

// 4. Robust Analytics Backend
app.get('/api/analytics', (req, res) => {
  const totalRevenue = ordersStore.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  res.json({
    revenueToday: totalRevenue,
    totalOrders: ordersStore.length,
    activeGamingStations: 14,
    totalGamingStations: 16,
    activeReservations: reservationsStore.filter(r => r.status === 'confirmed').length,
    avgPrepTimeMinutes: 14,
    guestRating: 4.9
  });
});

// 5. Direct Order Notification Dispatch
app.post('/api/notify/order', (req, res) => {
  const { orderId, channel, recipient } = req.body;
  const order = ordersStore.find(o => o.id === orderId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Pre-generate formatted WhatsApp direct message link
  const message = `Hello ${order.customerName}, your Samprix Cafe N Gaming Zone order #${order.orderNumber} is currently: ${order.status.toUpperCase()}. Total: Rs. ${order.total}/-. Location: Basundhara Chowki.`;
  const whatsappUrl = `https://wa.me/977${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  res.json({
    success: true,
    channel,
    recipient,
    statusText: order.status,
    whatsappUrl,
    timestamp: new Date().toISOString()
  });
});

// Mount Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true }
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Samprix Cafe Server running at http://localhost:${PORT}`);
  });
}

startServer();
