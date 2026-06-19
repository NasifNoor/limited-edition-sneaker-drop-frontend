import React, { useEffect, useState } from "react";
import { createReservation } from "../services/reservation.service";
import { createPurchase } from "../services/purchase.service";

export default function DropCard({ drop, selectedUser }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [left, setLeft] = useState(0);
  const [reservation, setReservation] = useState(null);
  useEffect(() => {
    if (reservation || drop?.expiresAt) {
      const expiresAt = reservation?.data?.expiresAt || drop?.expiresAt;
      const calculateTimeLeft = () => {
        const remaining = Math.max(
          0,
          Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000),
        );

        setTimeLeft(remaining);
      };

      calculateTimeLeft();

      const interval = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(interval);
    }
  }, [reservation, drop?.expiresAt]);

  useEffect(() => {
    if (drop?.startTime) {
      const calculateTimeLeft = () => {
        const remaining = Math.max(
          0,
          Math.floor((new Date(drop?.startTime).getTime() - Date.now()) / 1000),
        );

        setLeft(remaining);
      };

      calculateTimeLeft();

      const interval = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(interval);
    }
  }, [drop?.startTime]);

  const handleReserve = async (dropId) => {
    if (!selectedUser) {
      alert("Please select a user first.");
      return;
    }
    try {
      const data = await createReservation(dropId, selectedUser.id);
      setReservation(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePurchase = async (dropId) => {
    if (!selectedUser) {
      return;
    }
    try {
      const data = await createPurchase(dropId, selectedUser.id);
    } catch (error) {
      console.error(error);
    }
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className="p-4 border rounded-md mt-2"
      style={{
        display: "flex !important",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <h2>{drop.name}</h2>

        <p>Available Stock: {drop.availableStock}</p>

        {drop.status && timeLeft > 0 ? (
          <button
            onClick={() => handlePurchase(drop.id)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Purchase {timeLeft > 0 && `(${timeLeft}s)`}
          </button>
        ) : (
          <button
            disabled={drop.availableStock === 0 || left > 0}
            onClick={() => handleReserve(drop.id)}
            className="bg-blue-500 h-12 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
          >
            {left > 0 ? `Live in ${formatTime(left)} hours` : "Reserve"}
          </button>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          gap: "8px",
        }}
      >
        <span>Latest successful purchasers:</span>
        {drop?.purchaseList?.map((purchase, index) => (
          <span key={purchase?.id}>
            {" "}
            {purchase?.username}
            {index < drop?.purchaseList?.length - 1 && ", "}
          </span>
        ))}
      </div>
    </div>
  );
}
