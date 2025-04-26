import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar"
import UpdateBlog from "../dashboard/UpdateBlog";
import CreateBlog from "../dashboard/CreateBlog";
import MyBlog from "../dashboard/MyBlogs"
import MyProfile from "../dashboard/MyProfile" 

function Dashboard() {
  const [component ,setComponent] = useState("My Blogs")
  const {profile,isAuthenticated}=useAuth();
  console.log("profile" ,profile)
  // console.log("isAuth" ,isAuthenticated)
   
  return (
    <div>
     <div>
      <Sidebar component={component} setComponent={setComponent} />
      {component==="My Profile" ? (<MyProfile/>):component==="Create Blog"?(<CreateBlog/>):component==="UpdateBlog"?(<UpdateBlog/>):(<MyBlog/>)}
     </div>
  </div>
  )
};

export default Dashboard;
