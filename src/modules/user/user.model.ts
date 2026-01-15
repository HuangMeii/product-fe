export enum E_UserRole {
    ADMIN = 'admin',
    CLIENT = 'client',
}

export interface I_User {
    _id: string;
    name: string;
    email: string;
    role: E_UserRole;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
