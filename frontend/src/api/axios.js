import axios from 'axios';

const api = axios.create({
  baseURL: 'https://charge-app.onrender.com/api',
  withCredentials: true,
});

// Automatically attach token to each request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or sessionStorage if you're using that
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
