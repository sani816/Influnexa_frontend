import { useEffect, useState } from "react";
import { FaBell, FaTrash } from "react-icons/fa";
import { io } from "socket.io-client";
import axios from "axios";

function NotificationSection() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // LOAD SAVED NOTIFICATIONS
    fetchNotifications();

    const socket = io("http://influnexa-backend-7.onrender.com");

    // LIVE NOTIFICATIONS
    socket.on("notification", (data) => {
      setNotifications((prev) => [
        {
          _id: Date.now(),
          message: data.message,
          createdAt: new Date(),
        },
        ...prev,
      ]);
    });

    return () => socket.disconnect();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        "http://influnexa-backend-7.onrender.com/api/notifications"
      );

      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(
        `http://influnexa-backend-7.onrender.com/api/notifications/${id}`
      );

      setNotifications((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-white">
          Notifications
        </h1>

        {/* <button
          onClick={fetchNotifications}
          className="bg-cyan-500 px-4 py-2 rounded-lg text-white"
        >
          Refresh
        </button> */}

      </div>

      <div className="space-y-4">

        {notifications.length === 0 ? (
          <div className="bg-slate-800 p-6 rounded-xl text-center text-gray-400">
            No notifications available
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              className="
                bg-slate-800
                p-5
                rounded-xl
                flex
                justify-between
                items-center
                border
                border-slate-700
                hover:border-cyan-500
                transition
              "
            >
              <div className="flex items-center gap-4">

                <FaBell className="text-yellow-400 text-xl" />

                <div>
                  <p className="text-white">
                    {item.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

              </div>

              <button
                onClick={() =>
                  deleteNotification(item._id)
                }
                className="
                  bg-red-500
                  hover:bg-red-600
                  p-2
                  rounded-lg
                  text-white
                "
              >
                <FaTrash />
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default NotificationSection;