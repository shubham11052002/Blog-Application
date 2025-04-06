import React from 'react'
import { Route,Routes,useLocation } from 'react-router-dom'
import Navbar from '../src/components/Navbar.jsx'
import Blogs from "../src/pages/Blogs.jsx"
import Home from "../src/components/Home.jsx"
import About from "../src/pages/About.jsx"
import Contact from "../src/pages/Contact.jsx"
import Dashboard from "../src/pages/Dashboard.jsx"
import Login from "../src/pages/Login.jsx"
import Register from "../src/pages/Register.jsx"
import Footer from "../src/components/Footer.jsx"
import { useAuth } from './context/AuthProvider.jsx'
import Creators from "../src/pages/Creators.jsx"
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();
  const { blogs } = useAuth();
  // console.log("Blogs are here ",blogs)
  const hideNavbarFooter = ["/dashboard","/login","/register"].includes(
    location.pathname
  )

  return (
    <div>
     {!hideNavbarFooter &&  <Navbar/>}
      <Routes>
         <Route exact path="/" element={<Home/>}/> 
        <Route exact path="/blogs" element={<Blogs/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
        <Route exact path='creators' element={<Creators/>} />
      </Routes>
      <Toaster />
   {/* { !hideNavbarFooter && <Footer/> } */}
    </div>
  )
}

export default App
