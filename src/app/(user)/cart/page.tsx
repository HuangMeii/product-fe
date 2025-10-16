"use client";

import React, { useEffect, useState } from "react";
import * as cartService from "#/modules/cart/cart.service";
import { Cart, CartItem } from "#/modules/cart/cart.type";
import Image from "next/image";
import { Product } from '#/modules/product/product.type';
import { toast } from "react-hot-toast";
import { Loader2, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartPage() {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const resp = await cartService.getCart();
            if (resp?.success) setCart(resp.data);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Không thể lấy giỏ hàng");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const updateQty = async (item: CartItem, qty: number) => {
        if (qty < 1) return;
        try {
            const prod = typeof item.product === 'object' ? (item.product as Product) : null;
            const pid = prod?._id ?? (prod as any)?.id ?? item.product;
            await cartService.updateItem(pid as string, qty);
            toast.success("Cập nhật số lượng");
            load();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Cập nhật thất bại");
        }
    };

    const remove = async (item: CartItem) => {
        try {
            const prod = typeof item.product === 'object' ? (item.product as Product) : null;
            const pid = prod?._id ?? (prod as any)?.id ?? item.product;
            await cartService.removeItem(pid as string);
            toast.success("Đã xóa");
            load();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Xóa thất bại");
        }
    };

    const subtotal = (cart: Cart | null) => {
        if (!cart) return 0;
        return cart.items.reduce((s, it) => {
            const prod = typeof it.product === 'object' ? (it.product as Product) : null;
            const price = it.price ?? prod?.price ?? 0;
            return s + price * (it.quantity || 0);
        }, 0);
    };

    return (
        <div className="">
            <div
                className="mx-auto rounded-2xl shadow-lg p-8"
            >
                <div className="flex items-center gap-2 mb-8">
                    <ShoppingBag size={24} />
                    <h2 className="text-2xl font-semibold">Giỏ hàng của bạn</h2>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-gray-400" size={32} />
                    </div>
                )}

                {!loading && (!cart || cart.items.length === 0) && (
                    <div className="text-center py-20 text-gray-400">
                        Giỏ hàng của bạn đang trống 🛒
                    </div>
                )}

                {cart && cart.items.length > 0 && (
                    <div
                        className="space-y-6"
                    >
                        {cart.items.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-4 border-b border-neutral-800 pb-6"
                            >
                                <div className="w-24 h-24 bg-neutral-800 flex-shrink-0 rounded-lg overflow-hidden">
                                    {typeof item.product === 'object' ? (
                                        (() => {
                                            const prod = item.product as Product;
                                            const src = prod.image ?? '/images/placeholder.svg';
                                            return (
                                                <Image
                                                    src={src}
                                                    alt={prod.name}
                                                    width={96}
                                                    height={96}
                                                    className="object-cover w-full h-full"
                                                    loading="lazy"
                                                />
                                            );
                                        })()
                                    ) : (
                                        <div className="w-full h-full bg-neutral-700" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-medium text-white">
                                                {typeof item.product === 'object' ? (item.product as Product).name : item.name}
                                            </div>
                                            <div className="text-sm text-gray-400 mt-1">
                                                ${" "}
                                                {(item.price ?? (typeof item.product === 'object' ? (item.product as Product).price : undefined) ?? 0)?.toFixed?.(2)}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => remove(item)}
                                            className="text-gray-500 hover:text-red-500 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="mt-4 flex items-center gap-2">
                                        <button
                                            onClick={() => updateQty(item, (item.quantity || 1) - 1)}
                                            className="p-1.5 rounded-md border border-neutral-700 hover:bg-neutral-800"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <div className="px-4">{item.quantity}</div>
                                        <button
                                            onClick={() => updateQty(item, (item.quantity || 1) + 1)}
                                            className="p-1.5 rounded-md border border-neutral-700 hover:bg-neutral-800"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Tổng tiền */}
                        <div className="flex justify-between items-center pt-6 border-t border-neutral-800">
                            <div className="text-lg font-medium">Tổng cộng</div>
                            <div className="text-2xl font-semibold text-white">
                                ${subtotal(cart).toFixed(2)}
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                className="px-6 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition"
                            >
                                Tiến hành thanh toán
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
