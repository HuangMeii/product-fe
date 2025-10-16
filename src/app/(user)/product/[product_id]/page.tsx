import React from 'react'
import AddToCart from '#/shared/component/add-to-cart'
import { fetchProductById } from '#/modules/product'

type Props = { params: { product_id: string } }

export default async function Page({ params }: Props) {
	const raw = params.product_id || ''
	const id = raw.split('-')[0]

	let product: any = null
	try {
		const resp = await fetchProductById(id)
		product = resp.data
	} catch (err) {
		return (
			<div className="p-8">
				<h2 className="text-2xl font-semibold">Product not found</h2>
			</div>
		)
	}

	return (
		<div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
			<div className="bg-white rounded-lg shadow overflow-hidden">
				{product.image ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
				) : (
					<div className="w-full h-96 bg-gray-100" />
				)}
			</div>

			<div className="flex flex-col gap-4">
				<h1 className="text-2xl font-bold">{product.name}</h1>
				<p className="text-gray-600">{product.description}</p>

				<div className="mt-4 flex items-center gap-4">
					<span className="text-3xl font-extrabold">${product.price?.toFixed?.(2) ?? product.price}</span>
					<span className={`px-2 py-1 rounded text-sm ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
						{product.stock > 0 ? 'In stock' : 'Out of stock'}
					</span>
				</div>

				<div className="mt-6">
					{/* Client component: stops propagation inside */}
					<AddToCart productId={product._id} disabled={product.stock <= 0} />
				</div>

				<div className="mt-6 text-sm text-gray-500">
					<p>SKU: {product._id}</p>
					<p>Created: {new Date(product.createdAt || Date.now()).toLocaleString()}</p>
				</div>
			</div>
		</div>
	)
}

