import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // only if you're using cookies/session
});

// Example usage
export const getAllProducts = () => API.get('/api/products');
export const createOrder = (orderData) => API.post('/api/orders', orderData);
