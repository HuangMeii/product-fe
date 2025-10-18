import { Header } from '#/shared/layout/user';

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>
        </>
    );
}
