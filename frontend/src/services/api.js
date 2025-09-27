import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  getAll: () => api.get('/products'),
  
  getById: (id) => api.get(`/products/${id}`),
  
  getByCategory: (categoryId) => api.get(`/products/category/${categoryId}`),
  
  search: (query) => api.get(`/products/search?q=${encodeURIComponent(query)}`),
  
  getAvailable: () => api.get('/products/available'),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  
  getById: (id) => api.get(`/categories/${id}`),
  
  search: (name) => api.get(`/categories/search?name=${encodeURIComponent(name)}`),
  
  create: (category) => api.post('/categories', category),
  
  update: (id, category) => api.put(`/categories/${id}`, category),
  
  delete: (id) => api.delete(`/categories/${id}`),
};

// Cart API
export const cartAPI = {
  getItems: (userId) => api.get(`/cart/${userId}`),
  
  addItem: (userId, productId, quantity = 1) =>
    api.post(`/cart/${userId}/add?productId=${productId}&quantity=${quantity}`),
  
  updateItem: (userId, productId, quantity) =>
    api.put(`/cart/${userId}/update?productId=${productId}&quantity=${quantity}`),
  
  removeItem: (userId, productId) =>
    api.delete(`/cart/${userId}/remove?productId=${productId}`),
  
  clear: (userId) => api.delete(`/cart/${userId}/clear`),
  
  getTotal: (userId) => api.get(`/cart/${userId}/total`),
  
  getCount: (userId) => api.get(`/cart/${userId}/count`),
};

// Orders API
export const ordersAPI = {
  create: (userId, shippingAddress) =>
    api.post(`/orders/${userId}?shippingAddress=${encodeURIComponent(shippingAddress)}`),
  
  getUserOrders: (userId, page = 0, size = 10) =>
    api.get(`/orders/${userId}?page=${page}&size=${size}`),
  
  getById: (orderId) => api.get(`/orders/order/${orderId}`),
  
  updateStatus: (orderId, status) =>
    api.put(`/orders/${orderId}/status?status=${status}`),
  
  getByStatus: (status) => api.get(`/orders/status/${status}`),
  
  getHighValue: (minAmount) => api.get(`/orders/high-value?minAmount=${minAmount}`),
  
  getUserOrderCount: (userId) => api.get(`/orders/${userId}/count`),
  
  getUserTotalSpent: (userId) => api.get(`/orders/${userId}/total-spent`),
};

export default api;
