import api from "../api/axios";

export const createReservation = async (dropId, userId) => {
  console.log("🚀 ~ createReservation ~ userId:", userId);
  const { data } = await api.post(`/reservations`, {
    userId,
    dropId,
  });

  return data;
};
