'use client'

import React, { useEffect, useState } from 'react'
import { fetchProducts } from '#/modules/product/product.service'
import { Product } from '#/modules/product'
import { ProductCard } from '#/shared/component'
import { ShoppingBag } from 'lucide-react'

export default function Home() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts()
            .then((resp) => setProducts(resp?.data || []))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="min-h-screen bg-white text-black">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-center mb-10">
                    <ShoppingBag size={32} className="text-black mr-2" />
                    <h1 className="text-3xl font-bold tracking-tight">Our Products</h1>
                </div>

                {loading ? (
                    <div className="text-center text-gray-500 py-16 animate-pulse">
                        Loading products...
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-center text-gray-500 py-16">No products found.</p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((p) => (
                            <ProductCard key={p._id || p.name} product={p} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}
