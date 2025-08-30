import axios from 'axios';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // For Better-Auth sessions
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
api.interceptors.request.use(
  (config) => {
    // Better-Auth handles session cookies automatically
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data; // Return just the data portion
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

// API Endpoints
export const authAPI = {
  signUp: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/sign-up/email', data),
  signIn: (data: { email: string; password: string }) =>
    api.post('/auth/sign-in/email', data),
  signOut: () => api.post('/auth/sign-out'),
  getSession: () => api.get('/auth/session'),
};

export const usersAPI = {
  getProfile: (userId: string) => api.get(`/users/profile/${userId}`),
  getMe: () => api.get('/users/me'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  getUserItems: (userId: string, params?: any) => api.get(`/users/${userId}/items`, { params }),
  getUserTrades: (userId: string) => api.get(`/users/${userId}/trades`),
  getUserReviews: (userId: string) => api.get(`/users/${userId}/reviews`),
  searchUsers: (params: any) => api.get('/users/search', { params }),
  getLeaderboard: () => api.get('/users/leaderboard'),
};

export const itemsAPI = {
  getItems: (params?: any) => api.get('/items', { params }),
  getItem: (itemId: string) => api.get(`/items/${itemId}`),
  createItem: (data: FormData) => api.post('/items', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateItem: (itemId: string, data: FormData) => api.put(`/items/${itemId}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteItem: (itemId: string) => api.delete(`/items/${itemId}`),
  updateItemStatus: (itemId: string, status: string) => 
    api.put(`/items/${itemId}/status`, { status }),
};

export const tradesAPI = {
  createRequest: (data: { requested_item_id: string; offered_item_id: string }) =>
    api.post('/trades/request', data),
  acceptRequest: (requestId: string) => api.post(`/trades/accept/${requestId}`),
  rejectRequest: (requestId: string) => api.post(`/trades/reject/${requestId}`),
  completeTrade: (tradeId: string) => api.post(`/trades/complete/${tradeId}`),
  cancelTrade: (tradeId: string) => api.post(`/trades/cancel/${tradeId}`),
  getMyTrades: () => api.get('/trades/my-trades'),
  getReceivedRequests: () => api.get('/trades/requests/received'),
  getSentRequests: (params?: any) => api.get('/trades/requests/sent', { params }),
};

export const ratingsAPI = {
  createRating: (data: { trade_id: string; reviewee_id: string; rating: number; comment?: string }) =>
    api.post('/ratings', data),
  updateRating: (ratingId: string, data: { rating?: number; comment?: string }) =>
    api.put(`/ratings/${ratingId}`, data),
  deleteRating: (ratingId: string) => api.delete(`/ratings/${ratingId}`),
  getUserRatings: (userId: string) => api.get(`/ratings/user/${userId}`),
  getRatingStats: (userId: string) => api.get(`/ratings/stats/${userId}`),
};