import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBlogger,
  FaUserCircle,
  FaPlus,
  FaUsers,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt } from "react-icons/bi";
import toast from "react-hot-toast";

const Sidebar = ({ setComponent }) => {
  const { profile, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/logout", {
        withCredentials: true,
      });
      toast.success(data.message);
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const confirmDeleteAll = () => {
    toast((t) => (
      <span>
        <p className="text-white">⚠️ Delete all blogs permanently?</p>
        <div className="flex justify-end gap-4 mt-2">
          <button
            className="bg-red-600 px-3 py-1 text-white rounded"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const res = await axios.delete("http://localhost:3001/delete-all", {
                  withCredentials: true,
                });
                toast.success(res.data.message);
              } catch {
                toast.error("Failed to delete blogs");
              }
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 px-3 py-1 text-white rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </span>
    ));
  };

  const NavButton = ({ icon: Icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-5 py-3 hover:bg-gray-700 rounded-lg transition duration-200"
    >
      <Icon className="text-lg" />
      <span className="text-md">{label}</span>
    </button>
  );

  return (
    <>
      <div
        className="sm:hidden fixed top-4 left-4 z-50 text-white cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-3xl" />
      </div>

      <aside
        className={`fixed top-0 left-0 h-full w-72 z-40 bg-[#1f1f2f] text-white shadow-xl transition-transform duration-300 sm:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full"
        } flex flex-col justify-between`}
      >
<div className="relative flex flex-col items-center mt-8">
  <img
    src={profile?.photo?.url}
    alt="User"
    className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
  />
  <p className="mt-3 text-xl font-semibold">{profile?.name}</p>
  <p className="text-sm text-gray-400">{profile?.role.toUpperCase()}</p>

  <button
    title="Back to Home"
    onClick={() => navigate("/")}
    className="absolute left-4 top-0 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full shadow"
  >
    <BiSolidLeftArrowAlt className="text-xl" />
  </button>
</div>

        <div className="mt-10 px-4 space-y-2">
          <NavButton icon={FaUserCircle} label="My Profile" onClick={() => setComponent("My Profile")} />
          <NavButton icon={FaBlogger} label="My Blogs" onClick={() => setComponent("My Blogs")} />
          <NavButton icon={FaPlus} label="Create Blog" onClick={() => setComponent("Create Blog")} />

          {profile?.role === "admin" && (
            <>
              <NavButton icon={FaUsers} label="User List" onClick={() => setComponent("User List")} />
              <NavButton icon={FaTrash} label="Delete All Blogs" onClick={confirmDeleteAll} />
            </>
          )}
        </div>

        <div className="px-4 py-6">
        <button
  onClick={logoutHandler}
  className="w-full flex items-center justify-center gap-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white"
>
  <FaSignOutAlt />
  <span>Logout</span>
</button>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;
