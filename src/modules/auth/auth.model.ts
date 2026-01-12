// Thư viện để call api
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const signUp = async ({
    name,
    email,
    password
}:{
    name: string;
    email: string;
    password: string;
}) => {
    // Endpoint: /api/auth/register
    const res = await axios.post(`${API}/api/auth/register`, {
        name,
        email,
        password
    });
    return res.data;
};

