import instantAxios from "#/shared/constant/instant-axios";

export const getProducts = async () => {
    // Endpoint: /api/products
    const res = await instantAxios.get(`/api/products`);
    return res.data;
};

