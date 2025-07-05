import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const  {isAuthenticated,setIsAuthenticated,setProfile} = useAuth();
const navigate = useNavigate()  
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [role,setRole] = useState("")
  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password || !role) {
      toast.error("Please fill all fields");
      return;
    }
  
    try {
      const { data } = await axios.post(
        "https://blog-application-23z7.onrender.com/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      toast.success("✅ User login successfully...");
      setProfile(data.user);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please try again.";
    
      if (message.includes("blocked")) {
        toast.custom((t) => (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md max-w-md w-full">
            <strong className="block text-lg mb-2">🚫 Access Denied</strong>
            <span>{message}</span>
            <div className="text-right mt-4">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate("/login");
                }}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
              >
                OK
              </button>
            </div>
          </div>
        ), { duration: 6000 });
      } else {
        toast.error(message);
      }
    }    
  };
  
   
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
      <form  onSubmit={handleLogin}>
      <div className='font-semibold text-xl items-center text-center'> 
          <span className='text-blue-900 text-2xl'>Penora⚡</span>
        </div>
        <h1 className="text-xl font-semibold mb-6 ">Login</h1>
        <select value={role} onChange={(e)=>{setRole(e.target.value)}} className="w-full p-2 mb-4 border rounded-md ">
          <option value="">Select Role</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      <div className="mb-4">
      <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="w-full p-2 border rounded-md " autoComplete="username" required/>
      </div>
      <div className="mb-4">
      <input type="password"  placeholder="Enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="w-full p-2 border rounded-md " autoComplete="current-password"  required/>
      </div>
              <p className="text-center mb-4">New User?&nbsp;&nbsp; <Link to={"/register"} className="text-blue-700 ">Register now</Link></p>
       <div className="flex justif y-center">
       <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
  Login
</button>
       </div>
      </form>
    </div>
     </div>
  )
};

export default Login;
