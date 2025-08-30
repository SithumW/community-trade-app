import { Item, User, Trade, TradeRequest, Rating } from './types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    image: '/api/placeholder/150/150',
    latitude: 40.7128,
    longitude: -74.0060,
    bio: 'Passionate about sustainable living and community building. Love trading books, home goods, and electronics!',
    loyalty_points: 450,
    badge: 'GOLD',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-08-30T10:00:00Z',
    _count: { items: 12, trades: 15, reviews: 18 }
  },
  {
    id: 'user2',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    image: '/api/placeholder/150/150',
    latitude: 40.7589,
    longitude: -73.9851,
    bio: 'Tech enthusiast and minimalist. Always looking to trade gadgets and keep only what I truly need.',
    loyalty_points: 280,
    badge: 'SILVER',
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-08-29T10:00:00Z',
    _count: { items: 8, trades: 9, reviews: 11 }
  },
  {
    id: 'user3',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    image: '/api/placeholder/150/150',
    latitude: 40.6892,
    longitude: -74.0445,
    bio: 'Creative soul who loves crafting and upcycling. Trading art supplies, books, and handmade items.',
    loyalty_points: 620,
    badge: 'DIAMOND',
    createdAt: '2023-11-10T10:00:00Z',
    updatedAt: '2024-08-30T10:00:00Z',
    _count: { items: 20, trades: 25, reviews: 30 }
  }
];

// Mock Items
export const mockItems: Item[] = [
  {
    id: 'item1',
    user_id: 'user1',
    title: 'Vintage Leather Jacket',
    description: 'Beautiful vintage leather jacket in excellent condition. Size Medium. Perfect for someone who appreciates classic style and quality craftsmanship.',
    category: 'Fashion',
    condition: 'GOOD',
    status: 'AVAILABLE',
    latitude: 40.7128,
    longitude: -74.0060,
    posted_at: '2024-08-25T10:00:00Z',
    images: [
      { id: 'img1', item_id: 'item1', url: '/api/placeholder/400/300' }
    ],
    user: mockUsers[0],
    _count: { trade_requests_for: 3 }
  },
  {
    id: 'item2',
    user_id: 'user2',
    title: 'MacBook Air 2020',
    description: 'MacBook Air 2020, 13-inch, 8GB RAM, 256GB SSD. Great condition, barely used. Includes original charger and box.',
    category: 'Electronics',
    condition: 'GOOD',
    status: 'AVAILABLE',
    latitude: 40.7589,
    longitude: -73.9851,
    posted_at: '2024-08-28T14:30:00Z',
    images: [
      { id: 'img2', item_id: 'item2', url: '/api/placeholder/400/300' }
    ],
    user: mockUsers[1],
    _count: { trade_requests_for: 5 }
  },
  {
    id: 'item3',
    user_id: 'user3',
    title: 'Professional Art Supply Set',
    description: 'Complete professional art supply set including watercolors, brushes, canvases, and more. Perfect for budding artists or professionals.',
    category: 'Art & Crafts',
    condition: 'NEW',
    status: 'AVAILABLE',
    latitude: 40.6892,
    longitude: -74.0445,
    posted_at: '2024-08-29T09:15:00Z',
    images: [
      { id: 'img3', item_id: 'item3', url: '/api/placeholder/400/300' }
    ],
    user: mockUsers[2],
    _count: { trade_requests_for: 2 }
  },
  {
    id: 'item4',
    user_id: 'user1',
    title: 'Organic Garden Starter Kit',
    description: 'Everything you need to start your own organic garden! Includes seeds, soil, planters, and a comprehensive growing guide.',
    category: 'Garden & Outdoor',
    condition: 'NEW',
    status: 'AVAILABLE',
    posted_at: '2024-08-30T08:00:00Z',
    images: [
      { id: 'img4', item_id: 'item4', url: '/api/placeholder/400/300' }
    ],
    user: mockUsers[0],
    _count: { trade_requests_for: 1 }
  },
  {
    id: 'item5',
    user_id: 'user2',
    title: 'Board Game Collection',
    description: 'Collection of popular board games including Settlers of Catan, Ticket to Ride, and Splendor. All in excellent condition with complete pieces.',
    category: 'Games & Toys',
    condition: 'GOOD',
    status: 'AVAILABLE',
    posted_at: '2024-08-29T16:45:00Z',
    images: [
      { id: 'img5', item_id: 'item5', url: '/api/placeholder/400/300' }
    ],
    user: mockUsers[1],
    _count: { trade_requests_for: 4 }
  },
  {
    id: 'item6',
    user_id: 'user3',
    title: 'Handmade Ceramic Dinnerware Set',
    description: 'Beautiful handmade ceramic dinnerware set for 4 people. Each piece is unique with a rustic, earthy design. Perfect for special occasions.',
    category: 'Home & Kitchen',
    condition: 'NEW',
    status: 'AVAILABLE',
    posted_at: '2024-08-27T12:20:00Z',
    images: [
      { id: 'img6', item_id: 'item6', url: '/api/placeholder/400/300' }
    ],
    user: mockUsers[2],
    _count: { trade_requests_for: 2 }
  }
];

// Categories for filtering
export const categories = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Books & Media',
  'Sports & Outdoors',
  'Art & Crafts',
  'Games & Toys',
  'Garden & Outdoor',
  'Tools & Hardware',
  'Music & Instruments'
];

// Badge info
export const badgeInfo = {
  BRONZE: { name: 'Bronze Trader', color: 'badge-bronze', points: '0-99' },
  SILVER: { name: 'Silver Trader', color: 'badge-silver', points: '100-299' },
  GOLD: { name: 'Gold Trader', color: 'badge-gold', points: '300-599' },
  DIAMOND: { name: 'Diamond Trader', color: 'badge-diamond', points: '600-999' },
  RUBY: { name: 'Ruby Trader', color: 'badge-ruby', points: '1000+' }
};