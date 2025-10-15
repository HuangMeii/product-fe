import { User } from '../user/user.type';
import { createContext, useContext } from 'react';

export interface AuthState {
    user: User | null;
    token: string | null;
    initialized?: boolean;
}

export interface AuthContextValue extends AuthState {
    setAuth: (user: User | null, token: string | null) => void;
    logout: () => void;
    login?: (email: string, password: string) => Promise<boolean>;
    register?: (name: string, email: string, password: string, role?: string) => Promise<boolean>;
    checkAuth?: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
