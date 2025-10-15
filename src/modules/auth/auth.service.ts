import axios from 'axios';
import { User, AuthResponse } from '#/modules/user/user.type';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const resp = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
    return resp.data.data;
};

export const register = async (name: string, email: string, password: string, role?: string): Promise<AuthResponse> => {
    const resp = await axios.post(`${API_BASE}/api/auth/register`, { name, email, password, role });
    return resp.data.data;
};

export const setToken = (token: string | null) => {
    if (typeof window !== 'undefined') {
        if (token) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }
};

export const getToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
};

export const logout = () => {
    setToken(null);
};

export const decodeToken = (token: string | null): Partial<User> | null => {
    if (!token) return null;
    try {
        const parts = token.split('.');
        if (parts.length < 2) return null;
        const payload = parts[1];
        // atob is available in browser environment
        const json = JSON.parse(typeof window !== 'undefined' ? atob(payload) : Buffer.from(payload, 'base64').toString());
        // controller signs payload as { id, role, email }
        return { id: json.id, email: json.email, role: json.role } as Partial<User>;
    } catch (err) {
        return null;
    }
};

// Initialize axios auth header on module load (client only)
if (typeof window !== 'undefined') {
    const t = localStorage.getItem('token');
    if (t) axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
}
