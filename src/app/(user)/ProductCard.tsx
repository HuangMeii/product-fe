'use client';
import { I_Product } from '../../modules/product/product.model';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: I_Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
      {/* Ảnh sản phẩm */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={product?.image || '/placeholder.png'}
          alt={product?.name || 'product image'}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Nội dung */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
          {product?.name}
        </h3>
        <p className="text-pink-500 font-bold text-xl mt-2">
          ${product?.price?.toFixed(2) || '0.00'}
        </p>

        <button className="mt-4 w-full py-2 bg-pink-400 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-pink-500 transition-all duration-300">
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
