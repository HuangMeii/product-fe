'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, LogIn } from 'lucide-react'
import { useAuth } from '#/modules/auth/auth.context'
import Link from 'next/link'
import { ROUTES } from '#/shared/contants'

export default function LoginPage() {
    const router = useRouter()
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!email || !password) {
            setError('Please provide email and password')
            return
        }

        if (!login) {
            setError('Auth service unavailable')
            return
        }

        setLoading(true)
        try {
            const ok = await login(email, password)
            if (ok) {
                router.replace('/')
            } else {
                setError('Login failed: invalid credentials')
            }
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || 'Login failed'
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    const fillDemo = () => {
        setEmail('client@example.com')
        setPassword('Client@123')
    }

    return (
        <div className="min-h-screen flex flex-col items-center  bg-white text-black px-4">
            <div className="flex flex-col items-center mb-6">
                <Lock className="w-10 h-10 text-black mb-2" />
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-gray-500 text-sm">Login to continue shopping</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your password"
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-900 transition disabled:opacity-60"
                    >
                        <LogIn size={18} />
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </div>
                <button
                    type="button"
                    onClick={fillDemo}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition"
                >
                    Fill demo
                </button>
                <Link
                    href={ROUTES.REGISTER}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition"
                >
                    Register
                </Link>

                {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
        </div>
    )
}
