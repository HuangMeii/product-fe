'use client'

import React, { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import * as cartService from '#/modules/cart/cart.service'
import { toast } from 'react-hot-toast'

export default function AddToCart({ productId, disabled }: { productId: string; disabled?: boolean }) {
    const [adding, setAdding] = useState(false)
    const [added, setAdded] = useState(false)

    const handleAdd = async () => {
        if (adding || disabled) return
        setAdding(true)
        try {
            await cartService.addItem({ productId, quantity: 1 })
            setAdded(true)
            toast.success('Đã thêm vào giỏ')
            setTimeout(() => setAdded(false), 1400)
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Thêm vào giỏ thất bại')
        } finally {
            setAdding(false)
        }
    }

    return (
        <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleAdd(); }}
            className={`p-3 rounded-md flex items-center justify-center ${disabled ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}>
            {adding ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
            ) : added ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ) : (
                <ShoppingCart size={18} />
            )}
        </button>
    )
}
