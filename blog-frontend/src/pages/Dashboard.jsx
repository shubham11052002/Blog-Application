import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar"
import UpdateBlog from "../dashboard/UpdateBlog";
import CreateBlog from "../dashboard/CreateBlog";
import MyBlog from "../dashboard/MyBlogs"
import MyProfile from "../dashboard/MyProfile"
import UserList from "../dashboard/UserList";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const [component ,setComponent] = useState("My Blogs")
  const {profile,isAuthenticated}=useAuth();
  // console.log("profile" ,profile)
  // console.log("isAuth" ,isAuthenticated)
  if(!isAuthenticated){
    return (
      <Navigate to={"/"}/>
    )
  }
   
  return (
    <div className="flex-1 bg-gray-50 ml-64 p-6 min-h-screen overflow-auto">
    <Sidebar component={component} setComponent={setComponent} />
    <div className="flex-1 p-6 bg-gray-50">
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "UpdateBlog" ? (
        <UpdateBlog />
      )  : component === "User List" ? 
      (<UserList/>) : (
        <MyBlog />
      )  
      }
    </div>  
  </div>
  
  )
};

export default Dashboard;
