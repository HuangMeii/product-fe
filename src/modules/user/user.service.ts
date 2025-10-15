import axios from 'axios';
import { User } from './user.type';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000';

export const getMe = async (): Promise<{ success: boolean; data: User } > => {
	const resp = await axios.get(`${API_BASE}/api/auth/me`);
	return resp.data;
};

export const getUserById = async (id: string): Promise<{ success: boolean; data: User } > => {
	const resp = await axios.get(`${API_BASE}/api/users/${id}`);
	return resp.data;
};

export const updateUser = async (id: string, payload: Partial<User>) => {
	const resp = await axios.put(`${API_BASE}/api/users/${id}`, payload);
	return resp.data;
};

export const deleteUser = async (id: string) => {
	const resp = await axios.delete(`${API_BASE}/api/users/${id}`);
	return resp.data;
};

