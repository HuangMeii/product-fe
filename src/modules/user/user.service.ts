import instantAxios from "#/shared/constant/instant-axios";

export const deleteUser = async (userId: string) => {
    // Endpoint: /api/users/:id
    const res = await instantAxios.delete(`/api/users/${userId}`);
    return res.data?.result as { message: string };
};
