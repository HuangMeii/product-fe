'use client'

import React, { useState } from 'react'
import { Product } from '#/modules/product'
import { ShoppingCart, Heart } from 'lucide-react'
import Image from 'next/image'

export const ProductCard = ({ product }: { product: Product }) => {
    const [src, setSrc] = useState<string | undefined>(product.image || '/images/placeholder.svg')

    return (
        <div className="group">
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
                    <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                        <Heart size={18} className="text-gray-800" />
                    </button>
                    <button className="p-2 bg-black rounded-full shadow hover:bg-gray-800">
                        <ShoppingCart size={18} className="text-white" />
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
                        className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'
                            }`}
                    >
                        {product.stock > 0 ? 'In stock' : 'Out of stock'}
                    </span>
                </div>
            </div>
        </div>
    )
}
