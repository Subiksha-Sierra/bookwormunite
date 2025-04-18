import React, { useState } from "react";
import { Book, X, ArrowRight, GraduationCap, Library, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (username.trim() === "" && password.trim() === "") {
      setErrorMessage("Please fill in both username and password.");
    } else if (username.trim() === "") {
      setErrorMessage("Please fill in the username.");
    } else if (password.trim() === "") {
      setErrorMessage("Please fill in the password.");
    } else {
      setErrorMessage("");
      alert("Student login successful!");
      navigate("/books");
    }
  };

  const handleClose = () => {
    setShowLogin(false);
    setUsername("");
    setPassword("");
    setRememberMe(false);
    setErrorMessage("");
    setIsSubmitted(false);
  };

  return (
    <div className="relative w-screen min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background bubble */}
      <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-blue-600 rounded-full opacity-10">
        <div className="absolute top-[40%] right-[40%] transform rotate-12">
          <Library className="w-64 h-64 text-blue-600 opacity-50" />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-10 h-10 text-indigo-700" />
                <h1
                  className="text-4xl lg:text-5xl font-bold text-indigo-700"
                  style={{ fontFamily: "'Lilita One', sans-serif" }}
                >
                  LIBRARY
                </h1>
              </div>
              <p
                className="text-xl lg:text-2xl font-semibold text-gray-800"
                style={{ fontFamily: "'Lilita One', sans-serif" }}
              >
                DEPARTMENT OF INFORMATION TECHNOLOGY
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center mb-12 px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Department Library
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please login to continue.
          </p>
        </div>

        <div className="flex gap-6">
          {/* Student Login Button */}
          <button
            onClick={() => setShowLogin(true)}
            className="group relative px-8 py-4 bg-white border-2 border-indigo-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-3">
              <Book className="w-8 h-8 text-indigo-600" />
              <span className="font-semibold text-indigo-600">Student Access</span>
            </div>
          </button>

          {/* Admin Access Button */}
          <button
            onClick={() => navigate("/admin-login")}
            className="group relative px-8 py-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-black" />
              <span className="font-semibold text-black">Admin Access</span>
            </div>
          </button>
        </div>
      </div>

      {/* Student Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Student Login</h2>
            </div>

            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
                  Forgot password?
                </a>
              </div>

              {isSubmitted && errorMessage && (
                <div className="text-center">
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-white border border-gray-300 text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="absolute bottom-0 w-full bg-blue-900 py-6 text-center">
        <p className="text-white">
          &copy; 2025 Department of Information Technology Library. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
