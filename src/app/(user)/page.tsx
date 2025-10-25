'use client';

import { I_Product } from '#/modules/product/product.model';
import { getProducts } from '#/modules/product/product.service';
import { useEffect, useState } from 'react';
import ProductCard from '#/app/(user)/ProductCard';

export default function Home() {
    const [products, setProducts] = useState<I_Product[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                if (data) setProducts(data?.data);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        fetchData();
    }, []);

    return (
    <section className="min-h-screen px-10 py-10 bg-gradient-to-r from-[#fbb8b8] to-[#ececec]">
        {/* // BTVN: tạo UI cho card(nhớ tách component), tạo footer */}
        <div>
            {products?.map((product, index) => (
                <ProductCard key={product?._id || index} product={product} />
            ))}
        </div>
    </section>
    );
}

