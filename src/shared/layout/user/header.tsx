'use client'

import Link from 'next/link'
import { ShoppingCart, User as UserIcon, LogOut } from 'lucide-react'
import { ROUTES } from '#/shared/contants'
import { useAuth } from '#/modules/auth/auth.context'
import { useState, useRef, useEffect } from 'react'

export const Header = () => {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onDoc = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('click', onDoc);
        return () => document.removeEventListener('click', onDoc);
    }, []);

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900 tracking-tight">
                            Shop<span className="text-black">Now</span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {[
                            { name: 'Home', href: '/' },
                            { name: 'Products', href: '/products' },
                            { name: 'About', href: '/about' },
                            { name: 'Contact', href: '/contact' },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-black font-medium transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        {!user ? (
                            <Link
                                href={ROUTES.LOGIN}
                                className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                            >
                                <UserIcon size={18} />
                                <span>Login</span>
                            </Link>
                        ) : (
                            <div className="relative" ref={menuRef}>
                                <Link href="/user/profile" className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition-colors">
                                    {
                                        user.name
                                    }
                                    <UserIcon size={18} />
                                </Link>


                                {open && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-sm z-50">
                                        <Link href="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                                        <button onClick={() => { logout(); setOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"><LogOut size={16} /> Logout</button>
                                    </div>
                                )}
                            </div>
                        )}

                        <Link
                            href="/cart"
                            className="relative text-gray-700 hover:text-black transition-colors"
                        >
                            <ShoppingCart size={22} />
                            <span className="absolute -top-1.5 -right-2 bg-black text-white text-xs rounded-full px-1.5">
                                2
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
