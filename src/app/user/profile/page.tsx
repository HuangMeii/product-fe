"use client";

import { checkAuth } from "#/modules/auth/auth.service";
import { I_User } from "#/modules/user/user.model";
import { deleteUser, updateUser } from "#/modules/user/user.service";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const [user, setUser] = useState<I_User>();

  useEffect(() => {
    const token = localStorage.getItem("token_product");

    const fetchUser = async () => {
      try {
        if (token) {
          const userData = await checkAuth(token);
          setUser(userData);
          console.log("User data:", userData);
        }
      } catch (error: unknown) {
        const message = error instanceof Error 
          ? error.message 
          : (error as {response?: {data?: {message?: string}}})?.response?.data?.message || "Failed to fetch user data";
        toast.error(message);
      }
    };

    fetchUser();
  }, []);

  const handleDeleteUser = async () => {
    const token = localStorage.getItem("token_product");

    try {
      if (user?._id) {
        await updateUser(user._id, token || "", { isActive: false });
        toast.success("User deleted successfully");
        setUser(undefined);
      }
    } catch (error: unknown) {
      const message = error instanceof Error 
        ? error.message 
        : (error as {response?: {data?: {message?: string}}})?.response?.data?.message || "Failed to delete user";
      toast.error(message);
    }
  };
  
  const handleUpdateUser = async () => {
    const token = localStorage.getItem("token_product");

    try {
      if (user?._id) {
        await updateUser(user._id, token || "", { name: user.name, email: user.email });
        toast.success("User updated successfully");
      }
    } catch (error: unknown) {
      const message = error instanceof Error 
        ? error.message 
        : (error as {response?: {data?: {message?: string}}})?.response?.data?.message || "Failed to update user";
      toast.error(message);
    }
  };

  return (
    <div className="flex justify-center h-[70vh] items-center">
      {user ? (
        <div className="flex flex-col bg-primary p-5 rounded-lg shadow-lg">
          <h1>User Profile</h1>
          <input type="text" value={user?.name} onChange={(e) => {setUser({...user, name: e.target.value})}}/>
          <input type="email" value={user?.email} onChange={(e) => {setUser({...user, email: e.target.value})}}/>
        </div>
      ) : (
        <div className="bg-primary p-5 rounded-lg shadow-lg">
          <h1>Please log in to view your profile.</h1>
        </div>
      )}
      <div>
        <button
          onClick={handleDeleteUser}
          className="block ml-5 mb-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Xoá user
        </button>

        <button 
        onClick={handleUpdateUser} 
        className="block ml-5 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
          save
        </button>
      </div>
    </div>
  );
}
