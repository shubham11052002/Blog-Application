import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Register = () => {
  const  {isAuthenticated,setIsAuthenticated,setProfile} = useAuth();
const navigateTo = useNavigate()

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [password,setPassword] = useState("")
  const [role,setRole] = useState("")
  const [education,setEducation] = useState("")
  const [photo,setPhoto] = useState("")
  const [photoPreview,setPhotoPreview] = useState("")
  
  const photoHandler = (e) =>{
    // console.log(e)
    const file = e.target.files[0];
   if(file){
    const reader= new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () =>{
     setPhotoPreview(reader.result);
     setPhoto(file);
   }
    }
  }

  const handleRegister =  async (e) =>{
    e.preventDefault()
    if(!name || !email || !phone || !password || !role || !education){
    toast.error("❌ Please fill all required field...")
      return;
    }
    const formData = new FormData()
    formData.append('name',name)
    formData.append('email',email)
    formData.append('phone',phone)
    formData.append('password',password)
    formData.append('role',role)
    formData.append('education',education)
    formData.append('photo',photo)
    try {
      const {data} = await axios.post("https://blog-application-23z7.onrender.com/register",formData,{
        withCredentials:true,
        headers:{
          "Content-Type":"multipart/form-data",
        },
      })
      // console.log(data, "response data ...")
      if(data.success){
      toast.success("Usre register sucessfully...")
      setProfile(data)
      setIsAuthenticated(true);
      setName("")
      setEmail("")
      setPhone("")
      setPassword("")
      setRole("")
      setEducation("")
      setPhoto("")
      setPhotoPreview("")
      navigateTo("/")
      }
      else{
       toast.error(`❌ Error ${data.message}`)
      }
    } catch (error) {
      console.log(error, 'error in register...')
      toast.error(error.message || " please fill required fields...")
    }
  }
   
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
      <form  onSubmit={handleRegister}>
      <div className='font-semibold text-xl items-center text-center'> 
          <span className='text-blue-900 text-2xl'>Penora⚡</span>
        </div>
        <h1 className="text-xl font-semibold mb-6 ">Register</h1>
        <select value={role} onChange={(e)=>{setRole(e.target.value)}} on className="w-full p-2 mb-4 border rounded-md ">
          <option value="">Select Role</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      <div className="mb-4"> 
      <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>{setName(e.target.value)}} className="w-full p-2 border rounded-md "/>
      </div>
      <div className="mb-4">
      <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="w-full p-2 border rounded-md " autoComplete="username" required/>
      </div>
      <div className="mb-4">
      <input type="number" placeholder="Enter your phone number" value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="w-full p-2 border rounded-md "/>
      </div>
      <div className="mb-4">
      <input type="password"  placeholder="Enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="w-full p-2 border rounded-md " autoComplete="current-password"  required/>
      </div>
      <select value={education} onChange={(e)=>{setEducation(e.target.value)}} className="w-full p-2 mb-4 border rounded-md ">
          <option value="">Select your Education</option>
          <option value="B.tech">B.tech</option>
          <option value="M.tech">M.tech</option>
        </select>
        <div className="flex items-center mb-4">
          <div className="photo w-20 h-20 mr-4">
          <img src={photoPreview ? photoPreview : "default-image.png"} alt="photo" className="w-full h-full object-cover" />
          </div>
            <input type="file" onChange={photoHandler} className="w-full p-2 border rounded-md" />
        </div>
        <p className="text-center mb-4">Already register?&nbsp;&nbsp; <Link to={"/login"} className="text-blue-700 ">Login now</Link></p>
       <div className="flex justif y-center">
       <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
  Register
</button>
       </div>
      </form>
    </div>
     </div>
  )
};

export default Register;
