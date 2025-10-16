'use client'

import React, { useState } from 'react'
import { Product } from '#/modules/product'
import Link from 'next/link'
import { slugify } from '../utils'
import { ShoppingCart, Heart } from 'lucide-react'
import * as cartService from '#/modules/cart/cart.service'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import { cn } from '../utils'

export const ProductCard = ({ product }: { product: Product }) => {
    const [src, setSrc] = useState<string | undefined>(product.image || '/images/placeholder.svg')
    const [adding, setAdding] = useState(false)
    const [added, setAdded] = useState(false)

    const handleAdd = async (e?: React.MouseEvent) => {
        // prevent parent Link navigation when clicking add-to-cart
        e?.stopPropagation()
        e?.preventDefault()
        if (adding || product.stock <= 0) return
        setAdding(true)
            try {
                await cartService.addItem({ productId: product._id?.toString?.() ?? '', quantity: 1 })
                setAdded(true)
                toast.success('Đã thêm vào giỏ')
                setTimeout(() => setAdded(false), 1400)
            } catch (err: any) {
                toast.error(err?.response?.data?.message || 'Thêm vào giỏ thất bại')
            } finally {
                setAdding(false)
            }
    }

    const slug = `${product._id}-${slugify(product.name)}`

    return (
        <Link href={`/product/${slug}`} className="group block">
            <div className="relative overflow-hidden">
                {
                    src ? (
                        <Image
                            src={src}
                            alt={product.name}
                            width={400}
                            height={400}
                            loading='lazy'
                            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={() => setSrc('/images/placeholder.svg')}
                        />
                    ) : (
                        <div className="w-full h-56 bg-gray-100" />
                    )
                }

                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => { e.stopPropagation(); }} className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                            <Heart size={18} className="text-gray-800" />
                        </button>
                        <button onClick={handleAdd} className={cn('p-2 cursor-pointer rounded-full shadow', product.stock > 0 ? 'bg-black hover:bg-gray-800' : 'bg-gray-200 cursor-not-allowed') }>
                            {adding ? (
                                <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                            ) : added ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                <ShoppingCart size={18} className="text-white" />
                            )}
                        </button>
                    </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-black">
                        ${product.price?.toFixed?.(2) ?? product.price}
                    </span>
                    <span
                        className={cn('text-sm font-medium', product.stock > 0 ? 'text-green-600' : 'text-red-500')}
                    >
                        {product.stock > 0 ? 'In stock' : 'Out of stock'}
                    </span>
                </div>
            </div>
        </Link>
    )
}
