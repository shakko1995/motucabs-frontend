import { useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { Mail, Lock, LogIn, ShieldCheck, LoaderCircle } from 'lucide-react'; // Icons

export default function AdminLogin() {
  const { loginAdmin } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state ke liye
  const [error, setError] = useState(""); // Error message ke liye

  const handleLogin = async (e) => {
    e.preventDefault(); // Form submit hone se rokein
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setIsLoading(true);
    setError(""); // Purana error clear karein

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });
      loginAdmin(res.data.token);
      // useNavigate() ka upyog karna behtar hai, par abhi ke liye ye theek hai
      window.location.href = "/admin/dashboard";
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid credentials. Please try again.";
      setError(errorMessage);
      console.error("❌ Admin Login Error:", err.response?.data || err.message);
    } finally {
      setIsLoading(false); // Request complete hone par loading state false karein
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="flex justify-center items-center mb-6">
          <ShieldCheck className="h-10 w-10 text-blue-600" />
          <h1 className="ml-3 text-3xl font-bold text-gray-800">Admin Access</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 transition"
                  required
                />
              </div>
            </div>

            {/* Error Message Display */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center text-sm">
                    {error}
                </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2 h-5 w-5"/>
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5"/>
                  Login
                </>
              )}
            </button>
          </form>
        </div>
        <p className="text-center text-gray-500 text-xs mt-6">
          &copy;{new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
}