import React from "react";
import { useAuth } from "../context/AuthProvider";

function Sidebar(setComponent) {
  const { profile, isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated || !profile) {
    return <div>User not logged in</div>;
  }

  return (
    <div>
     <div> <img src={profile?.photo?.url} alt="Profile" />
     <p>{profile?.name}</p>
     </div>
     <ul>
        <li><button className="w-full px-4 py-2 bg-green-500 rounded-lg text-xl font-semibold font-sans hover:bg-green-700  transition duration-300">My Blogs</button></li>
        <li><button className="w-full px-4 py-2 bg-blue-500 rounded-lg text-xl font-semibold font-sans hover:bg-green-700  transition duration-300">Create Blogs</button></li>
        <li><button className="w-full px-4 py-2 bg-pink-500 rounded-lg text-xl font-semibold font-sans hover:bg-pink-700  transition duration-300">My Profile</button></li>
        <li><button className="w-full px-4 py-2 bg-red-500 rounded-lg text-xl font-semibold font-sans hover:bg-red-700  transition duration-300">Home</button></li>
        <li><button className="w-full px-4 py-2 bg-yellow-500 rounded-lg text-xl font-semibold font-sans hover:bg-yellow-700  transition duration-300">Logout</button></li>
     </ul>
    </div>
   
  );
}

export default Sidebar;
