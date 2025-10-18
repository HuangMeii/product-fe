import { ROUTES } from '#/shared/constant';
import Link from 'next/link';

export const Header = () => {
    const navigation = [
        {
            id: '1',
            label: 'Home',
            url: '/',
        },
        {
            id: '2',
            label: 'Products',
            url: '/product',
        },
        {
            id: '3',
            label: 'About',
            url: '/about',
        },
        {
            id: '4',
            label: 'Contact',
            url: '/contact',
        },
    ];

    return (
        <header className="flex justify-between px-10 py-5 bg-primary text-white text-lg items-center">
            {/* 1 */}
            <Link className="" href={ROUTES.HOME}>
                MyShop
            </Link>

            {/* 2 */}
            <nav className="hidden md:flex md:gap-x-10 lg:gap-x-20 xl:gap-x-24">
                {navigation?.map((nav, index) => (
                    <Link
                        className="hover:underline hover:scale-110 transition-all duration-300"
                        id={nav?.id}
                        key={nav?.id || index}
                        href={nav?.url}
                    >
                        {nav?.label}
                    </Link>
                ))}
            </nav>

            {/* 3 */}
            <Link
                className="bg-blue-600 px-6 py-1 rounded-full shadow-black hover:shadow-lg transition-all duration-300"
                href={ROUTES.LOGIN}
            >
                Login
            </Link>
        </header>
    );
};
