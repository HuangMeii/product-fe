import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
export const TOKEN_KEY = 'token_product';

const instantAxios = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: tự động gắn token vào mỗi request (client only)
instantAxios.interceptors.request.use(
    (config) => {
        try {
            if (typeof window !== 'undefined' && config.headers) {
                const token = localStorage.getItem(TOKEN_KEY);
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                } else {
                    delete config.headers['Authorization'];
                }
            }
        } catch (err) {
            // Bỏ qua lỗi storage
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: xóa token khi gặp lỗi 401/403
instantAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
            try {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem(TOKEN_KEY);
                    delete instantAxios.defaults.headers.common['Authorization'];
                }
            } catch (e) {
                // Bỏ qua lỗi storage
            }
        }

        return Promise.reject(error);
    }
);

export default instantAxios;
