import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-US", {
        weekday: "short", 
        day: "numeric",  
        month: "short",     
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setDateTime(formatted.replace(",", " ·"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${baseURL}/logout`, {
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
    <nav className="bg-[#1e1e2e] text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="w-full px-4 md:px-10 py-3 flex items-center justify-between">

        <div className="flex-shrink-0">
        <span className="text-3xl font-bold tracking-wide text-white inline-block hover:text-red-400 transition duration-1000">
  Penora⚡
</span>
        </div>

        <div className="hidden md:flex space-x-6 text-md font-medium text-gray-300">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/blogs" className="hover:text-blue-400 transition">Blogs</Link>
          <Link to="/creators" className="hover:text-blue-400 transition">Creators</Link>
          <Link to="/about" className="hover:text-blue-400 transition">About</Link>
          <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
        <div className="hidden sm:flex items-center px-2 py-1 text-sm text-gray-400 bg-[#2a2a3d] rounded-md shadow-inner hover:text-blue-400 hover:shadow-red-600">
  {dateTime}
</div>

          {isAuthenticated ? (
            <div className="relative group">
              <img
                src={profile?.photo?.url || "/default-avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 cursor-pointer"
              />
              <div className="absolute right-0 mt-2 bg-[#2c2c3b] border border-gray-700 shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition duration-200 z-50 w-44">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-700 text-white"
                >
                  {profile?.role === "admin" ? "🛠️ Dashboard" : "👤 My Profile"}
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
        <div className="md:hidden bg-[#2a2a3d] px-6 pb-4">
          <ul className="flex flex-col space-y-4 mt-4 text-white text-lg font-medium">
            <Link to="/" onClick={() => setShow(false)} className="hover:text-blue-400">Home</Link>
            <Link to="/blogs" onClick={() => setShow(false)} className="hover:text-blue-400">Blogs</Link>
            <Link to="/creators" onClick={() => setShow(false)} className="hover:text-blue-400">Creators</Link>
            <Link to="/about" onClick={() => setShow(false)} className="hover:text-blue-400">About</Link>
            <Link to="/contact" onClick={() => setShow(false)} className="hover:text-blue-400">Contact</Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setShow(false)}
                  className="text-blue-400"
                >
                  {profile?.role === "admin" ? "🛠️ Dashboard" : "👤 My Profile"}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setShow(false);
                  }}
                  className="text-red-400 text-left"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setShow(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition w-fit"
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
