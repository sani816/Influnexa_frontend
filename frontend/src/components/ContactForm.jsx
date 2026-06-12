import { useState } from "react";
import axios from "axios";
import Config from "../config/Config";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${Config.API_URL}/api/message/send-message`,
        formData
      );

      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });

      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error sending message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-black">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Book Free Consultation
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
          </div>

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full mt-6"
          />

          <textarea
            rows="5"
            name="message"
            placeholder="Tell us about your campaign"
            value={formData.message}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full mt-6"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg mt-6 hover:bg-indigo-700"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;