import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import UpdateBlog from "../dashboard/UpdateBlog";
import CreateBlog from "../dashboard/CreateBlog";
import MyBlog from "../dashboard/MyBlogs";
import MyProfile from "../dashboard/MyProfile";
import UserList from "../dashboard/UserList";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const [component, setComponent] = useState("My Blogs");
  const { profile, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-[#1e1e2e] text-white">
      {/* Sidebar fixed on left */}
      <div className="w-64 fixed top-0 left-0 bottom-0 bg-[#2c2c3b] shadow-lg z-40">
        <Sidebar component={component} setComponent={setComponent} />
      </div>

      {/* Main content area with left margin */}
      <div className="ml-64 flex-1 p-6 bg-[#1e1e2e] min-h-screen overflow-auto">
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "UpdateBlog" ? (
          <UpdateBlog />
        ) : component === "User List" ? (
          <UserList />
        ) : (
          <MyBlog />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
