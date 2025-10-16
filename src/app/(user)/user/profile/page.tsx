"use client";

import React, { useState } from 'react';
import { useAuth } from '#/modules/auth/auth.context';
import * as userService from '#/modules/user/user.service';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
    const { user, setAuth, checkAuth } = useAuth();
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(user?.name ?? '');
    const [email, setEmail] = useState(user?.email ?? '');
    const [loading, setLoading] = useState(false);

    if (!user) return <div className="p-8">Vui lòng đăng nhập để xem hồ sơ.</div>;

    const save = async () => {
        setLoading(true);
        try {
            await userService.updateUser(user.id ?? (user as any).id ?? (user as any)._id, { name, email });
            toast.success('Cập nhật thành công');
            // refresh user in context
            if (checkAuth) await checkAuth();
            setEditing(false);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Cập nhật thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
                <div className="flex gap-8">
                    <div className="w-36 flex-shrink-0">
                        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-4xl font-bold text-indigo-700">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="mt-3 text-center text-sm text-gray-500">Member since {new Date(user.createdAt || Date.now()).getFullYear()}</div>
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                <div className="mt-2 inline-block px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded">Role: {user.role}</div>
                            </div>

                            <div className="space-x-2">
                                {!editing ? (
                                    <button onClick={() => { setEditing(true); setName(user.name ?? ''); setEmail(user.email ?? ''); }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow">Edit profile</button>
                                ) : (
                                    <>
                                        <button onClick={save} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded-lg shadow">{loading ? 'Saving...' : 'Save'}</button>
                                        <button onClick={() => setEditing(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                                    </>
                                )}
                            </div>
                        </div>

                        {editing ? (
                            <div className="mt-6 grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border border-gray-200 rounded-md px-3 py-2" />
                                </div>
                            </div>
                        ) : (
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded">
                                    <div className="text-sm text-gray-500">Name</div>
                                    <div className="mt-1 font-medium text-gray-900">{user.name}</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded">
                                    <div className="text-sm text-gray-500">Email</div>
                                    <div className="mt-1 font-medium text-gray-900">{user.email}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
