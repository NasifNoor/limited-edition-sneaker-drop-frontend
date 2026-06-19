import { useEffect, useState } from "react";
import { getDrops } from "../services/drop.service";
import { getUsers } from "../services/user.service";
import DropCard from "../components/DropCard";
import socket from "../socket";

export default function Dashboard() {
  const [drops, setDrops] = useState([]);
  console.log("🚀 ~ Dashboard ~ drops:", drops);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchDrops(selectedUser.id);
    }
  }, [selectedUser]);

  useEffect(() => {
    socket.on("stock-updated", (data) => {
      setDrops((prev) =>
        prev.map((drop) =>
          drop.id === data.dropId
            ? data.userId === drop?.userId
              ? {
                  ...drop,
                  purchaseList: data.lastBuyer
                    ? [data.lastBuyer, ...drop.purchaseList].slice(0, 3)
                    : drop.purchaseList,
                  availableStock: data.availableStock,
                  status: data.status === "ACTIVE",
                }
              : {
                  ...drop,
                  purchaseList: data.lastBuyer
                    ? [data.lastBuyer, ...drop.purchaseList].slice(0, 3)
                    : drop.purchaseList,
                  availableStock: data.availableStock,
                }
            : drop,
        ),
      );
    });

    return () => {
      socket.off("stock-updated");
    };
  }, []);

  useEffect(() => {
    socket.on("drop-live", (data) => {
      console.log("🚀 ~ Dashboard ~ data:", data);
      setDrops((prev) =>
        prev.map((drop) =>
          drop.id === data.dropId
            ? {
                ...drop,
                isLive: data.isLive === "LIVE",
              }
            : drop,
        ),
      );
    });

    return () => {
      socket.off("drop-live");
    };
  }, []);

  const fetchDrops = async (userId) => {
    try {
      const data = await getDrops(userId);
      setDrops(data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-6 ">
      <h2>Limited Edition Sneaker Drop</h2>

      {selectedUser ? (
        <div className="p-4 rounded-md ">
          <h3 className="text-xl font-bold">
            Select User: {selectedUser.username}
          </h3>

          {drops.map((drop) => (
            <DropCard key={drop.id} drop={drop} selectedUser={selectedUser} />
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
