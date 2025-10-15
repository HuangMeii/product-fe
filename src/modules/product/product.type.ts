export interface Product {
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

export interface ProductListResponse {
    success: boolean;
    data: Product[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}
