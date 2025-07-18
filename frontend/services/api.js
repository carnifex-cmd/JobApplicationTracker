import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

console.log('🚀 API_URL configured as:', API_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  },
});

// Request interceptor to add auth token and disable caching
api.interceptors.request.use(
  (config) => {
    console.log('🔍 Making API request to:', config.baseURL + config.url);
    console.log('🔍 Request method:', config.method);
    console.log('🔍 Request headers:', config.headers);
    
    // Disable caching for all requests
    config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    config.headers['Pragma'] = 'no-cache';
    config.headers['Expires'] = '0';
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    if (config.method === 'get') {
      config.params = config.params || {};
      config.params._t = timestamp;
    }
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('✅ API response received:', response.status, response.config.url);
    console.log('✅ Response headers:', response.headers);
    return response;
  },
  (error) => {
    console.error('❌ API response error:', error);
    console.error('❌ Error response:', error.response);
    console.error('❌ Error config:', error.config);
    
    const message = error.response?.data?.error || 'An error occurred';
    
    // Handle specific error codes
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }
    
    // Show error toast for non-401 errors
    if (error.response?.status !== 401) {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Applications API
export const applicationsAPI = {
  getAll: (params = {}) => api.get('/applications', { params }),
  getById: (id) => api.get(`/applications/${id}`),
  create: (data) => api.post('/applications', data),
  update: (id, data) => api.put(`/applications/${id}`, data),
  delete: (id) => api.delete(`/applications/${id}`),
  getStats: () => api.get('/applications/stats'),
};

export default api; 