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
    const { token, user, checkAuth } = useAuth();

    const [checking, setChecking] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            const isPrivate = PRIVATES_ROUTES.some((r) => pathname?.startsWith(r));
            if (!isPrivate) {
                if (mounted) setChecking(false);
                return;
            }

            // not logged in => redirect home
            if (!token) {
                router.push(ROUTES.HOME);
                return;
            }

            // have token but no user in context => try to hydrate
            if (token && !user && checkAuth) {
                const ok = await checkAuth();
                if (!ok) {
                    router.push(ROUTES.HOME);
                    return;
                }
            }

            // admin-only check
            if (pathname?.startsWith(ROUTES.ADMIN) && user?.role !== 'admin') {
                router.push(ROUTES.HOME);
                return;
            }

            if (mounted) setChecking(false);
        })();

        return () => {
            mounted = false;
        };
    }, [pathname, token, user, checkAuth, router]);

    if (checking) return null;

    return <>{children}</>;
}
