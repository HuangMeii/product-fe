import axios from 'axios';
import { I_Auth } from './auth.model';
import { I_User } from '../user/user.model';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const signUp = async ({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}) => {
    // Endpoint: /api/auth/register
    const res = await axios.post(`${API}/api/auth/register`, {
        name,
        email,
        password,
    });
    return res.data?.result as I_Auth;
};

export const checkAuth = async (token: string) => {
    const res = await axios.get(`${API}/api/auth/check-auth`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data?.result as I_User;
};

export const signIn = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
    });
    return res.data?.result as I_Auth;
};
