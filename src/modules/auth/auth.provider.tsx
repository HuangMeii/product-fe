'use client';

import React, { useEffect, useState } from 'react';
import { AuthContext } from './auth.context';
import { I_User } from '../user/user.model';
import { checkAuth } from './auth.service';

export function AuthProviderClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const [userData, setUserData] = useState<I_User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await checkAuth();
            setUserData(user);
        };

        fetchUser();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user: userData,
                isLoggedIn: !!userData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProviderClient;
