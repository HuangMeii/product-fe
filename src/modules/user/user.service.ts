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
