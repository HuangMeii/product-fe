import api from '#/lib/api-client'
import { User } from './user.type';

export const getMe = async (): Promise<{ success: boolean; data: User } > => {
	const resp = await api.get(`/api/auth/me`);
	return resp.data;
};

export const getUserById = async (id: string): Promise<{ success: boolean; data: User } > => {
	const resp = await api.get(`/api/users/${id}`);
	return resp.data;
};

export const updateUser = async (id: string, payload: Partial<User>) => {
	const resp = await api.put(`/api/users/${id}`, payload);
	return resp.data;
};

export const deleteUser = async (id: string) => {
	const resp = await api.delete(`/api/users/${id}`);
	return resp.data;
};

