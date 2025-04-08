import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const PupularCreators = () => {
  const [admin , setAdmin] = useState([]);
  useEffect(()=>{
  const fetchAdmins = async () =>{
    const {data} = await axios.get("http://localhost:3001/admins",{
      withCredentials:true,
    });
    console.log(data.admins, "admins data ")
    setAdmin(data.admins)
  }
  fetchAdmins();
  },[]);
  return (
    <div className='container mx-auto p-4 '>
      <h1 className='text-2xl font-semibold mb-9'>Popular Creators</h1>
     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 rounded-full my-5'>
     {admin && admin.length > 0 ? (
        admin.slice(0, 4).map((element) => {
          return (
            <div
              key={element._id}
              className='flex flex-col items-center'
            >
              <Link to={`/blog/${element._id}`}>
                <div className="">
                  <img
                    src={element.photo.url}
                    alt="blog"
                    className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-full  items-center border border-black mb-2"
                  />
                </div>
                <div className='text-center '>
                  <p className='font-serif font-bold'>{element.name}</p>
                  <p className='text-gray-600 text-xs font-bold'>{element.role}</p>
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <div className=" flex h-screen items-center justify-center">
          Loading....
        </div>
      )}
     </div>
    </div>
  )
}

export default PupularCreators
