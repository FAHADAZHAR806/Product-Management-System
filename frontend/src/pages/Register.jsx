import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api/auth"
      : "https://mongo-db-production-262b.up.railway.app/api/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/register`, formData);
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4 font-sans">
      {/* Background Decor (Matching with Login) */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-5">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl shadow-blue-100/50 border border-gray-100 mb-4 transition-transform hover:rotate-6">
            <span className="text-3xl">🚀</span>
          </div> */}
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Get Started
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Create your account for PROMGR
          </p>
        </div>

        {/* Professional Card */}
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/80 relative overflow-hidden">
          {/* Subtle Decorative Gradient inside card */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-blue-50 rounded-full blur-2xl"></div>

          <form onSubmit={handleSubmit} className="space-y-5 relative">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your Full Name"
                required
                className="w-full px-5 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 focus:bg-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none text-gray-900 placeholder:text-gray-400"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your Email"
                required
                className="w-full px-5 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 focus:bg-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none text-gray-900 placeholder:text-gray-400"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                className="w-full px-5 py-4 bg-gray-50/50 rounded-2xl border border-gray-100 focus:bg-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none text-gray-900 placeholder:text-gray-400"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-white transition-all transform active:scale-[0.98] shadow-lg flex justify-center items-center mt-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Free Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-gray-50">
            <p className="text-gray-500 font-medium text-sm">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
