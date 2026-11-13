import dotenv from 'dotenv';
import dns from 'node:dns';
import mongoose from 'mongoose';

dotenv.config({ quiet: true });

async function migrate() {
  try {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB_NAME;

    if (!uri || !dbName) {
      throw new Error('MongoDB configuration missing');
    }

    const dnsServers = process.env.MONGODB_DNS_SERVERS
      ?.split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (dnsServers?.length) {
      dns.setServers(dnsServers);
    }

    await mongoose.connect(uri, {
      dbName,
      serverSelectionTimeoutMS: 15000
    });

    const db = mongoose.connection.db!;

    const now = new Date().toISOString();

    const order = {
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
      tax: 0,
      discount: 50,
      total: 950,
      paymentMethod: 'esewa',
      paymentStatus: 'paid',
      status: 'in_oven_grill',
      createdAt: now,
      updatedAt: now,
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
    };

    const reservation = {
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
      specialRequests:
        'Need 4 adjacent PC rigs for 5v5 Valorant practice',
      status: 'confirmed',
      createdAt: now
    };

    const orderResult = await db.collection('orders').updateOne(
      { id: order.id },
      { $setOnInsert: order },
      { upsert: true }
    );

    const reservationResult =
      await db.collection('reservations').updateOne(
        { id: reservation.id },
        { $setOnInsert: reservation },
        { upsert: true }
      );

    console.log('Database:', dbName);
    console.log('Orders inserted:', orderResult.upsertedCount);
    console.log(
      'Reservations inserted:',
      reservationResult.upsertedCount
    );
    console.log('Migration completed successfully');

  } catch (error) {
    console.error('Migration failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

migrate();