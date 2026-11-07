import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // --- PIZZA ---
  {
    id: 'pizza-al-fungi',
    name: 'Al Fungi Pizza',
    category: 'pizza',
    categoryName: 'Artisan Pizzas',
    price: 300,
    sizePrices: {
      small: 300,
      medium: 450,
      large: 700,
      comboSmall: 620,
      comboMedium: 720,
      comboLarge: 950
    },
    description: 'Fresh field mushrooms, aromatic roasted garlic, Italian herbs, rich plum tomato reduction, and stretchy mozzarella.',
    isVegetarian: true,
    rating: 4.8,
    reviewCount: 38,
    preparationTimeMinutes: 15,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },
  {
    id: 'pizza-margarita',
    name: 'Margarita Pizza',
    category: 'pizza',
    categoryName: 'Artisan Pizzas',
    price: 300,
    sizePrices: {
      small: 300,
      medium: 450,
      large: 700,
      comboSmall: 620,
      comboMedium: 720,
      comboLarge: 950
    },
    description: 'Classic stone-baked crust layered with crushed San Marzano tomato sauce, fresh buffalo mozzarella, and fragrant torn basil leaves.',
    isVegetarian: true,
    isPopular: true,
    rating: 4.9,
    reviewCount: 72,
    preparationTimeMinutes: 12,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },
  {
    id: 'pizza-veg',
    name: 'Garden Veggie Pizza',
    category: 'pizza',
    categoryName: 'Artisan Pizzas',
    price: 300,
    sizePrices: {
      small: 300,
      medium: 450,
      large: 700,
      comboSmall: 620,
      comboMedium: 720,
      comboLarge: 950
    },
    description: 'Colorful crisp bell peppers, sweet red onions, Kalamata olives, juicy golden corn, and melted mozzarella on our signature crust.',
    isVegetarian: true,
    rating: 4.7,
    reviewCount: 29,
    preparationTimeMinutes: 14,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },
  {
    id: 'pizza-chicken-sweet-corn',
    name: 'Chicken Sweet Corn Pizza',
    category: 'pizza',
    categoryName: 'Artisan Pizzas',
    price: 300,
    sizePrices: {
      small: 300,
      medium: 450,
      large: 700,
      comboSmall: 620,
      comboMedium: 720,
      comboLarge: 950
    },
    description: 'Marinated tender diced chicken breasts paired with sweet buttery golden corn, oregano, and double mozzarella cheese.',
    rating: 4.8,
    reviewCount: 54,
    preparationTimeMinutes: 15,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },
  {
    id: 'pizza-chicken-feast',
    name: 'Chicken Feast Pizza',
    category: 'pizza',
    categoryName: 'Artisan Pizzas',
    price: 300,
    sizePrices: {
      small: 300,
      medium: 450,
      large: 700,
      comboSmall: 620,
      comboMedium: 720,
      comboLarge: 950
    },
    description: 'Generously loaded with herb roasted chicken chunks, barbecue drizzle, charred onions, and herb infused cheese.',
    isPopular: true,
    rating: 4.9,
    reviewCount: 88,
    preparationTimeMinutes: 16,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },
  {
    id: 'pizza-tandoori-charcoal',
    name: 'Tandoori Charcoal Pizza',
    category: 'pizza',
    categoryName: 'Artisan Pizzas',
    price: 300,
    sizePrices: {
      small: 300,
      medium: 450,
      large: 700,
      comboSmall: 620,
      comboMedium: 720,
      comboLarge: 950
    },
    description: 'Smoky charcoal-grilled tandoori chicken chunks, roasted bell peppers, fresh green chilies, and spiced mozzarella.',
    isSpicy: true,
    rating: 4.9,
    reviewCount: 65,
    preparationTimeMinutes: 16,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },
  {
    id: 'pizza-hot-shot',
    name: 'Hot Shot Pizza',
    category: 'pizza',
    categoryName: 'Artisan Pizzas',
    price: 300,
    sizePrices: {
      small: 300,
      medium: 450,
      large: 700,
      comboSmall: 620,
      comboMedium: 720,
      comboLarge: 950
    },
    description: 'Fiery red bird-eye chilies, pickled jalapeños, spicy shredded chicken, chili oil drizzle, and pepper jack cheese.',
    isSpicy: true,
    rating: 4.8,
    reviewCount: 42,
    preparationTimeMinutes: 15,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },
  {
    id: 'pizza-pepperoni',
    name: 'Pepperoni Pizza',
    category: 'pizza',
    categoryName: 'Artisan Pizzas',
    price: 300,
    sizePrices: {
      small: 300,
      medium: 450,
      large: 700,
      comboSmall: 620,
      comboMedium: 720,
      comboLarge: 950
    },
    description: 'Crispy curled cured pepperoni slices baked to golden perfection with zesty marinara sauce and extra mozzarella.',
    isPopular: true,
    rating: 4.9,
    reviewCount: 95,
    preparationTimeMinutes: 14,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },
  {
    id: 'pizza-bbq-chicken',
    name: 'BBQ Chicken Pizza',
    category: 'pizza',
    categoryName: 'Artisan Pizzas',
    price: 300,
    sizePrices: {
      small: 300,
      medium: 450,
      large: 700,
      comboSmall: 620,
      comboMedium: 720,
      comboLarge: 950
    },
    description: 'Tender chicken tossed in sweet and tangy hickory smoke BBQ sauce with red onion slices, cilantro, and cheddar-mozzarella blend.',
    rating: 4.8,
    reviewCount: 61,
    preparationTimeMinutes: 15,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },

  // --- SPECIAL COMBO BOXES ---
  {
    id: 'box-boneless',
    name: 'Boneless Special Box',
    category: 'boxes',
    categoryName: 'Special Combo Boxes',
    price: 700,
    description: '4 pcs Crispy Golden Chicken Strips, 10 pcs Crunchy Chicken Popcorn, seasoned French Fries & chilled Jigri Coke.',
    isPopular: true,
    rating: 5.0,
    reviewCount: 112,
    preparationTimeMinutes: 12,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },
  {
    id: 'box-fully-loaded',
    name: 'Fully Loaded Gamer Box',
    category: 'boxes',
    categoryName: 'Special Combo Boxes',
    price: 700,
    description: '1 Crisp Juicy Chicken Fillet Burger, 10 pcs Popcorn Chicken, Seasoned French Fries & chilled Jigri Coke.',
    isPopular: true,
    rating: 4.9,
    reviewCount: 134,
    preparationTimeMinutes: 14,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },

  // --- BURGER MEALS & A LA CARTE ---
  {
    id: 'deal-chicken-burger',
    name: 'Chicken Burger Meal Deal',
    category: 'burgers',
    categoryName: 'Burgers & Meals',
    price: 400,
    description: 'Juicy spiced chicken patty burger loaded with crisp lettuce, tomato, special sauce, served with french fries and a chilled soft drink.',
    isPopular: true,
    rating: 4.8,
    reviewCount: 84,
    preparationTimeMinutes: 12,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },
  {
    id: 'deal-veg-burger',
    name: 'Veg Burger Meal Deal',
    category: 'burgers',
    categoryName: 'Burgers & Meals',
    price: 350,
    description: 'Crispy spiced vegetable and potato patty with crunchy lettuce, creamy house mayonnaise, served with french fries and a cold drink.',
    isVegetarian: true,
    rating: 4.6,
    reviewCount: 31,
    preparationTimeMinutes: 10,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },
  {
    id: 'burger-special-skyscraper',
    name: 'Special Skyscraper Burger',
    category: 'burgers',
    categoryName: 'Burgers & Meals',
    price: 450,
    description: 'Towering double fillet patty, melted cheddar slice, crispy onion rings, dill pickles, and signature Samprix house sauce in a toasted brioche bun.',
    isPopular: true,
    rating: 4.9,
    reviewCount: 140,
    preparationTimeMinutes: 15,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },
  {
    id: 'burger-cheese-chicken',
    name: 'Cheese Chicken Burger',
    category: 'burgers',
    categoryName: 'Burgers & Meals',
    price: 430,
    description: 'Golden fried chicken fillet drenched in rich melted cheese sauce, caramelized onions, and house remoulade.',
    rating: 4.7,
    reviewCount: 52,
    preparationTimeMinutes: 12,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },
  {
    id: 'burger-french-fries',
    name: 'Classic French Fries',
    category: 'snacks',
    categoryName: 'Snacks & Sides',
    price: 180,
    description: 'Crispy golden potato batons tossed in Himalayan rock salt and herbs. Served with tomato ketchup and garlic mayo.',
    isVegetarian: true,
    rating: 4.8,
    reviewCount: 76,
    preparationTimeMinutes: 8,
    image: '/src/assets/images/gourmet_pizza_burger_1792049416199.jpg'
  },
  {
    id: 'chips-chilly',
    name: 'Chips Chilly',
    category: 'snacks',
    categoryName: 'Snacks & Sides',
    price: 280,
    description: 'Crisp fried potato chips wok-tossed in spicy schezwan sauce, capsicum, onions, and spring onions.',
    isSpicy: true,
    isVegetarian: true,
    rating: 4.8,
    reviewCount: 46,
    preparationTimeMinutes: 10
  },

  // --- HIMALAYAN MO:MO (DUMPLINGS) ---
  {
    id: 'momo-chicken-steamed',
    name: 'Chicken Steamed Mo:Mo',
    category: 'momo',
    categoryName: 'Himalayan Mo:Mo',
    price: 200,
    description: 'Freshly minced chicken seasoned with Himalayan herbs and onions, wrapped in delicate pastry and steamed to juicy perfection. Served with spicy tomato sesame dip.',
    isPopular: true,
    rating: 5.0,
    reviewCount: 220,
    preparationTimeMinutes: 12,
    image: '/src/assets/images/steam_dumplings_momo_1792049416222.jpg'
  },
  {
    id: 'momo-buff-steamed',
    name: 'Buff Steamed Mo:Mo',
    category: 'momo',
    categoryName: 'Himalayan Mo:Mo',
    price: 180,
    description: 'Traditional spiced water-buffalo mince dumplings steamed fresh in bamboo baskets, served with authentic roasted sesame and Timur chutney.',
    isPopular: true,
    rating: 4.9,
    reviewCount: 185,
    preparationTimeMinutes: 12,
    image: '/src/assets/images/steam_dumplings_momo_1792049416222.jpg'
  },
  {
    id: 'momo-chicken-c-momo',
    name: 'Chicken Sea (C) Mo:Mo',
    category: 'momo',
    categoryName: 'Himalayan Mo:Mo',
    price: 300,
    description: 'Steamed chicken dumplings tossed in a sizzling fiery wok with sweet and sour chili gravy, bell peppers, green chilies, and scallions.',
    isSpicy: true,
    isPopular: true,
    rating: 4.9,
    reviewCount: 94,
    preparationTimeMinutes: 14,
    image: '/src/assets/images/steam_dumplings_momo_1792049416222.jpg'
  },
  {
    id: 'momo-buff-c-momo',
    name: 'Buff Sea (C) Mo:Mo',
    category: 'momo',
    categoryName: 'Himalayan Mo:Mo',
    price: 280,
    description: 'Spiced buff dumplings flash-tossed in intense red chili pepper garlic sauce with sautéed onions and peppers.',
    isSpicy: true,
    rating: 4.8,
    reviewCount: 82,
    preparationTimeMinutes: 14,
    image: '/src/assets/images/steam_dumplings_momo_1792049416222.jpg'
  },
  {
    id: 'momo-chicken-jhol',
    name: 'Chicken Jhol Mo:Mo',
    category: 'momo',
    categoryName: 'Himalayan Mo:Mo',
    price: 300,
    description: 'Steamed chicken momos served submerged in a bowl of aromatic, chilled or warm roasted soybean, peanut, tomato, and timur sesame soup.',
    isPopular: true,
    rating: 5.0,
    reviewCount: 160,
    preparationTimeMinutes: 12,
    image: '/src/assets/images/steam_dumplings_momo_1792049416222.jpg'
  },
  {
    id: 'momo-buff-jhol',
    name: 'Buff Jhol Mo:Mo',
    category: 'momo',
    categoryName: 'Himalayan Mo:Mo',
    price: 300,
    description: 'Authentic Kathmandu-style buff momos drenched in rich nutty, tangy sesame and roasted tomato broth. Comfort food at its peak.',
    isPopular: true,
    rating: 4.9,
    reviewCount: 145,
    preparationTimeMinutes: 12,
    image: '/src/assets/images/steam_dumplings_momo_1792049416222.jpg'
  },

  // --- ARTISAN COFFEE ---
  {
    id: 'coffee-espresso',
    name: 'Single Origin Espresso',
    category: 'coffee',
    categoryName: 'Artisanal Coffee',
    price: 150,
    description: 'Intense and complex single shot pulled on our professional Italian espresso machine with thick crema and notes of dark chocolate.',
    rating: 4.8,
    reviewCount: 45,
    preparationTimeMinutes: 4,
    image: '/src/assets/images/barista_espresso_pour_1792049417660.jpg'
  },
  {
    id: 'coffee-cappuccino',
    name: 'Velvet Cappuccino',
    category: 'coffee',
    categoryName: 'Artisanal Coffee',
    price: 120,
    description: 'Rich espresso topped with equal parts steamed milk and dense velvety foam, dusted with fine cocoa powder.',
    isPopular: true,
    rating: 4.9,
    reviewCount: 98,
    preparationTimeMinutes: 5,
    image: '/src/assets/images/barista_espresso_pour_1792049417660.jpg'
  },
  {
    id: 'coffee-latte',
    name: 'Artisan Cafe Latte',
    category: 'coffee',
    categoryName: 'Artisanal Coffee',
    price: 145,
    description: 'Silky micro-foam poured over espresso with freehand latte art. Smooth, creamy, and soothing.',
    isPopular: true,
    rating: 4.9,
    reviewCount: 110,
    preparationTimeMinutes: 5,
    image: '/src/assets/images/barista_espresso_pour_1792049417660.jpg'
  },
  {
    id: 'coffee-americano',
    name: 'Classic Americano',
    category: 'coffee',
    categoryName: 'Artisanal Coffee',
    price: 110,
    sizePrices: {
      small: 110,
      normal: 120,
      large: 140
    },
    description: 'Double shot of bold espresso diluted with filtered hot water to preserve delicate coffee aromatics.',
    rating: 4.7,
    reviewCount: 39,
    preparationTimeMinutes: 3,
    image: '/src/assets/images/barista_espresso_pour_1792049417660.jpg'
  },
  {
    id: 'coffee-mocha-madness',
    name: 'Mocha Madness',
    category: 'coffee',
    categoryName: 'Artisanal Coffee',
    price: 180,
    description: 'Espresso married with Belgian dark chocolate ganache, steamed milk, and crowned with whipped cream.',
    isPopular: true,
    rating: 5.0,
    reviewCount: 78,
    preparationTimeMinutes: 6,
    image: '/src/assets/images/barista_espresso_pour_1792049417660.jpg'
  },
  {
    id: 'coffee-iced-latte',
    name: 'Iced Vanilla Caramel Latte',
    category: 'coffee',
    categoryName: 'Artisanal Coffee',
    price: 160,
    description: 'Chilled espresso poured over ice cold milk and artisanal vanilla syrup with amber caramel drizzle.',
    isPopular: true,
    rating: 4.9,
    reviewCount: 88,
    preparationTimeMinutes: 4,
    image: '/src/assets/images/barista_espresso_pour_1792049417660.jpg'
  },

  // --- SHAKES & REFRESHMENTS ---
  {
    id: 'shake-oreo',
    name: 'Oreo Milkshake',
    category: 'shakes',
    categoryName: 'Thick Shakes',
    price: 260,
    description: 'Crushed Oreo cookies blended with rich vanilla ice cream, whole milk, and chocolate fudge ribbon.',
    isPopular: true,
    rating: 4.9,
    reviewCount: 120,
    preparationTimeMinutes: 6
  },
  {
    id: 'shake-lotus-biscoff',
    name: 'Lotus Biscoff Speculoos Shake',
    category: 'shakes',
    categoryName: 'Thick Shakes',
    price: 300,
    description: 'Decadent caramelized Lotus Biscoff spread, crushed spiced cookies, vanilla cream, and caramel drizzle.',
    isPopular: true,
    rating: 5.0,
    reviewCount: 135,
    preparationTimeMinutes: 6
  },
  {
    id: 'shake-snickers',
    name: 'Snickers Peanut Butter Shake',
    category: 'shakes',
    categoryName: 'Thick Shakes',
    price: 300,
    description: 'Peanut butter, roasted peanuts, caramel, nougat, and melted chocolate swirled into a thick velvety shake.',
    rating: 4.8,
    reviewCount: 71,
    preparationTimeMinutes: 6
  },
  {
    id: 'refresh-mint-lemonade',
    name: 'Frosty Mint Lemonade',
    category: 'refreshments',
    categoryName: 'Coolers & Sodas',
    price: 170,
    description: 'Crushed garden mint, freshly squeezed Meyer lemons, rock salt, and sparkling soda served on crushed ice.',
    isPopular: true,
    isVegetarian: true,
    rating: 4.9,
    reviewCount: 89,
    preparationTimeMinutes: 5
  },
  {
    id: 'refresh-masala-sprite',
    name: 'Masala Sprite Punch',
    category: 'refreshments',
    categoryName: 'Coolers & Sodas',
    price: 150,
    description: 'Chilled crisp Sprite infused with roasted cumin, chaat masala, mint, and fresh lemon wedge.',
    isVegetarian: true,
    rating: 4.7,
    reviewCount: 48,
    preparationTimeMinutes: 4
  },

  // --- TEA & HOT LEMON ---
  {
    id: 'tea-black-masala',
    name: 'Himalayan Black Masala Tea',
    category: 'tea',
    categoryName: 'Artisan Teas & Infusions',
    price: 35,
    description: 'Illam orthodox tea brewed with cardamom, cloves, cinnamon bark, and crushed fresh ginger.',
    isVegetarian: true,
    rating: 4.8,
    reviewCount: 65,
    preparationTimeMinutes: 5
  },
  {
    id: 'tea-milk-masala',
    name: 'Special Milk Masala Chai',
    category: 'tea',
    categoryName: 'Artisan Teas & Infusions',
    price: 45,
    description: 'Simmered spiced milk tea with freshly ground spices and a creamy comforting aroma.',
    isPopular: true,
    isVegetarian: true,
    rating: 5.0,
    reviewCount: 110,
    preparationTimeMinutes: 6
  },
  {
    id: 'tea-hot-lemon-ginger-honey',
    name: 'Hot Lemon with Ginger & Honey',
    category: 'tea',
    categoryName: 'Artisan Teas & Infusions',
    price: 100,
    description: 'Fresh lemon juice steeped with crushed mountain ginger root and organic wild bee honey.',
    isVegetarian: true,
    rating: 4.9,
    reviewCount: 58,
    preparationTimeMinutes: 5
  },

  // --- CHICKEN & MANCHURIAN ---
  {
    id: 'main-dragon-chicken',
    name: 'Dragon Chicken',
    category: 'mains',
    categoryName: 'Wok Specialties & Mains',
    price: 400,
    description: 'Crisp fried chicken strips tossed in fiery sweet-spicy chili-ginger garlic sauce with crunchy cashews and capsicum.',
    isSpicy: true,
    isPopular: true,
    rating: 4.9,
    reviewCount: 92,
    preparationTimeMinutes: 15
  },
  {
    id: 'main-chicken-65',
    name: 'South Asian Chicken 65',
    category: 'mains',
    categoryName: 'Wok Specialties & Mains',
    price: 400,
    description: 'Deep-fried chicken pieces marinated in yogurt, curry leaves, ginger, mustard seeds, and red chilies.',
    isSpicy: true,
    rating: 4.8,
    reviewCount: 74,
    preparationTimeMinutes: 14
  },
  {
    id: 'main-gobi-manchurian',
    name: 'Gobi Manchurian',
    category: 'mains',
    categoryName: 'Wok Specialties & Mains',
    price: 300,
    description: 'Crispy batter-fried cauliflower florets tossed in zesty garlic soya scallion reduction.',
    isVegetarian: true,
    rating: 4.7,
    reviewCount: 53,
    preparationTimeMinutes: 14
  },
  {
    id: 'main-chicken-chowmein',
    name: 'Chicken Chowmein',
    category: 'mains',
    categoryName: 'Wok Specialties & Mains',
    price: 155,
    description: 'Street-style wok-fried egg noodles with shredded chicken, cabbage, carrots, bell peppers, and scallions.',
    isPopular: true,
    rating: 4.9,
    reviewCount: 142,
    preparationTimeMinutes: 10
  },
  {
    id: 'main-buff-chowmein',
    name: 'Buff Chowmein',
    category: 'mains',
    categoryName: 'Wok Specialties & Mains',
    price: 140,
    description: 'Wok-tossed noodles with spiced buffalo meat slices, crisp vegetables, and dark soya glaze.',
    rating: 4.8,
    reviewCount: 88,
    preparationTimeMinutes: 10
  },
  {
    id: 'main-chicken-fried-rice',
    name: 'Chicken Fried Rice',
    category: 'mains',
    categoryName: 'Wok Specialties & Mains',
    price: 270,
    description: 'Aromatic basmati rice stir-fried in high heat with tender chicken, scrambled eggs, carrots, and spring onions.',
    isPopular: true,
    rating: 4.8,
    reviewCount: 96,
    preparationTimeMinutes: 12
  },

  // --- HOOKAH / SHISHA LOUNGE ---
  {
    id: 'hookah-double-apple',
    name: 'Double Apple Shisha',
    category: 'hookah',
    categoryName: 'Hookah Lounge',
    price: 350,
    sizePrices: {
      normal: 350,
      cloud: 450
    },
    description: 'Classic rich aniseed and sweet red-green apple vapor. Dense, smooth, and aromatic.',
    isPopular: true,
    rating: 4.9,
    reviewCount: 84,
    preparationTimeMinutes: 8
  },
  {
    id: 'hookah-blue-melon',
    name: 'Blue Melon Cloud',
    category: 'hookah',
    categoryName: 'Hookah Lounge',
    price: 350,
    sizePrices: {
      normal: 350,
      cloud: 450
    },
    description: 'Sweet honeydew and cantaloupe melon blend with cooling blueberry and icy mist.',
    rating: 4.8,
    reviewCount: 66,
    preparationTimeMinutes: 8
  },
  {
    id: 'hookah-mango-ice',
    name: 'Mango Ice Shisha',
    category: 'hookah',
    categoryName: 'Hookah Lounge',
    price: 350,
    sizePrices: {
      normal: 350,
      cloud: 450
    },
    description: 'Ripe tropical mango with an invigorating blast of arctic menthol.',
    rating: 4.8,
    reviewCount: 55,
    preparationTimeMinutes: 8
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Menu' },
  { id: 'pizza', name: 'Pizzas' },
  { id: 'boxes', name: 'Combo Boxes' },
  { id: 'burgers', name: 'Burgers' },
  { id: 'momo', name: 'Mo:Mo Dumplings' },
  { id: 'coffee', name: 'Coffee' },
  { id: 'shakes', name: 'Shakes' },
  { id: 'mains', name: 'Wok & Mains' },
  { id: 'refreshments', name: 'Refreshments' },
  { id: 'tea', name: 'Teas' },
  { id: 'hookah', name: 'Hookah Lounge' },
  { id: 'snacks', name: 'Snacks' }
];
