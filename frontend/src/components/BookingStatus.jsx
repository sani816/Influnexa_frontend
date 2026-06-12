import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Config from "../config/Config";
import {
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaMoneyBill,
  FaCalendar,
  FaTrash,
} from "react-icons/fa";

function BookingStatus() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();

    const socket = io(Config.API_URL);

    socket.on("booking-update", (data) => {
      setBookings((prev) => [
        { _id: Date.now(), ...data },
        ...prev,
      ]);
    });

    return () => socket.disconnect();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/api/bookings`);
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`${Config.API_URL}/api/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-white mb-8">
        Booking Status
      </h1>

      <div className="space-y-5">
        {bookings.length === 0 ? (
          <div className="bg-slate-800 p-6 rounded-xl text-center text-gray-400">
            No bookings yet
          </div>
        ) : (
          bookings.map((item) => (
            <div
              key={item._id}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition"
            >
              <div className="flex justify-between">
                
                <div className="space-y-2 text-white">

                  <div className="flex gap-2 text-cyan-300 font-semibold">
                    <FaUser /> {item.name}
                  </div>

                  <div className="flex gap-2 text-gray-300">
                    <FaEnvelope /> {item.email}
                  </div>

                  <div className="flex gap-2 text-gray-300">
                    <FaBuilding /> {item.company}
                  </div>

                  <div className="flex gap-2 text-green-400">
                    <FaMoneyBill /> {item.budget}
                  </div>

                  <p className="text-white mt-2">
                    {item.message}
                  </p>

                  <p className="text-xs text-gray-500 flex items-center gap-2 mt-2">
                    <FaCalendar />
                    {new Date(item.createdAt).toLocaleString()}
                  </p>

                  {/* TYPE BADGE */}
                  <span className={`
                    inline-block mt-2 px-3 py-1 text-xs rounded-full
                    ${item.type === "consultation"
                      ? "bg-purple-500/20 text-purple-300"
                      : "bg-cyan-500/20 text-cyan-300"}
                  `}>
                    {item.type}
                  </span>

                </div>

                {/* DELETE */}
                <button
                  onClick={() => deleteBooking(item._id)}
                  className="bg-red-500 hover:bg-red-600 p-2 rounded-lg text-white"
                >
                  <FaTrash />
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookingStatus;