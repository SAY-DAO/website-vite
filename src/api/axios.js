import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
});

// auth removed — no Authorization header

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err),
);

export default api;
