
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Auth";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://note-app-7hll.onrender.com/api/v1/user/login",
        formData,
        { withCredentials: true }
      );

      setUser(res.data.user);
      navigate("/");

      setFormData({
        email: "",
        password: "",
      });

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-amber-100">
      <form
        onSubmit={handleSubmit}
        className="card w-96 bg-base-100 shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold text-center mb-5">Login</h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Your email"
          value={formData.email}
          onChange={handleChange}
          className={`input input-bordered w-full mb-5 ${
            error ? "border-red-500" : ""
          }`}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          value={formData.password}
          onChange={handleChange}
          className={`input input-bordered w-full mb-5 ${
            error ? "border-red-500" : ""
          }`}
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 font-bold mb-5"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Redirect */}
        <div className="flex justify-center items-center gap-3 mt-3">
          <h5>New User? Sign up please</h5>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="bg-red-400 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-500 hover:cursor-pointer"
          >
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

