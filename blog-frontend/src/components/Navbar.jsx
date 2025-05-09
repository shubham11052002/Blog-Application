import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import {IoCloseSharp} from "react-icons/io5"
import axios from 'axios';

const Navbar = () => {
  // const {user, blogs} = useAuth();
  // console.log("Navbar Blog Data " ,blogs )
  const [show ,setShow] = useState(true);
  const {profile,isAuthenticated,setIsAuthenticated } = useAuth();
  console.log(profile)
  const navigateTo = useNavigate();

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

  return (
    <>
    <nav className='shadow-lg px-4 py-2'>
      <div className='flex justify-between container mx-auto '>  
        <div className='font-semibold text-2xl '> 
          <span className='text-blue-900 text-2xl'>Penora⚡</span>
        </div>
        <div className='mx-5' >
          <ul className='space-x-6 hidden md:flex text-neutral-600 '>
            <Link to="/" className='hover:bg-blue-100 hover:text-blue-600 p-2 rounded'>Home</Link>
            <Link to="/blogs" className='hover:bg-blue-100 hover:text-blue-600 p-2 rounded'>Blogs</Link>
            <Link to="/creators" className='hover:bg-blue-100 hover:text-blue-600 p-2 rounded'>Creators</Link>
            <Link to="/about" className='hover:bg-blue-100 hover:text-blue-600 p-2 rounded'>About</Link>
            <Link to="/contact" className='hover:bg-blue-100 hover:text-blue-600 p-2 rounded'>Contact</Link>
          </ul>
    <div className='md:hidden' onClick={()=>setShow(!show)}>
      {show?<IoCloseSharp size={20} />:<AiOutlineMenu size={20} />}
    </div>
        </div>

        <div className="space-x-2  font-bold hidden md:flex" >
  <Link to="/dashboard" className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
    Dashboard
  </Link>
  <Link to="/login" className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
    Login
  </Link>
</div>
      </div>
       {/* mobile navbar  */}
       {show && (

       <div className='bg-white'>
       <ul className='flex md:hidden text-neutral-600 font-bold flex-col h-screen items-center justify-center space-y-3'>
           <Link to="/" onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:bg-blue-100 hover:text-blue-600 p-2 rounded'>home</Link>
           <Link to="/blogs" onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:bg-blue-100 hover:text-blue-600 p-2 rounded'>blogs</Link>
           <Link to="/creators" onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:bg-blue-100 hover:text-blue-600 p-2 rounded'>creators</Link>
           <Link to="/about" onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:bg-blue-100 hover:text-blue-600 p-2 rounded'>about</Link>
           <Link to="/contact" onClick={()=>setShow(!show)} smooth="true" duration={500} offset={-70} activeClass="active" className='hover:bg-blue-100 hover:text-blue-600 p-2 rounded'>contact</Link>
         </ul> 
      </div> 
       )
      }
    </nav>
    </>
  )
}

export default Navbar
