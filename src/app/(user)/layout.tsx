'use client';
import { Header } from '#/shared/layout/user';
import Carousel from '#/shared/layout/user/card';
import SignupToSDT from '#/shared/layout/user/signupToSDT';
import Signup from '#/shared/layout/user/signup';
import { Meow } from '#/shared/layout/user/meow';
import CustomCursor from '#/shared/layout/user/CustomCursor';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <CustomCursor />
            <Header />
            <Meow />
            <Carousel />
            <Signup />
            {/* <SignupToSDT /> */}
            <main className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>
        </>
    );
}
