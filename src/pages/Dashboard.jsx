import { useEffect, useState } from "react";

export default function Dashboard() {
  const [drops, setDrops] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isReserved, setIsReserved] = useState(false);

  useEffect(() => {
    fetchDrops();
    fetchUsers();
  }, []);

  const fetchDrops = async () => {
    const res = await fetch("http://localhost:5000/api/drops");
    const data = await res.json();
    setDrops(data?.data);
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();
    setUsers(data?.data);
  };

  const handleReserve = async (dropId) => {
    if (!selectedUser) {
      alert("Please select a user first.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: selectedUser.id,
          dropId,
        }),
      });

      if (res.ok) {
        const response = await res.json();
        setReservation(response.data);
        setIsReserved(true);
      }
    } catch (error) {
      console.error("Error reserving drop:", error);
      alert("Failed to reserve the drop. Please try again.");
    }
  };

  useEffect(() => {
    if (!reservation?.expiresAt) return;

    const updateTimer = () => {
      const remaining = new Date(reservation.expiresAt).getTime() - Date.now();

      if (remaining <= 0) {
        setTimeLeft(0);
        return;
      }

      setTimeLeft(Math.floor(remaining / 1000));
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [reservation]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <h1>Limited Edition Sneaker Drop</h1>

      {selectedUser ? (
        <div className="p-4 rounded-md">
          <h1 className="text-xl font-bold">
            Select User: {selectedUser.username}
          </h1>

          {drops.map((drop) => (
            <div
              key={drop.id}
              className="d-flex justify-between p-4 border rounded-md mt-2 "
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h2>{drop.name}</h2>
              <p>Stock: {drop.availableStock}</p>
              <button
                onClick={() => handleReserve(drop.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                {reservation ? (
                  <>
                    Purchase{minutes}:{String(seconds).padStart(2, "0")}
                  </>
                ) : (
                  "Reserve"
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-md ">
          <h1 className="text-xl font-bold">Select User</h1>

          <select
            className="mt-2 p-2 border rounded-md "
            onChange={(e) => {
              const user = users.find((u) => u.id == Number(e.target.value));

              setSelectedUser(user);
            }}
          >
            <option value="" className="text-gray-400">
              Select User
            </option>

            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
                className="text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {user.username}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
