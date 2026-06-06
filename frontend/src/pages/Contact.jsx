import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Footer from "../components/Footer";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

function Contact() {
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });
const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [messageData, setMessageData] = useState({
  name: "",
  email: "",
  company: "",
  budget: "",
  message: "",
});

const [msgLoading, setMsgLoading] = useState(false);
const [msgSuccess, setMsgSuccess] = useState(false);


const handleBooking = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    await axios.post(
      "http://influnexa-backend-7.onrender.com/api/consultation/book-consultation",
      bookingData
    );

    setShowSuccess(true);

    setBookingData({
      name: "",
      email: "",
      date: "",
      time: "",
    });

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

  } catch (error) {
  console.error(error);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Booking Failed"
  );
}
  setLoading(false);
};


const handleMessage = async (e) => {
  e.preventDefault();
 if (
    !messageData.name ||
    !messageData.email ||
    !messageData.company ||
    !messageData.budget ||
    !messageData.message
  ) {
    alert("⚠️ Please fill all fields before submitting!");
    return;
  }
  setMsgLoading(true);

  try {
    const res = await axios.post(
      "http://influnexa-backend-7.onrender.com/api/message/send-message",
      messageData
    );

    console.log("MESSAGE SUCCESS:", res.data);

    setMsgSuccess(true);

    setMessageData({
      name: "",
      email: "",
      company: "",
      budget: "",
      message: "",
    });

    setTimeout(() => {
      setMsgSuccess(false);
    }, 3000);

  } catch (error) {
    console.error("MESSAGE ERROR:", error);
    alert(error.response?.data?.message || error.message);
  }

  setMsgLoading(false);
};


  return (
    <>
      <Navbar />
      {showSuccess && (
  <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
    ✅ Consultation Booked Successfully!
  </div>
)}
{msgSuccess && (
  <div className="fixed right-5 left-5 bg-green-500 text-white px-3 py-3 rounded-lg shadow-lg">
    ✅ Message Sent Successfully!
  </div>
)}

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-200 via-purple-900 to-black text-white">
      <section className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Contact Us
          </h1>

          <p className="text-xl max-w-3xl mx-auto text-black">
            Let's discuss your next influencer marketing campaign.
          </p>

        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-4 gap-8 ">

            <div className=" p-8 rounded-xl shadow-lg text-center bg-gradient-to-b from-gray-900 via-purple-900 to-gray-400 text-white">

              <FaPhone
                size={40}
                className="mx-auto text-indigo-600 mb-4"
              />

              <h3 className="font-bold text-xl mb-2 ">
                Phone
              </h3>

              <p>+91 9876543210</p>

            </div>

            <div className="bg-gradient-to-b from-gray-900 via-purple-900 to-gray-400 text-white p-8 rounded-xl shadow-lg text-center">

              <FaEnvelope
                size={40}
                className="mx-auto text-indigo-600 mb-4"
              />

              <h3 className="font-bold text-xl mb-2">
                Email
              </h3>

              <p>hello@influenxa.com</p>

            </div>

            <div className="bg-gradient-to-b from-gray-900 via-purple-900 to-gray-400 text-white p-8 rounded-xl shadow-lg text-center">

              <FaWhatsapp
                size={40}
                className="mx-auto text-green-500 mb-4"
              />

              <h3 className="font-bold text-xl mb-2">
                WhatsApp
              </h3>

              <p>+91 9876543210</p>

            </div>

            <div className="bg-gradient-to-b from-gray-900 via-purple-900 to-gray-400 text-white p-8 rounded-xl shadow-lg text-center">

              <FaMapMarkerAlt
                size={40}
                className="mx-auto text-red-500 mb-4"
              />

              <h3 className="font-bold text-xl mb-2">
                Office
              </h3>

              <p>Kolkata, West Bengal, India</p>

            </div>

          </div>

        </div>

      </section>

      {/* Contact Form + Booking */}
      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div className="bg-gradient-to-b from-gray-900 via-purple-900 to-gray-400 text-white p-8 rounded-xl shadow-lg">

              <h2 className="text-3xl font-bold mb-6">
                Send Us A Message
              </h2>

         <form className="space-y-5" onSubmit={handleMessage}>

               <input
  type="text"
  placeholder="Full Name"
  value={messageData.name}
  onChange={(e) =>
    setMessageData({ ...messageData, name: e.target.value })
  }
  className="w-full border p-4 rounded-lg"
/>

<input
  type="email"
  placeholder="Email Address"
  value={messageData.email}
  onChange={(e) =>
    setMessageData({ ...messageData, email: e.target.value })
  }
  className="w-full border p-4 rounded-lg"
/>

<input
  type="text"
  placeholder="Company Name"
  value={messageData.company}
  onChange={(e) =>
    setMessageData({ ...messageData, company: e.target.value })
  }
  className="w-full border p-4 rounded-lg"
/>

<input
  type="text"
  placeholder="Campaign Budget"
  value={messageData.budget}
  onChange={(e) =>
    setMessageData({ ...messageData, budget: e.target.value })
  }
  className="w-full border p-4 rounded-lg"
/>

<textarea
  rows="5"
  placeholder="Tell us about your campaign"
  value={messageData.message}
  onChange={(e) =>
    setMessageData({ ...messageData, message: e.target.value })
  }
  className="w-full border p-4 rounded-lg"
/>
                <button
  type="submit"
  disabled={msgLoading}
  className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition"
>
  {msgLoading ? "Sending..." : "Submit Inquiry"}
</button>

              </form>

            </div>

            {/* Consultation Booking */}
            <div className="bg-gradient-to-b from-gray-900 via-purple-900 to-gray-400 text-white text-white p-8 rounded-xl shadow-lg">

              <h2 className="text-3xl font-bold mb-6">
                Book Free Consultation
              </h2>

              <p className="mb-6">
                Schedule a free strategy call with our influencer
                marketing experts.
              </p>

              <form
  className="space-y-5"
  onSubmit={handleBooking}
>
  <input
    type="text"
    placeholder="Name"
    value={bookingData.name}
    onChange={(e) =>
      setBookingData({
        ...bookingData,
        name: e.target.value,
      })
    }
    className="w-full p-4 rounded-lg text-black bg-white"
    required
  />

  <input
    type="email"
    placeholder="Email"
    value={bookingData.email}
    onChange={(e) =>
      setBookingData({
        ...bookingData,
        email: e.target.value,
      })
    }
    className="w-full p-4 rounded-lg text-black bg-white"
    required
  />

  <input
    type="date"
    value={bookingData.date}
    onChange={(e) =>
      setBookingData({
        ...bookingData,
        date: e.target.value,
      })
    }
    className="w-full p-4 rounded-lg text-black bg-white"
    required
  />

  <input
    type="time"
    value={bookingData.time}
    onChange={(e) =>
      setBookingData({
        ...bookingData,
        time: e.target.value,
      })
    }
    className="w-full p-4 rounded-lg text-black bg-white"
    required
  />
<button
  type="submit"
  disabled={loading}
  className={`w-full py-4 rounded-lg font-bold transition ${
    loading
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-blue-600 hover:bg-black text-white"
  }`}
>
  {loading ? "Loading..." : "Book Consultation"}
</button>
{loading && (
  <p className="text-center mt-3 text-emerald-300 animate-pulse font-semibold">
    Please wait... Processing your consultation request.
  </p>
)}


</form>

            </div>

          </div>

        </div>

      </section>

      {/* Google Map */}
      <section className="pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-10">
            Our Location
          </h2>

          <div className="rounded-xl overflow-hidden shadow-lg">

            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb="
              width="100%"
              height="450"
              allowFullScreen=""
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </section>

      {/* Social Media */}
      <section className="bg-gray-100 py-20">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold mb-8">
            Follow Us
          </h2>

          <div className="flex justify-center gap-8 text-4xl">

            <a href="#">
              <FaInstagram className="hover:text-pink-500 transition" />
            </a>

            <a href="#">
              <FaLinkedin className="hover:text-blue-600 transition" />
            </a>

            <a href="#">
              <FaYoutube className="hover:text-red-600 transition" />
            </a>

            <a href="#">
              <FaWhatsapp className="hover:text-green-500 transition" />
            </a>

          </div>

        </div>

      </section>
</div>
      <Footer />
    </>
  );
}

export default Contact;