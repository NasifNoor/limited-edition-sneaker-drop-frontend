import api from "../api/axios";

export const getDrops = async (userId) => {
  const { data } = await api.get("/drops", {
    headers: { "X-User-Id": userId },
  });
  return data;
};

export const reserveDrop = async (dropId, userId) => {
  const { data } = await api.post(`/drops/${dropId}/reserve`, {
    userId,
  });

  return data;
};

export const purchaseDrop = async (reservationId) => {
  const { data } = await api.post("/purchases", {
    reservationId,
  });

  return data;
};
