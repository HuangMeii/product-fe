import axios from 'axios';
import { Cart } from './cart.type';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000';

export const getCart = async (): Promise<{ success: boolean; data: Cart } > => {
    const resp = await axios.get(`${API_BASE}/api/cart`);
    return resp.data;
};

export const addItem = async (item: { productId: string; quantity?: number }) => {
    const resp = await axios.post(`${API_BASE}/api/cart`, { productId: item.productId, quantity: item.quantity || 1 });
    return resp.data;
};

export const updateItem = async (productId: string, quantity: number) => {
    const resp = await axios.put(`${API_BASE}/api/cart/${productId}`, { quantity });
    return resp.data;
};

export const removeItem = async (productId: string) => {
    const resp = await axios.delete(`${API_BASE}/api/cart/${productId}`);
    return resp.data;
};

export const clearCart = async () => {
    const resp = await axios.delete(`${API_BASE}/api/cart`);
    return resp.data;
};
