// Thư viện để call api
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const getProducts = async () => {
    // Endpoint: /api/products
    const res = await axios.get(`${API}/api/products`);
    return res.data;
};

