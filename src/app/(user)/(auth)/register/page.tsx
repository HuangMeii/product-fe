"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "#/modules/auth/auth.context";
import { ROUTES } from "#/shared/contants";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { toast } from 'react-hot-toast'

export default function Register() {
    const router = useRouter();
    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error('Vui lòng điền đủ thông tin')
            return;
        }

        setLoading(true);
        try {
            const ok = await register?.(name, email, password);
            if (ok) {
                toast.success('Đăng ký thành công')
                router.push(ROUTES.HOME);
            } else toast.error('Đăng ký thất bại')
        } catch (err: any) {
            toast.error(err?.response?.data?.message || err?.message || 'Lỗi server')
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4 bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
                    Tạo tài khoản mới
                </h2>

                {/* inline error removed; toasts are used instead */}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1 text-gray-700">Họ tên</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-3 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                placeholder="Nguyễn Văn A"
                                aria-label="Họ tên"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-700">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-3 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                placeholder="you@example.com"
                                aria-label="Email"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-700">Mật khẩu</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-3 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                placeholder="Ít nhất 6 ký tự"
                                aria-label="Mật khẩu"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
                        >
                            {loading ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : null}
                            <span className="text-sm font-medium">Đăng ký</span>
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-600 mt-1">
                        Đã có tài khoản?{' '}
                        <button
                            type="button"
                            onClick={() => router.push('/login')}
                            className="text-blue-600 hover:underline"
                        >
                            Đăng nhập
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}
