'use client';

import { I_Product } from '#/modules/product/product.model';
import { getProducts } from '#/modules/product/product.service';
import { Meow } from '#/shared/components';
import { CardProduct } from '#/shared/components/card-product';
import { useEffect, useState } from 'react';

export default function Page() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const responsive = await getProducts();
                setProducts(responsive?.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            {/* Start section Meow */}
            <section>
                <Meow />
            </section>
            {/* End section Meow */}

            {/* Start section products */}
            <section className="h-screen px-10">
                <h1 className="text-center text-4xl font-semibold">
                    Products Page
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
                    {products.map((product: I_Product) => (
                        <CardProduct key={product._id} product={product} />
                    ))}
                </div>
            </section>
            {/* End section products */}
        </div>
    );
}
