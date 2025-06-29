import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:3001/logout", {
        withCredentials: true,
      });
      toast.success(data.message);
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <>
      <nav className="bg-[#1e1e2e] text-white shadow-md fixed top-0 left-0 w-full z-50 px-6 py-3">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-wide cursor-pointer">
            <span className="text-white">Penora⚡</span>
          </div>

          <ul className="hidden md:flex space-x-6 text-md font-medium text-gray-300">
            <Link to="/" className="hover:text-blue-400 transition">Home</Link>
            <Link to="/blogs" className="hover:text-blue-400 transition">Blogs</Link>
            <Link to="/creators" className="hover:text-blue-400 transition">Creators</Link>
            <Link to="/about" className="hover:text-blue-400 transition">About</Link>
            <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
          </ul>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && profile?.role === "admin" && (
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:brightness-110 transition"
              >
                Dashboard
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative group">
                <img
                  src={profile?.photo?.url || "/default-avatar.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 cursor-pointer"
                />
                <div className="absolute right-0 mt-2 bg-[#2c2c3b] border border-gray-700 shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition duration-200 z-50 w-44">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-700 text-white"
                  >
                    👤 View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-600 text-red-400"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden cursor-pointer" onClick={() => setShow(!show)}>
            {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
          </div>
        </div>

        {show && (
          <div className="md:hidden mt-4 bg-[#2a2a3d] rounded-md shadow-md">
            <ul className="flex flex-col items-center py-6 space-y-4 font-medium text-white text-lg">
              <Link to="/" onClick={() => setShow(false)} className="w-64 text-center px-6 py-3 rounded-md bg-gray-700 hover:bg-gray-600 transition">Home</Link>
              <Link to="/blogs" onClick={() => setShow(false)} className="w-64 text-center px-6 py-3 rounded-md bg-gray-700 hover:bg-gray-600 transition">Blogs</Link>
              <Link to="/creators" onClick={() => setShow(false)} className="w-64 text-center px-6 py-3 rounded-md bg-gray-700 hover:bg-gray-600 transition">Creators</Link>
              <Link to="/about" onClick={() => setShow(false)} className="w-64 text-center px-6 py-3 rounded-md bg-gray-700 hover:bg-gray-600 transition">About</Link>
              <Link to="/contact" onClick={() => setShow(false)} className="w-64 text-center px-6 py-3 rounded-md bg-gray-700 hover:bg-gray-600 transition">Contact</Link>

              {isAuthenticated && profile?.role === "admin" && (
                <Link
                  to="/dashboard"
                  onClick={() => setShow(false)}
                  className="w-64 text-center px-6 py-3 rounded-md bg-blue-700 hover:bg-blue-800 transition"
                >
                  Dashboard
                </Link>
              )}

              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setShow(false);
                  }}
                  className="w-64 px-6 py-3 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                >
                  🚪 Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setShow(false)}
                  className="w-64 text-center px-6 py-3 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Login
                </Link>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
