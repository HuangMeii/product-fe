import { ROUTES } from '#/shared/constant';
import Link from 'next/link';
import { User, ShoppingCart } from 'lucide-react';

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
        <>
            {/* sub header */}
            <div className="text-center bg-amber-100">
                Giờ Mở Cửa : 08-00 AM - 900 PM | Thứ Ngày : 0123456789 | Email :
            </div>

            {/* header - sticky ở top */}
            <header className="sticky top-0 z-50 flex w-full items-center justify-between px-10 py-5 text-primary text-lg font-semibold bg-gradient-to-r from-[#fbb8b8] to-[#ececec] shadow-lg">
                {/* 1 */}
                <div className="flex flex-col items-center justify-between gap-y-4">
                    <Link className="" href={ROUTES.HOME}>
                        MyShop
                    </Link>
                    <div className="flex items-center gap-x-6 md:hidden">
                        <Link href={ROUTES.LOGIN}>
                            <User className="size-6 hover:text-black transition-all hover:scale-115 duration-300 cursor-pointer border-black rounded-full" />
                        </Link>
                        <Link href={ROUTES.CART}>
                            <ShoppingCart className="size-6 hover:text-black hover:scale-115 transition-all duration-300 cursor-pointer" />
                        </Link>
                    </div>
                </div>

                {/* 2 */}
                <nav className="w-full md:w-auto md:mt-0 grid grid-cols-2 place-items-center md:flex md:gap-x-10 lg:gap-x-20 xl:gap-x-24 h-full gap-2">
                    {navigation?.map((nav, index) => (
                        <Link
                            className="relative rounded-lg transition-all duration-300 hover:scale-110 hover:bg-[radial-gradient(ellipse_at_center,rgba(255,240,200,0.8)_0%,rgba(255,240,200,0.34)_90%,transparent_120%)] hover:shadow-[0_0_40px_10px_rgba(255,240,200,0.7)]"
                            id={nav?.id}
                            key={nav?.id || index}
                            href={nav?.url}
                        >
                            {nav?.label}
                        </Link>
                    ))}
                </nav>

                <div className="items-center gap-x-6 hidden md:flex">
                    <Link href={ROUTES.LOGIN}>
                        <User className="size-6.5 hover:text-black transition-all hover:scale-115 duration-300 cursor-pointer border-black border-2 rounded-full" />
                    </Link>
                    <Link href={ROUTES.CART}>
                        <ShoppingCart className="size-6 hover:text-black hover:scale-115 transition-all duration-300 cursor-pointer" />
                    </Link>
                </div>
            </header>
        </>
    );
};
