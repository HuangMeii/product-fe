import { createContext, useContext } from 'react';

import { I_User } from '../user/user.model';

export interface AuthState {
    user: I_User | null;
    isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
