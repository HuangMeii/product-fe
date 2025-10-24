'use client';

import { I_Product } from '#/modules/product/product.model';
import { getProducts } from '#/modules/product/product.service';
import { useEffect, useState } from 'react';

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
        // BTVN: tạo UI cho card(nhớ tách component), tạo footer
        <div>
            {products?.map((product, index) => (
                <div key={product?._id || index}>{product?.name}</div>
            ))}
        </div>
    );
}
