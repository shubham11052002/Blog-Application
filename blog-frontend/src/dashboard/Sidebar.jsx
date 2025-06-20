import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import toast from "react-hot-toast";

function Sidebar({ setComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
  };

  const gotoHome = () => {
    navigateTo("/");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:3001/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
      localStorage.removeItem("jwt"); // deleting token in localStorage so that if user logged out it will go to login page
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  const handleDeleteAllBlogs = async () => {
    const confirmDelete = window.confirm("⚠️ Are you sure you want to delete ALL blogs? This action cannot be undone!");
  
    if (!confirmDelete) {
      toast("Deletion cancelled");
      return;
    }
  
    try {
      const res = await axios.delete("http://localhost:3001/delete-all", {
        withCredentials: true,
      });
  
      toast.success(res.data.message);
      // Optionally refresh blog list
    } catch (error) {
      console.error("Delete all error:", error);
      toast.error("Failed to delete all blogs");
    }
  };

  return (
    <>
      <div
        className="sm:hidden fixed top-4 left-4 z-50 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-2xl" />
      </div>

      <div
        className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300 transform z-50 sm:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="sm:hidden absolute top-4 right-4 text-xl cursor-pointer"
          onClick={() => setShow(false)}
        >
          <BiSolidLeftArrowAlt className="text-2xl" />
        </div>

        <div className="text-center mt-8">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-2 object-cover border-4 border-green-500"
            src={profile?.photo?.url} 
            alt="Profile"
          />
          <p className="text-lg font-semibold text-gray-700">{profile?.name}</p> 
        </div>

        <ul className="space-y-6 mx-4 mt-10">
          <button
            onClick={() => handleComponents("My Blogs")}
            className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300 text-white"
          >
            MY BLOGS
          </button>
          <button
            onClick={() => handleComponents("Create Blog")}
            className="w-full px-4 py-2 bg-blue-400 rounded-lg hover:bg-blue-700 transition duration-300 text-white"
          >
            CREATE BLOG
          </button>
          <button
            onClick={() => handleComponents("My Profile")}
            className="w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300 text-white"
          >
            MY PROFILE
          </button>
          <button
            onClick={gotoHome}
            className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300 text-white"
          >
            HOME
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300 text-white"
          >
            LOGOUT
          </button>
    <button
  onClick={handleDeleteAllBlogs}
  className="w-full px-4 py-2 bg-orange-500 rounded-lg hover:bg-yellow-700 transition duration-300 text-white"
>
  Delete All Blogs
</button>

        </ul>
      </div>
    </>
  );
}

export default Sidebar;
