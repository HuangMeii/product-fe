export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'client';
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
