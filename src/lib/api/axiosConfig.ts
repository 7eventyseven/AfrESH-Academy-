import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                const { token } = JSON.parse(userInfo);
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Treat 503/500 on GET /courses and GET /portfolio as success with empty array (e.g. DB not configured)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const url = (error?.config?.url ?? '').replace(/^\//, '');
        const method = error?.config?.method?.toLowerCase();
        const status = error?.response?.status;
        const isGetList = method === 'get' && (url === 'courses' || url === 'portfolio') && (status === 503 || status === 500);
        if (isGetList) {
            return Promise.resolve({ data: [] });
        }
        return Promise.reject(error);
    }
);

export default api;
