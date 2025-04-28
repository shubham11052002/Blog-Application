import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { FiMenu } from "react-icons/fi";

function Sidebar({ setComponent }) {
  const { profile, isAuthenticated, loading, setIsAuthenticated } = useAuth();
  const [show,setShow] = useState(false)
  const navigate = useNavigate();

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!isAuthenticated || !profile) {
    return <div className="p-4 text-red-500 text-center">User not logged in</div>;
  }

  const handleNavigation = (section) => {
    setComponent(section);
  };

  const navigateHome = () => {
    navigate("/");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:3001/logout", {
        withCredentials: true,
      });
      console.log(data);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred while logging out.");
    }
  };

  return (
   <>
   <div>
    <h1>react fragmentations 
      
    </h1>
   </div>
    <div className="w-64 min-h-screen bg-white shadow-md border-r border-gray-200 p-6 flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center mb-8">
          <img
            src={profile?.photo?.url}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-green-500 mb-2"
          />
          <p className="text-lg font-semibold text-gray-700">{profile?.name}</p>
        </div>
        <FiMenu />

        <ul className="space-y-4">
          <li>
            <button
              onClick={() => handleNavigation("My Blogs")}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md text-base font-medium hover:bg-green-700 transition duration-300"
            >
              My Blogs
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("Create Blog")}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-base font-medium hover:bg-blue-700 transition duration-300"
            >
              Create Blog
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("My Profile")}
              className="w-full px-4 py-2 bg-pink-500 text-white rounded-md text-base font-medium hover:bg-pink-600 transition duration-300"
            >
              My Profile
            </button>
          </li>
          <li>
            <button
              onClick={navigateHome}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md text-base font-medium hover:bg-gray-800 transition duration-300"
            >
              Home
            </button>
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-md text-base font-medium hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
   </>
  );
}

export default Sidebar;
