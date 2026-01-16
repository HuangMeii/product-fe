import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const deleteUser = async (userId: string, token: string) => {
    // Endpoint: /api/users/:id
    const res = await axios.delete(`${API}/api/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data?.result as { message: string };
};

export const updateUser = async (userId: string, token: string, userData: Partial<{name: string; email: string; isActive: boolean;}>) => {
    // Endpoint: /api/users/:id

    const res = await axios.put(`${API}/api/users/${userId}`, userData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data?.result as { message: string };
};
