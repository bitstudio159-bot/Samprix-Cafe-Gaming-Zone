import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { connectDatabase } from './src/server/config/database';
import { OrderModel } from './src/server/models/Order';
import { ReservationModel } from './src/server/models/Reservation';
import { MenuItemModel } from './src/server/models/MenuItem';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const menuImageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Only JPG, PNG and WebP images are allowed'));
    }
  },
});
const PORT = Number(process.env.PORT) || 3000;

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

// Public menu data comes from MongoDB. Mutations require a server-side admin key.
app.get('/api/menu', async (_req, res) => {
  try {
    const items = await MenuItemModel.find({}, { _id: 0, __v: 0 }).sort({ category: 1, name: 1 }).lean();
    res.json(items);
  } catch (error) {
    console.error('Menu fetch failed:', error);
    res.status(500).json({ error: 'Unable to load menu' });
  }
});

app.patch('/api/menu/:id', async (req, res) => {
  const configuredKey = process.env.ADMIN_API_KEY;
  if (!configuredKey || req.get('x-admin-key') !== configuredKey) {
    return res.status(401).json({ error: 'Admin authorization required' });
  }
  const allowed = ['name', 'description', 'price', 'isPopular', 'isVegetarian', 'isSpicy', 'image', 'preparationTimeMinutes'];
  const changes: Record<string, unknown> = {};
  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(req.body ?? {}, key)) changes[key] = req.body[key];
  }
  if (!Object.keys(changes).length) return res.status(400).json({ error: 'No editable fields supplied' });
  if (changes.name !== undefined && (typeof changes.name !== 'string' || !changes.name.trim())) return res.status(400).json({ error: 'Invalid name' });
  if (changes.description !== undefined && typeof changes.description !== 'string') return res.status(400).json({ error: 'Invalid description' });
  if (changes.image !== undefined && typeof changes.image !== 'string') return res.status(400).json({ error: 'Invalid image' });
  for (const key of ['price', 'preparationTimeMinutes']) {
    if (changes[key] !== undefined && (typeof changes[key] !== 'number' || !Number.isFinite(changes[key]) || (changes[key] as number) < 0)) {
      return res.status(400).json({ error: `Invalid ${key}` });
    }
  }
  for (const key of ['isPopular', 'isVegetarian', 'isSpicy']) {
    if (changes[key] !== undefined && typeof changes[key] !== 'boolean') return res.status(400).json({ error: `Invalid ${key}` });
  }
  try {
    const item = await MenuItemModel.findOneAndUpdate({ id: req.params.id }, { $set: changes }, { new: true, runValidators: true }).lean();
    if (!item) return res.status(404).json({ error: 'Menu item not found' });
    res.json(item);
  } catch (error) {
    console.error('Menu update failed:', error);
    res.status(500).json({ error: 'Unable to save menu item' });
  }
});

app.post('/api/menu/upload-image', (req, res) => {
  // Only authorized admins can upload images.
  const configuredKey = process.env.ADMIN_API_KEY;

  if (!configuredKey || req.get('x-admin-key') !== configuredKey) {
    return res.status(401).json({
      error: 'Admin authorization required'
    });
  }

  menuImageUpload.single('image')(req, res, async (uploadError) => {
    if (uploadError) {
      return res.status(400).json({
        error: uploadError.message || 'Invalid image upload'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: 'Please select an image'
      });
    }

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return res.status(503).json({
        error: 'Cloudinary is not configured'
      });
    }

    try {
      const result = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'samprix/menu',
            resource_type: 'image'
          },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error('Upload failed'));
              return;
            }

            resolve(result.secure_url);
          }
        );

        stream.end(req.file!.buffer);
      });

      return res.json({
        success: true,
        imageUrl: result
      });

    } catch (error) {
      console.error('Cloudinary upload failed:', error);

      return res.status(500).json({
        error: 'Unable to upload image'
      });
    }
  });
});

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
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await OrderModel.find(
      {},
      { _id: 0 }
    ).lean();

    res.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({
      error: 'Failed to retrieve orders'
    });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = req.body;

    if (
      !newOrder ||
      !Array.isArray(newOrder.items) ||
      newOrder.items.length === 0
    ) {
      return res.status(400).json({
        error: 'Invalid order structure'
      });
    }

    const order = await OrderModel.create(newOrder);

    const savedOrder = order.toObject();
    const { _id, ...response } = savedOrder;

    res.status(201).json(response);
  } catch (error: any) {
    console.error('Failed to create order:', error);

    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Order ID or order number already exists'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Invalid order data'
      });
    }

    res.status(500).json({
      error: 'Failed to create order'
    });
  }
});

app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body ?? {};

    const allowedStatuses = [
      'received',
      'preparing',
      'in_oven_grill',
      'ready',
      'out_for_delivery',
      'completed',
      'cancelled'
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid order status'
      });
    }

    const order = await OrderModel.findOne({ id });

    if (!order) {
      return res.status(404).json({
        error: 'Order not found'
      });
    }

    order.status = status;
    order.updatedAt = new Date().toISOString();

    // Preserve existing timeline entries.
    const timeline = order.timeline || [];

    // Mark the selected tracking step as current.
    for (const step of timeline) {
      step.isCurrent = step.status === status;

      if (step.status === status) {
        step.isCompleted = true;
        step.timestamp = 'Just now';
      }
    }

    order.markModified('timeline');

    await order.save();

    const savedOrder = order.toObject();
    const { _id, ...response } = savedOrder;

    res.json(response);
  } catch (error) {
    console.error('Failed to update order status:', error);

    res.status(500).json({
      error: 'Failed to update order status'
    });
  }
});

// 3. Reservations Endpoints
app.get('/api/reservations', async (req, res) => {
  try {
    const reservations = await ReservationModel.find(
      {},
      { _id: 0 }
    ).lean();

    res.json(reservations);
  } catch (error) {
    console.error('Failed to fetch reservations:', error);
    res.status(500).json({
      error: 'Failed to retrieve reservations'
    });
  }
});

app.post('/api/reservations', async (req, res) => {
  try {
    const newReservation = req.body;

    if (
      !newReservation ||
      typeof newReservation !== 'object' ||
      !newReservation.id ||
      !newReservation.reservationNumber ||
      !newReservation.customerName ||
      !newReservation.phone ||
      !newReservation.email ||
      !newReservation.date ||
      !newReservation.time ||
      !Number.isInteger(newReservation.guests) ||
      newReservation.guests < 1 ||
      !newReservation.zone
    ) {
      return res.status(400).json({
        error: 'Invalid reservation data'
      });
    }

    const reservation = await ReservationModel.create(newReservation);

    const savedReservation = reservation.toObject();
    const { _id, ...response } = savedReservation;

    res.status(201).json(response);
  } catch (error: any) {
    console.error('Failed to create reservation:', error);

    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Reservation ID or number already exists'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Invalid reservation data'
      });
    }

    res.status(500).json({
      error: 'Failed to create reservation'
    });
  }
});

app.patch('/api/reservations/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body ?? {};

    const allowedStatuses = [
      'pending',
      'confirmed',
      'seated',
      'completed',
      'cancelled'
    ];

    if (
      typeof status !== 'string' ||
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        error: 'Invalid reservation status'
      });
    }

    const reservation = await ReservationModel.findOneAndUpdate(
      { id },
      { $set: { status } },
      {
        new: true,
        runValidators: true,
        projection: { _id: 0 }
      }
    ).lean();

    if (!reservation) {
      return res.status(404).json({
        error: 'Reservation not found'
      });
    }

    res.json(reservation);
  } catch (error) {
    console.error('Failed to update reservation status:', error);

    res.status(500).json({
      error: 'Failed to update reservation status'
    });
  }
});

// 4. Robust Analytics Backend
app.get('/api/analytics', async (req, res) => {
  try {
    const [totalOrders, revenueResult, activeReservations] =
      await Promise.all([
        OrderModel.countDocuments(),

        OrderModel.aggregate([
          {
            $match: {
              paymentStatus: 'paid'
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$total' }
            }
          }
        ]),

        ReservationModel.countDocuments({
          status: 'confirmed'
        })
      ]);

    const totalRevenue = revenueResult[0]?.total ?? 0;

    res.json({
      revenueToday: totalRevenue,
      totalOrders,
      activeGamingStations: 14,
      totalGamingStations: 16,
      activeReservations,
      avgPrepTimeMinutes: 14,
      guestRating: 4.9
    });
  } catch (error) {
    console.error('Failed to retrieve analytics:', error);

    res.status(500).json({
      error: 'Failed to retrieve analytics'
    });
  }
});

// 5. Direct Order Notification Dispatch
app.post('/api/notify/order', async (req, res) => {
  try {
    const { orderId, channel, recipient } = req.body ?? {};

    if (typeof orderId !== 'string' || !orderId.trim()) {
      return res.status(400).json({
        error: 'Valid order ID is required'
      });
    }

    const order = await OrderModel.findOne(
      { id: orderId },
      { _id: 0 }
    ).lean();

    if (!order) {
      return res.status(404).json({
        error: 'Order not found'
      });
    }

    // Generate a WhatsApp link without sending a message.
    const message = `Hello ${order.customerName}, your Samprix Cafe N Gaming Zone order #${order.orderNumber} is currently: ${order.status.toUpperCase()}. Total: Rs. ${order.total}/-. Location: Basundhara Chowki.`;

    const phone = order.phone.replace(/\D/g, '');
    const whatsappPhone = phone.startsWith('977')
      ? phone
      : `977${phone.replace(/^0/, '')}`;

    const whatsappUrl =
      `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;

    res.json({
      success: true,
      channel,
      recipient,
      statusText: order.status,
      whatsappUrl,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to generate order notification:', error);

    res.status(500).json({
      error: 'Failed to generate order notification'
    });
  }
});

// Mount Vite middleware in development
async function startServer() {
  try {
    // Connect to MongoDB Atlas before starting Express
    await connectDatabase();

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
      console.log(`Samprix Cafe Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start Samprix Cafe server:', error);
    process.exitCode = 1;
  }
}

startServer();
