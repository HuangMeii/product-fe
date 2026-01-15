import { NAVIGATION, ROUTES } from '#/shared/constant';

import Link from 'next/link';
import { User, ShoppingCart, Phone, Mail, Clock } from 'lucide-react';

export const Header = () => {
    
    return (
        <>
            {/* Top bar with gradient */}
            <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 text-slate-700 text-sm py-3 px-4 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center md:justify-between gap-4">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 hover:text-purple-600 transition-colors">
                            <Phone className="size-4" />
                            <span className="font-medium">0123456789</span>
                        </span>
                        <span className="flex items-center gap-2 hover:text-pink-600 transition-colors">
                            <Mail className="size-4" />
                            <span className="font-medium">contact@myshop.com</span>
                        </span>
                    </div>
                    <span className="hidden md:flex items-center gap-2 text-slate-600">
                        <Clock className="size-4" />
                        <span className="font-medium">Giờ mở cửa: 08:00 - 21:00</span>
                    </span>
                </div>
            </div>

            {/* Main header with glass effect */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-lg shadow-purple-100/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo with gradient text */}
                        <Link
                            href={ROUTES.HOME}
                            className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 font-segoe"
                        >
                            Meow-S
                        </Link>

                        {/* Navigation - Desktop with modern styling */}
                        <nav className="hidden md:flex items-center gap-2">
                            {NAVIGATION.map((nav) => (
                                <Link
                                    key={nav.id}
                                    href={nav.url}
                                    className="px-5 py-2.5 text-slate-700 hover:text-purple-600 font-semibold transition-all duration-300 relative group rounded-full hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                                >
                                    {nav.label}
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-3/4 rounded-full" />
                                </Link>
                            ))}
                        </nav>

                        {/* Icons with modern design */}
                        <div className="flex items-center gap-3">
                            <Link
                                href={ROUTES.SIGN_IN}
                                className="p-3 text-slate-700 hover:text-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-200/50 hover:scale-105"
                                aria-label="User account"
                            >
                                <User className="size-5" />
                            </Link>
                            <Link
                                href={ROUTES.CART}
                                className="p-3 text-slate-700 hover:text-pink-600 bg-gradient-to-br from-pink-50 to-blue-50 hover:from-pink-100 hover:to-blue-100 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-pink-200/50 hover:scale-105 relative"
                                aria-label="Shopping cart"
                            >
                                <ShoppingCart className="size-5" />
                                {/* Optional: Cart badge */}
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full size-5 flex items-center justify-center shadow-lg">3</span>
                            </Link>
                        </div>
                    </div>

                    {/* Navigation - Mobile with improved spacing */}
                    <nav className="md:hidden flex items-center justify-center gap-1 pb-4 border-t border-purple-100 pt-4">
                        {NAVIGATION.map((nav) => (
                            <Link
                                key={nav.id}
                                href={nav.url}
                                className="px-4 py-2 text-sm text-slate-700 hover:text-purple-600 font-semibold transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                            >
                                {nav.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>
        </>
    );
};