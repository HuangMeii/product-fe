import { I_Product } from '#/modules/product/product.model';
import Image from 'next/image';
import React, { useState } from 'react';

const FALLBACK_IMAGE = 'https://cdn.dribbble.com/userupload/21837350/file/original-6b849e3454056e5777437b5479213582.png?resize=752x564&vertical=center';

export const CardProduct = ({ product }: { product: I_Product }) => {
    const [imgError, setImgError] = useState(false);
    const imageSrc = imgError ? FALLBACK_IMAGE : (product?.image || '');

    return (
        <article
            role="article"
            aria-labelledby={`product-${product?._id}-title`}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 ease-out overflow-hidden w-full max-w-sm"
        >
            <div className="relative bg-gray-50 w-full h-56 flex items-center justify-center overflow-hidden">
                {product?.image ? (
                    <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        loading='lazy'
                        onError={() => setImgError(true)}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M8 14l2.5-3 2 2.5L16 9l4 6H8z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                )}
                <div className="absolute left-3 top-3 bg-white/70 text-xs text-gray-700 px-2 py-1 rounded backdrop-blur-sm">
                    {product?.stock > 0 ? 'In stock' : 'Out of stock'}
                </div>
            </div>

            <div className="p-4">
                <h3
                    id={`product-${product?._id}-title`}
                    className="text-lg font-semibold text-gray-900 truncate"
                >
                    {product?.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {product?.description || 'No description provided.'}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <button
                        aria-label={`Add ${product?.name} to cart`}
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                        Buy
                    </button>
                </div>
            </div>
        </article>
    );
};
