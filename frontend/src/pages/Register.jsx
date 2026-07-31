import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "../config/Config";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${Config.API_URL}/api/auth/register`,
        {
          name,
          email,
          password
        }
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900">

      <form
        onSubmit={registerUser}
        className="bg-white p-8 rounded-xl shadow-xl w-[400px]"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-5"
        />

        <button
          disabled={loading}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-5 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;