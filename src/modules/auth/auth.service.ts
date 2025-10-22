import api from '#/lib/api-client';
import { AuthResponse } from '#/modules/user/user.type';

const TOKEN_KEY = 'token';

export const login = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    const { data } = await api.post(`/api/auth/login`, { email, password });
    return data.data;
};

export const register = async (
    name: string,
    email: string,
    password: string,
    role?: string
): Promise<AuthResponse> => {
    const { data } = await api.post(`/api/auth/register`, {
        name,
        email,
        password,
        role,
    });
    return data.data;
};

export const setToken = (token: string | null): void => {
    if (typeof window === 'undefined') return;

    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem(TOKEN_KEY);
        delete api.defaults.headers.common['Authorization'];
    }
};

export const getToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
};

export const logout = (): void => {
    setToken(null);
};

// Khởi tạo token khi module được load (chỉ client)
if (typeof window !== 'undefined') {
    const token = getToken();
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}
