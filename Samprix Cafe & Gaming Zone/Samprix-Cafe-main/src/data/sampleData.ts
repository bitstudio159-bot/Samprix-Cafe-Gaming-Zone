import { BlogPost, FaqItem, Order, Reservation, UserLoyalty, UserReview } from '../types';

export const INITIAL_LOYALTY: UserLoyalty = {
  xp: 450,
  level: 3,
  tier: 'Bronze Grinder',
  coffeeBeansEarned: 18,
  gamingHoursLogged: 8.5,
  milestones: [
    {
      id: 'm-1',
      title: 'First Match Victory',
      description: 'Book your first gaming battlestation session at Samprix',
      completed: true,
      xpReward: 150,
      icon: 'gamepad'
    },
    {
      id: 'm-2',
      title: 'Mo:Mo Connoisseur',
      description: 'Taste the signature Himalayan Buff or Chicken Jhol Mo:Mo',
      completed: true,
      xpReward: 100,
      icon: 'utensils'
    },
    {
      id: 'm-3',
      title: 'Caffeine Surge',
      description: 'Order 5 artisanal espresso or latte creations',
      completed: true,
      xpReward: 200,
      icon: 'coffee'
    },
    {
      id: 'm-4',
      title: 'Squad Night Out',
      description: 'Reserve a VIP lounge booth for 4+ people',
      completed: false,
      xpReward: 350,
      icon: 'users'
    },
    {
      id: 'm-5',
      title: 'Esports Champion',
      description: 'Log 20 total gaming lounge hours to achieve Silver Legend',
      completed: false,
      xpReward: 500,
      icon: 'trophy'
    }
  ],
  unlockedPerks: [
    'Complimentary French Fries on orders above Rs. 600',
    'Priority PS5 Station Queue Access',
    '10% Discount on Barista Special Drinks'
  ]
};

export const REVIEWS: UserReview[] = [
  {
    id: 'rev-1',
    name: 'Aayush Shrestha',
    rating: 5,
    date: 'Yesterday',
    comment: 'The combination of high-refresh rate esports PCs and authentic Himalayan Jhol Momo is unbeatable! The vibes at Basundhara are top-tier. Cleanest gaming lounge in town.',
    itemRecommended: 'Chicken Jhol Mo:Mo & PS5 Station',
    verifiedVisit: true
  },
  {
    id: 'rev-2',
    name: 'Pooja Thapa',
    rating: 5,
    date: '3 days ago',
    comment: 'Mocha Madness and the Special Skyscraper Burger were outstanding! Really cozy corner tables for work during the afternoon, then fun gaming with friends in the evening.',
    itemRecommended: 'Special Skyscraper Burger & Mocha Madness',
    verifiedVisit: true
  },
  {
    id: 'rev-3',
    name: 'Rohan Gurung',
    rating: 5,
    date: 'Last week',
    comment: 'We booked the VIP gaming booth for our LAN tournament. 240Hz monitors, mechanical keyboards, zero lag, and the Chicken Feast pizza kept us energized all night!',
    itemRecommended: 'Chicken Feast Pizza & Fully Loaded Box',
    verifiedVisit: true
  },
  {
    id: 'rev-4',
    name: 'Sunita Maharjan',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The staff is exceptionally welcoming. Great coffee quality that rivals premium boutique cafes in Kathmandu, and very fair pricing. Lotus Biscoff shake is divine!',
    itemRecommended: 'Lotus Biscoff Shake & Artisan Latte',
    verifiedVisit: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Fueling Your Esports Session: Nutrition & High-Energy Cafe Bites',
    slug: 'fueling-esports-session-nutrition',
    excerpt: 'How our artisanal low-acidity espresso brews and protein-packed chicken meals give gamers sustained focus without the crash.',
    date: 'October 12, 2026',
    readTime: '4 min read',
    category: 'Gamer Wellness',
    image: '/src/assets/images/cafe_gaming_hero_1792049416356.jpg',
    author: 'Samprix Culinary Team',
    content: [
      'Competitive gaming demands razor-sharp reflexes and sustained cognitive stamina. Sugary energy drinks cause rapid spikes followed by debilitating mental fatigue.',
      'At Samprix, our menu is intentionally crafted with whole ingredients: fresh chicken breast strips, Himalayan herb-infused broths, and freshly roasted espresso beans.',
      'Next time you gear up for a competitive ranked streak, pair your gaming session with our Frosty Mint Lemonade or Artisan Americano alongside high-protein chicken momos.'
    ]
  },
  {
    id: 'blog-2',
    title: 'Behind the Scenes: Crafting the Perfect Himalayan Jhol Mo:Mo Broth',
    slug: 'crafting-perfect-jhol-momo-broth',
    excerpt: 'An insider look into our 12-spice roasted tomato, sesame, and timur recipe that keeps Kathmandu foodies coming back to Basundhara.',
    date: 'September 28, 2026',
    readTime: '5 min read',
    category: 'Kitchen Stories',
    image: '/src/assets/images/steam_dumplings_momo_1792049416222.jpg',
    author: 'Chef Suman, Head of Kitchen',
    content: [
      'In Kathmandu, mo:mo is not just street food; it is an emotion and a cultural cornerstone.',
      'Our signature Jhol broth starts with slow-roasting organic valley tomatoes over charcoal, toasted white sesame seeds, soybeans, and wild Sichuan timur peppers from Mustang.',
      'Submerging piping hot steamed dumplings into this silky, nutty soup creates the comforting explosion of flavors that defines Samprix.'
    ]
  },
  {
    id: 'blog-3',
    title: 'Next-Gen Gaming Lounge: Why 240Hz & PS5 Pro Make All the Difference',
    slug: 'next-gen-gaming-lounge-tech-tour',
    excerpt: 'Explore the esports infrastructure at Samprix: ultra-fast fiber optics, custom ergonomic Secretlab chairs, and tournament rigs.',
    date: 'September 15, 2026',
    readTime: '3 min read',
    category: 'Tech & Gaming',
    image: '/src/assets/images/gaming_zone_setup_1792049418085.jpg',
    author: 'Kiran, Esports Director',
    content: [
      'Latency is the difference between a clutch headshot and a round loss. We invested in dedicated leased line internet with sub-10ms ping to South Asian game servers.',
      'Our stations feature NVIDIA RTX graphics cards, 240Hz G-Sync esports monitors, custom mechanical switches, and comfortable wireless headsets.',
      'Whether you play Valorant, CS2, EA Sports FC 25, or Tekken 8 on PlayStation 5, Samprix delivers an unmatched pro-level environment.'
    ]
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Where is Samprix Cafe N Gaming Zone located and what are your opening hours?',
    answer: 'We are situated in Basundhara Chowki, right near MN Hospital, Kathmandu. We are open 7 days a week from 10:00 AM to 11:00 PM.',
    category: 'general'
  },
  {
    id: 'faq-2',
    question: 'How do I book a PS5 or PC gaming station in advance?',
    answer: 'You can easily reserve directly via our online Booking tab, through our 24/7 AI Chatbot, or by calling us at 9700287796 / 9740685162. Instant confirmation is sent via SMS and WhatsApp.',
    category: 'gaming'
  },
  {
    id: 'faq-3',
    question: 'How does live order tracking work?',
    answer: 'Once you place an order for dine-in, takeaway, or delivery, you receive a unique Order Tracking ID (e.g. #SMP-2041). You can view the live preparation timeline in real-time or click the WhatsApp button to receive automated status updates directly on your phone.',
    category: 'menu'
  },
  {
    id: 'faq-4',
    question: 'What payment options do you support?',
    answer: 'We accept digital wallet transfers via eSewa and Khalti, Credit/Debit cards, QR code payments, and cash on delivery/counter payment.',
    category: 'general'
  },
  {
    id: 'faq-5',
    question: 'Can I host birthday parties, LAN tournaments, or private gatherings?',
    answer: 'Yes! We host birthday gaming tournaments, private VIP lounge booth reservations, and corporate hangouts. Contact our event coordinator via WhatsApp or phone for custom packages.',
    category: 'booking'
  }
];

export const INITIAL_ORDERS: Order[] = [
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
          categoryName: 'Special Combo Boxes',
          price: 700,
          description: '1 Fillet Burger + 10 Pcs Popcorn + Chips & Jigri Coke',
          rating: 4.9,
          reviewCount: 134,
          preparationTimeMinutes: 14
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
          categoryName: 'Thick Shakes',
          price: 300,
          description: 'Decadent caramelized Lotus Biscoff spread shake',
          rating: 5.0,
          reviewCount: 135,
          preparationTimeMinutes: 6
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
  },
  {
    id: 'ord-102',
    orderNumber: 'SMP-8925',
    customerName: 'Samikshya Gautam',
    phone: '9801987654',
    email: 'samikshya@outlook.com',
    deliveryType: 'delivery',
    deliveryAddress: 'Basundhara, Ring Road near Himalayan Bank',
    items: [
      {
        id: 'cl-3',
        menuItem: {
          id: 'momo-chicken-jhol',
          name: 'Chicken Jhol Mo:Mo',
          category: 'momo',
          categoryName: 'Himalayan Mo:Mo',
          price: 300,
          description: 'Steamed chicken dumplings in savory sesame jhol broth',
          rating: 5.0,
          reviewCount: 160,
          preparationTimeMinutes: 12
        },
        price: 300,
        quantity: 2
      },
      {
        id: 'cl-4',
        menuItem: {
          id: 'pizza-bbq-chicken',
          name: 'BBQ Chicken Pizza',
          category: 'pizza',
          categoryName: 'Artisan Pizzas',
          price: 450,
          description: 'Medium BBQ chicken with chips and drink',
          rating: 4.8,
          reviewCount: 61,
          preparationTimeMinutes: 15
        },
        size: 'Medium',
        price: 450,
        quantity: 1
      }
    ],
    subtotal: 1050,
    tax: 0,
    discount: 0,
    total: 1050,
    paymentMethod: 'khalti',
    paymentStatus: 'paid',
    status: 'preparing',
    createdAt: new Date(Date.now() - 8 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60000).toISOString(),
    timeline: [
      {
        status: 'received',
        title: 'Order Confirmed',
        description: 'Online delivery order confirmed by dispatch.',
        timestamp: '8 mins ago',
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'preparing',
        title: 'Kitchen Preparation',
        description: 'Fresh dough hand-stretched; momos cooking in steamer.',
        timestamp: '4 mins ago',
        isCompleted: false,
        isCurrent: true
      },
      {
        status: 'in_oven_grill',
        title: 'Oven Baking',
        description: 'Pizza melting under wood stone temperature.',
        timestamp: 'Pending',
        isCompleted: false,
        isCurrent: false
      },
      {
        status: 'out_for_delivery',
        title: 'Rider Dispatched',
        description: 'Samprix express bike on the way to Basundhara.',
        timestamp: 'Pending',
        isCompleted: false,
        isCurrent: false
      },
      {
        status: 'completed',
        title: 'Delivered',
        description: 'Package handed over safely.',
        timestamp: 'Pending',
        isCompleted: false,
        isCurrent: false
      }
    ]
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
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
  },
  {
    id: 'res-502',
    reservationNumber: 'SMP-RES-3302',
    customerName: 'Pratima Sharma',
    phone: '9813098765',
    email: 'pratima@gmail.com',
    date: 'Today',
    time: '8:00 PM',
    guests: 2,
    zone: 'vip_booth',
    specialRequests: 'Corner table with anniversary dessert candle',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 60 * 60000).toISOString()
  }
];
