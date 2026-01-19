import { I_Auth } from './auth.model';
import { I_User } from '../user/user.model';
import instantAxios from '#/shared/constant/instant-axios';

export const signUp = async ({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}) => {
    // Endpoint: /api/auth/register
    const res = await instantAxios.post(`/api/auth/register`, {
        name,
        email,
        password,
    });
    return res.data?.result as I_Auth;
};

export const checkAuth = async () => {
    const res = await instantAxios.get(`/api/auth/check-auth`);
    return res.data?.result as I_User;
};

export const login = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const res = await instantAxios.post(`/api/auth/login`, {
        email,
        password,
    });
    return res.data?.result as I_Auth;
};
