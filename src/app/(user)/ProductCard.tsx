'use client';
import { I_Product } from '../../modules/product/product.model';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: I_Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  console.log('ProductCard render, product =', product);
  return (
    <div className="group bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg overflow-hidden hover:shadow-md transition-transform w-full hover:scale-105 duration-300 cursor-pointer">
      <div className="relative w-full pb-[56.25%]">
        <Image
          src={product?.image || '/placeholder.png'}
          alt={product?.name || 'product image'}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>

      {/* compact content */}
      <div className="p-2.5 flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-800 dark:text-white truncate">
            {product?.name}
          </h3>
          {/* nếu có mô tả ngắn */}
          {/* <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product?.description}</p> */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-pink-500">
              ${product?.price?.toFixed(2) || '0.00'}
            </span>
          </div>
        </div>

        <button
          className="p-2 rounded-md cursor-pointer bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600"
          aria-label="Add to cart"
          title="Add to cart"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}