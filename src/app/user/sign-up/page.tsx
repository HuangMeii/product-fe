'use client';

import { signUp } from '#/modules/auth/auth.service';
import { TOKEN_KEY } from '#/shared/constant/instant-axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function SignUp() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSignUp = async () => {
        try {
            const auth = await signUp({
                password: form.password,
                email: form.email,
                name: form.name,
            });
            localStorage.setItem(TOKEN_KEY, auth.token);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Sign up failed');
        }
    };

    return (
        <div className="flex justify-center h-[70vh] items-center">
            <div className="bg-primary p-5 rounded-lg shadow-lg">
                <h1>Sign Up</h1>
                <div>
                    <label>Username:</label>
                    <input
                        onChange={(e) => {
                            setForm((value) => ({
                                ...value,
                                name: e.target.value,
                            }));
                        }}
                        type="text"
                        className="border rounded-md p-2 w-full"
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        onChange={(e) => {
                            setForm((prevForm) => ({
                                ...prevForm,
                                email: e.target.value,
                            }));
                        }}
                        type="email"
                        className="border rounded-md p-2 w-full"
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        onChange={(e) => {
                            setForm((prevForm) => ({
                                ...prevForm,
                                password: e.target.value,
                            }));
                        }}
                        type="password"
                        className="border rounded-md p-2 w-full"
                    />
                </div>
                <button
                    onClick={handleSignUp}
                    className="bg-foreground text-background p-2 rounded-md mt-4 w-full cursor-pointer"
                >
                    Sign In
                </button>

                {/* login */}
                <Link href="/user/login" className="ml-5 self-end mt-10">
                    Already have an account? Log In
                </Link>
            </div>
        </div>
    );
}
