import React from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar"

function Dashboard() {
  const {profile,isAuthenticated}=useAuth();
  console.log("profile" ,profile)
  console.log("isAuth" ,isAuthenticated)
   
  return (
    <div>
     <div>
      <Sidebar/>
     </div>
  </div>
  )
};

export default Dashboard;
