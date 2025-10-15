'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export const Footer = () => {
    return (
        <footer className="bg-black text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Logo & About */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">ShopNow</h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Your trusted destination for quality products and fast delivery.
                        Discover deals and shop your favorites today.
                    </p>
                </div>

                {/* Products */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Products</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/products" className="hover:text-white transition-colors">
                                All Products
                            </Link>
                        </li>
                        <li>
                            <Link href="/categories/new" className="hover:text-white transition-colors">
                                New Arrivals
                            </Link>
                        </li>
                        <li>
                            <Link href="/categories/sale" className="hover:text-white transition-colors">
                                On Sale
                            </Link>
                        </li>
                        <li>
                            <Link href="/categories/best" className="hover:text-white transition-colors">
                                Best Sellers
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/faq" className="hover:text-white transition-colors">
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link href="/shipping" className="hover:text-white transition-colors">
                                Shipping Info
                            </Link>
                        </li>
                        <li>
                            <Link href="/returns" className="hover:text-white transition-colors">
                                Returns & Refunds
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-white transition-colors">
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Socials */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <Link href="#" className="hover:text-white transition-colors">
                            <Facebook size={20} />
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            <Instagram size={20} />
                        </Link>
                        <Link href="#" className="hover:text-white transition-colors">
                            <Twitter size={20} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="border-t border-gray-800 mt-8">
                <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} ShopNow. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
