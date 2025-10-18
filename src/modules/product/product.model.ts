export interface I_Product {
    _id?: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    image?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
