import React from "react";
import { useAuth } from "../context/AuthProvider";

function Dashboard() {
  const {profile,isAuthenticated}=useAuth();
    console.log(profile)
    console.log(isAuthenticated)
    if(!profile){
      return(<p>data is here {profile}</p>)
    }
  return (
    <div>
    <h1>this is Dashboard</h1>
  </div>
  )
};

export default Dashboard;
