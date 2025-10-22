import api from '#/lib/api-client'
import { Product, ProductListResponse } from './product.type';

export const fetchProducts = async (params: Record<string, any> = {}): Promise<ProductListResponse> => {
    const resp = await api.get(`/api/products`, { params });
    return resp.data;
};

export const fetchProductById = async (id: string): Promise<{ success: boolean; data: Product } > => {
    const resp = await api.get(`/api/products/${id}`);
    return resp.data;
};

export const createProduct = async (payload: Partial<Product>) => {
    const resp = await api.post(`/api/products`, payload);
    return resp.data;
};

export const updateProduct = async (id: string, payload: Partial<Product>) => {
    const resp = await api.put(`/api/products/${id}`, payload);
    return resp.data;
};

export const deleteProduct = async (id: string) => {
    const resp = await api.delete(`/api/products/${id}`);
    return resp.data;
};
