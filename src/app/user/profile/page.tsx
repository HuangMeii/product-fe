'use client';

import { checkAuth } from '#/modules/auth/auth.service';
import { I_User } from '#/modules/user/user.model';
import { deleteUser } from '#/modules/user/user.service';
import { TOKEN_KEY } from '#/shared/constant/instant-axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Profile() {
    const [user, setUser] = useState<I_User>();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await checkAuth();
                setUser(userData);
            } catch (error: any) {
                toast.error(
                    error?.response?.data?.message ||
                        'Failed to fetch user data'
                );
            }
        };

        fetchUser();
    });

    const handleDeleteUser = async () => {
        try {
            if (user?._id) {
                await deleteUser(user._id);
                toast.success('User deleted successfully');
                setUser(undefined);
            }
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || 'Failed to delete user'
            );
        }
    };

    return (
        <div className="flex justify-center h-[70vh] items-center">
            {user ? (
                <div className="bg-primary p-5 rounded-lg shadow-lg">
                    <h1>User Profile</h1>
                    <p>Name: {user?.name}</p>
                    <p>Email: {user?.email}</p>
                    <p>Role: {user?.role}</p>
                </div>
            ) : (
                <div className="bg-primary p-5 rounded-lg shadow-lg">
                    <h1>Please log in to view your profile.</h1>
                </div>
            )}

            <button
                onClick={handleDeleteUser}
                className="ml-5 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
                Xoá user
            </button>
        </div>
    );
}
