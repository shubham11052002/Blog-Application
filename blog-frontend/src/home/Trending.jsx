import React from "react";
import { Link } from "react-router-dom";

const Trending = () => {
  return <div>
    {blogs && blogs.length > 0 ? (
        blogs.slice(0,4).map((element)=>{
          return ( 
            <Link to={`/`} key={element._id} className='bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
              <div className=' group relative'>
                <img src={element.blogImage.url} alt="" className='w-full h-56 object-cover'/>
                <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300'></div>
                <h1 className='absolute bottom-4 left-4 text-white text-xl font-semibold group-hover:text-yellow-500  transition-colors duration-300:'>{element.title}</h1>
              </div>
              <div className='p-6 flex items-center '>
                <img src={element.adminPhoto} alt="" className='h-12 w-12 rounded-full border-2 border-blue-400'/>
                <div className='ml-4'>
                <p className='text-lg font-semibold text-gray-900 font-serif'>{element.adminName}</p>
                <p className='text-xs text-gray-600 font-light'><b>New  blog is here</b></p>
                </div>
              </div>
            </Link>
          )
        })
      ) : (<div>No blogs found</div>) }
  </div>;
};

export default Trending;
