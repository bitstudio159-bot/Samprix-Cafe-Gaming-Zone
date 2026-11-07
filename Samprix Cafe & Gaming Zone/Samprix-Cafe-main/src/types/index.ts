export type CategoryId = 
  | 'all'
  | 'pizza'
  | 'boxes'
  | 'burgers'
  | 'momo'
  | 'coffee'
  | 'refreshments'
  | 'shakes'
  | 'tea'
  | 'mains'
  | 'hookah'
  | 'snacks';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  price: number;
  sizePrices?: {
    small?: number;
    medium?: number;
    large?: number;
    comboSmall?: number;
    comboMedium?: number;
    comboLarge?: number;
    normal?: number;
    cloud?: number;
  };
  description: string;
  image?: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  rating: number;
  reviewCount: number;
  preparationTimeMinutes: number;
}

export interface CartItem {
  id: string; // unique cart line id
  menuItem: MenuItem;
  size?: 'Regular' | 'Small' | 'Medium' | 'Large' | 'Normal' | 'Cloud' | 'Combo (Chips & Drink)';
  price: number;
  quantity: number;
  instructions?: string;
}

export type OrderStatus = 
  | 'received' 
  | 'preparing' 
  | 'in_oven_grill' 
  | 'ready' 
  | 'out_for_delivery' 
  | 'completed' 
  | 'cancelled';

export interface TrackingStep {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  deliveryType: 'dine-in' | 'takeaway' | 'delivery';
  tableNumber?: string;
  deliveryAddress?: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'esewa' | 'khalti' | 'card' | 'cash';
  paymentStatus: 'paid' | 'pending';
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  timeline: TrackingStep[];
}

export type ReservationZone = 
  | 'esports_arena' 
  | 'ps5_battlestation' 
  | 'cafe_lounge' 
  | 'vip_booth' 
  | 'hookah_cloud_deck';

export interface Reservation {
  id: string;
  reservationNumber: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  zone: ReservationZone;
  gamingHours?: number;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'seated' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface UserReview {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  itemRecommended: string;
  verifiedVisit: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
  content: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'gaming' | 'menu' | 'booking';
}

export interface UserLoyalty {
  xp: number;
  level: number;
  tier: 'Novice Gamer' | 'Bronze Grinder' | 'Silver Legend' | 'Gold Master' | 'Samprix Royal VIP';
  coffeeBeansEarned: number;
  gamingHoursLogged: number;
  milestones: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    xpReward: number;
    icon: string;
  }[];
  unlockedPerks: string[];
}
