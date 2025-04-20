import React, { useState } from "react";
import { ShieldCheck, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // Mock API function
  const mockAdminLogin = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "admin123") {
          resolve({ success: true, message: "Admin login successful!" });
        } else {
          reject({ success: false, message: "Invalid admin credentials." });
        }
      }, 1000); // 1 second delay
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!username || !password) {
      setErrorMessage("Please fill in both username and password.");
      return;
    }

    setErrorMessage("");

    try {
      const res = await mockAdminLogin(username, password);
      alert(res.message);
      navigate("/admin");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleClose = () => {
    navigate("/"); // Back to home
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 pt-12 relative">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-indigo-600" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {isSubmitted && errorMessage && (
            <p className="text-center text-red-500 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
