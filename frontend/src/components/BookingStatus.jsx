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

    socket.on("booking-update", (booking) => {
      setBookings((prev) => [booking, ...prev]);
    });

    socket.on("delete-booking", (id) => {
      setBookings((prev) => prev.filter((item) => item._id !== id));
    });

    return () => socket.disconnect();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `${Config.API_URL}/api/consultation/all`
      );

      if (res.data.success) {
        setBookings(res.data.consultations);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await axios.delete(
        `${Config.API_URL}/api/consultation/${id}`
      );

      setBookings((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-white mb-8">
        Consultation Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="bg-slate-800 rounded-xl p-6 text-center text-gray-400">
          No consultation bookings found.
        </div>
      ) : (
        <div className="space-y-5">
          {bookings.map((item) => (
            <div
              key={item._id}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition"
            >
              <div className="flex justify-between">

                <div className="space-y-3 text-white">

                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <FaUser />
                    {item.name}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaEnvelope />
                    {item.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaBuilding />
                    {item.company || "N/A"}
                  </div>

                  <div className="flex items-center gap-2 text-green-400">
                    <FaMoneyBill />
                    ₹ {item.budget || 0}
                  </div>

                  <div>
                    <strong>Date :</strong> {item.date}
                  </div>

                  <div>
                    <strong>Time :</strong> {item.time}
                  </div>

                  <div>
                    <strong>Message :</strong>
                    <br />
                    {item.message || "No message"}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FaCalendar />
                    {new Date(item.createdAt).toLocaleString()}
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 text-xs">
                    Consultation
                  </span>

                </div>

                <button
                  onClick={() => deleteBooking(item._id)}
                  className="bg-red-500 hover:bg-red-600 p-3 rounded-lg text-white h-fit"
                >
                  <FaTrash />
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingStatus;