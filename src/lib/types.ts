// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  bio?: string;
  loyalty_points: number;
  badge: Badge;
  createdAt: string;
  updatedAt: string;
  _count?: {
    items: number;
    trades: number;
    reviews: number;
  };
}

export type Badge = 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND' | 'RUBY';

// Item Types
export interface Item {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  condition: ItemCondition;
  status: ItemStatus;
  latitude?: number;
  longitude?: number;
  posted_at: string;
  images: ItemImage[];
  user: User;
  _count?: {
    trade_requests_for: number;
  };
}

export interface ItemImage {
  id: string;
  item_id: string;
  url: string;
}

export type ItemCondition = 'NEW' | 'GOOD' | 'FAIR' | 'POOR';
export type ItemStatus = 'AVAILABLE' | 'RESERVED' | 'SWAPPED' | 'REMOVED';

// Trade Types
export interface TradeRequest {
  id: string;
  requested_item_id: string;
  offered_item_id: string;
  requester_id: string;
  status: TradeRequestStatus;
  requested_at: string;
  requested_item: Item;
  offered_item: Item;
  requester: User;
}

export interface Trade {
  id: string;
  trade_request_id: string;
  requested_item_id: string;
  offered_item_id: string;
  requester_id: string;
  owner_id: string;
  location?: string;
  status: TradeStatus;
  completed_at?: string;
  created_at: string;
  requested_item: Item;
  offered_item: Item;
  requester: User;
  owner: User;
  trade_request: {
    requested_at: string;
  };
}

export type TradeRequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
export type TradeStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

// Rating Types
export interface Rating {
  id: string;
  trade_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  trade: Trade;
  reviewer: User;
  reviewee: User;
}

export interface RatingStats {
  average_rating: number;
  total_ratings: number;
  rating_distribution: {
    [key: string]: number;
  };
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}

export interface APIError {
  success: false;
  status: 'error';
  message: string;
  errorCode: string;
  timestamp: string;
  statusCode: number;
  errors?: {
    field: string;
    message: string;
    value: any;
  }[];
}

// UI State Types
export interface FilterState {
  category?: string;
  condition?: ItemCondition[];
  search?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}