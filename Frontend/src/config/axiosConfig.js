import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL
});

// ✅ Add token to every request automatically
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-access-token'] = token; // matches your isAuthenticated middleware
    }
    return config;
});

export default axiosInstance;