import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../Pages/Redux/authslice"; // Import Redux action

const LoginPopup = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://rental-management-20jo.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      dispatch(login({ user: data.user, token: data.token }));
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/70 hover:bg-white text-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition"
        >
          ✕
        </button>

        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-3 text-center">Login</h2>
          <h3 className="text-1xl font-medium mb-6 text-center">welcome back again</h3>

          {error && (
            <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg text-lg font-medium disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-500">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => {
                onClose();
                onSwitchToSignUp();
              }}
            >
              Sign Up
            </span>
          </p>
        </div>

        {/* Right - Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-50 py-12">
          <img
            src="https://res.cloudinary.com/dzsvjyg2c/image/upload/undraw_access-account_aydp_wgiwhj.svg"
            alt="Login Illustration"
            className="w-4/5 h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;

