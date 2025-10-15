import axios from 'axios';
import { Product, ProductListResponse } from './product.type';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export const fetchProducts = async (params: Record<string, any> = {}): Promise<ProductListResponse> => {
    const resp = await axios.get(`${API_BASE}/api/products`, { params });
    return resp.data;
};

export const fetchProductById = async (id: string): Promise<{ success: boolean; data: Product } > => {
    const resp = await axios.get(`${API_BASE}/api/products/${id}`);
    return resp.data;
};

export const createProduct = async (payload: Partial<Product>) => {
    const resp = await axios.post(`${API_BASE}/api/products`, payload);
    return resp.data;
};

export const updateProduct = async (id: string, payload: Partial<Product>) => {
    const resp = await axios.put(`${API_BASE}/api/products/${id}`, payload);
    return resp.data;
};

export const deleteProduct = async (id: string) => {
    const resp = await axios.delete(`${API_BASE}/api/products/${id}`);
    return resp.data;
};
