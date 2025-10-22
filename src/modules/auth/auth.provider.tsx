'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { User } from '../user/user.type';
import { AuthContext } from './auth.context';
import * as authService from './auth.service';
import * as userService from '#/modules/user/user.service';

export function AuthProviderClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setTokenState] = useState<string | null>(null);
    const [initialized, setInitialized] = useState(false);

    // Hàm xử lý auth response chung
    const handleAuthSuccess = useCallback(
        (userData: User, tokenValue: string) => {
            authService.setToken(tokenValue);
            setUser(userData);
            setTokenState(tokenValue);
        },
        []
    );

    // Hàm xử lý auth failure chung
    const handleAuthFailure = useCallback(() => {
        authService.logout();
        setUser(null);
        setTokenState(null);
    }, []);

    // Khởi tạo auth khi mount
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = authService.getToken();

            if (!storedToken) {
                setInitialized(true);
                return;
            }

            try {
                const resp = await userService.getMe();
                if (resp?.success && resp.data) {
                    setUser(resp.data as User);
                    setTokenState(storedToken);
                } else {
                    handleAuthFailure();
                }
            } catch (err: any) {
                if ([401, 403].includes(err?.response?.status)) {
                    handleAuthFailure();
                }
            } finally {
                setInitialized(true);
            }
        };

        initAuth();
    }, [handleAuthFailure]);

    // Set auth trực tiếp
    const setAuth = useCallback(
        (u: User | null, t: string | null) => {
            if (u && t) {
                handleAuthSuccess(u, t);
            } else {
                handleAuthFailure();
            }
        },
        [handleAuthSuccess, handleAuthFailure]
    );

    // Logout
    const logout = useCallback(() => {
        handleAuthFailure();
    }, [handleAuthFailure]);

    // Login
    const login = useCallback(
        async (email: string, password: string): Promise<boolean> => {
            try {
                const data = await authService.login(email, password);
                if (data?.token && data?.user) {
                    handleAuthSuccess(data.user as User, data.token);
                    return true;
                }
                return false;
            } catch (err) {
                return false;
            }
        },
        [handleAuthSuccess]
    );

    // Register
    const register = useCallback(
        async (
            name: string,
            email: string,
            password: string,
            role?: string
        ): Promise<boolean> => {
            try {
                const data = await authService.register(
                    name,
                    email,
                    password,
                    role
                );
                if (data?.token && data?.user) {
                    handleAuthSuccess(data.user as User, data.token);
                    return true;
                }
                return false;
            } catch (err) {
                return false;
            }
        },
        [handleAuthSuccess]
    );

    // Check auth
    const checkAuth = useCallback(async (): Promise<boolean> => {
        try {
            const resp = await userService.getMe();
            if (resp?.success && resp.data) {
                setUser(resp.data as User);
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                initialized,
                setAuth,
                logout,
                login,
                register,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProviderClient;
