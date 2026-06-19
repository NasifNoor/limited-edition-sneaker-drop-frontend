import api from "../api/axios";

export const createPurchase = async (dropId, userId) => {
  const { data } = await api.post(`/purchases`, {
    userId,
    dropId,
  });

  return data;
};
