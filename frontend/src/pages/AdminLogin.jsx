import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminBg from "../assets/admin-bg.jpg";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "saniakhatun622@gmail.com" &&
      password === "sania123"
    ) {
      localStorage.setItem("adminToken", "loggedin");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center relative px-4"
      style={{
        backgroundImage: `url(${adminBg})`,
      }}
    >
      <form
        onSubmit={handleLogin}
        className="
          bg-gradient-to-b from-indigo-200 via-cyan-400 to-black
          text-white
          p-6 sm:p-8
          rounded-xl
          w-full max-w-[420px]
          shadow-lg
        "
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-2">
          InfluNexa
        </h1>

        <h2 className="text-white text-xl sm:text-3xl mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full p-3 rounded mb-4 bg-pink-100 text-black text-sm sm:text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded mb-4 bg-pink-100 text-black text-sm sm:text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-cyan-500 text-white p-3 rounded text-sm sm:text-base hover:scale-105 transition">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;