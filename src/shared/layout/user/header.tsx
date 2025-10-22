import { ROUTES } from '#/shared/constant';
import Link from 'next/link';
import style from 'styled-jsx/style';
import { User, ShoppingCart } from "lucide-react";

export const ROUTES2 = {
  CART: "/cart",
};

export default function HeaderIcons() {
  return (
    <div className="flex items-center gap-x-6">
      <Link href={ROUTES.LOGIN}>
        <User className="w-6.5 h-6.5 hover:text-black transition-all hover:scale-115 duration-300 cursor-pointer border border-black border-2 rounded-full " />
      </Link>
      <Link href={ROUTES2.CART}>
        <ShoppingCart className="w-6 h-6 hover:text-black hover:scale-115 transition-all duration-300 cursor-pointer" />
      </Link>
    </div>
  );
}

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
        <header className="flex items-stretch justify-between px-10 py-5 text-primary text-lg font-semibold" style={{ background: 'var(--background-header)' }}>

       {/* 1 */}
            <Link className="" href={ROUTES.HOME}>
                MyShop
            </Link>

            {/* 2 */}
        <nav className="w-full md:w-auto mt-3 md:mt-0 grid grid-cols-2 gap-2 place-items-center md:flex md:gap-x-10 lg:gap-x-20 xl:gap-x-24 h-full">                
            {navigation?.map((nav, index) => (
                    <Link
                        className="relative px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110 hover:bg-[radial-gradient(ellipse_at_center,rgba(255,240,200,0.8)_0%,rgba(255,240,200,0.34)_90%,transparent_120%)] hover:shadow-[0_0_40px_10px_rgba(255,240,200,0.7)]"
                        id={nav?.id}
                        key={nav?.id || index}
                        href={nav?.url}
                    >
                        {nav?.label}
                    </Link>
                ))}
            </nav>

            {/* 3 */}
            <HeaderIcons />
        </header>
    );
};
