import api from '#/lib/api-client'
import { Cart } from './cart.type';

export const getCart = async (): Promise<{ success: boolean; data: Cart } > => {
    const resp = await api.get(`/api/cart`);
    return resp.data;
};

export const addItem = async (item: { productId: string; quantity?: number }) => {
    const resp = await api.post(`/api/cart`, { productId: item.productId, quantity: item.quantity || 1 });
    return resp.data;
};

export const updateItem = async (productId: string, quantity: number) => {
    const resp = await api.put(`/api/cart/${productId}`, { quantity });
    return resp.data;
};

export const removeItem = async (productId: string) => {
    const resp = await api.delete(`/api/cart/${productId}`);
    return resp.data;
};

export const clearCart = async () => {
    const resp = await api.delete(`/api/cart`);
    return resp.data;
};
