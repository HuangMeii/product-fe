"use client";

import React, { useEffect, useState } from 'react';
import { User } from '../user/user.type';
import { AuthContext } from './auth.context';
import * as authService from './auth.service';
import * as userService from '#/modules/user/user.service';

export function AuthProviderClient({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const t = authService.getToken();
        if (t) {
            // ensure axios header is set before calling getMe
            authService.setToken(t);
            setToken(t);

            // try to restore user from server
            (async () => {
                try {
                    const resp = await userService.getMe();
                    if (resp?.success && resp.data) {
                        setUser(resp.data as User);
                    } else {
                        // server responded but didn't return user => treat as unauth
                        authService.setToken(null);
                        setToken(null);
                    }
                } catch (err: any) {
                    // Only clear token for auth errors (401/403). For other errors (network), keep token.
                    const status = err?.response?.status;
                    if (status === 401 || status === 403) {
                        authService.setToken(null);
                        setToken(null);
                    }
                }
            })();
        }
    }, []);

    const setAuth = (u: User | null, t: string | null) => {
        setUser(u);
        setToken(t);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setToken(null);
    };

    const login = async (email: string, password: string) => {
        try {
            const data = await authService.login(email, password);
            if (data?.token) {
                authService.setToken(data.token);
                setUser(data.user as User);
                setToken(data.token);
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    };

    const register = async (name: string, email: string, password: string, role?: string) => {
        try {
            const data = await authService.register(name, email, password, role);
            if (data?.token) {
                authService.setToken(data.token);
                setUser(data.user as User);
                setToken(data.token);
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    };

    const checkAuth = async () => {
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
    };

    return (
        <AuthContext.Provider value={{ user, token, setAuth, logout, login, register, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProviderClient;
