'use client';

import { I_Product } from '#/modules/product/product.model';
import { getProducts } from '#/modules/product/product.service';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function Home() {
  const [products, setProducts] = useState<I_Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        console.log('Fetched products:', data);
        if (data) setProducts(data?.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className=" bg-gradient-to-r from-[#fbb8b8] to-[#ececec]">
        <h2 className='text-3xl sm:text-4xl font-bold text-gray-600 p-5'>Các sản phẩm hôm nay</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-10 py-10'>
            {products.length === 0 ? (
                <div className="col-span-full text-center text-gray-600">Đang tải...</div>
            ) : (
                products.map((product, index) => (
                <ProductCard key={product?._id || index} product={product} />
                ))
            )}
        </div>
      
    </section>
  );
}

