import { Product } from '../product/product.type';

export interface CartItem {
    product: Product | string; // populated product or product id
    name?: string;
    price?: number;
    quantity: number;
}

export interface Cart {
    _id?: string;
    user: string;
    items: CartItem[];
    createdAt?: string;
    updatedAt?: string;
}
