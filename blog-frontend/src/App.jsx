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
import UpdateBlog from './dashboard/UpdateBlog.jsx'
import CreatorProfile from './pages/CreatorProfile.jsx'
import CreateBlog from './dashboard/CreateBlog.jsx'
// import MyBlogs from './dashboard/MyBlogs.jsx'
import { Detail } from './pages/Detail.jsx'

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
  <Route path="/" element={<Home />} />
  <Route path="/blogs" element={<Blogs />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/login" element={<Login />} />
  <Route path="/blogs/:id" element={<Detail />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/creators" element={<Creators />} />
  <Route path="/blog/update/:id" element={<UpdateBlog />} />
  <Route path='/creator/:id' element={<CreatorProfile/>} />
  <Route path='/create' element={<CreateBlog/>} />
</Routes>
      <Toaster />
   { !hideNavbarFooter && <Footer/> } 
    </div>
  )
}

export default App
