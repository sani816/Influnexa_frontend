import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "../config/Config";
import { useAuth } from "../context/AuthContext";
function Login() {
  const navigate = useNavigate();
const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${Config.API_URL}/api/auth/login`,
        formData
      );

      login(
  response.data.token,
  response.data.user
);

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900">

      <form
        onSubmit={loginUser}
        className="bg-white rounded-xl shadow-xl p-8 w-[400px]"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

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
          className="w-full border p-3 rounded mb-5"
        />

        <button
          disabled={loading}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-5 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-600 font-semibold"
          >
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;