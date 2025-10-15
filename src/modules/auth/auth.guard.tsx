"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './auth.context';
import { PRIVATES_ROUTES, ROUTES } from '#/shared/contants';

type Props = {
    children: React.ReactNode;
    requireAuth?: boolean;
    requiredRole?: string;
};

export default function AuthGuard({ children }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { token, user, checkAuth, initialized } = useAuth();

    useEffect(() => {
        // don't act until provider finished initialization
        if (!initialized) return;

        const isPrivate = PRIVATES_ROUTES.some((r) => pathname?.startsWith(r));
        if (!isPrivate) return;

        // not logged in => redirect home
        if (!token) {
            router.push(ROUTES.HOME);
            return;
        }

        // admin-only check
        if (pathname?.startsWith(ROUTES.ADMIN) && user?.role !== 'admin') {
            router.push(ROUTES.HOME);
            return;
        }

        // if token exists but user missing, try hydrate once
        (async () => {
            if (token && !user && checkAuth) {
                const ok = await checkAuth();
                if (!ok) router.push(ROUTES.HOME);
            }
        })();
    }, [initialized, pathname, token, user, checkAuth, router]);

    return <>{children}</>;
}
