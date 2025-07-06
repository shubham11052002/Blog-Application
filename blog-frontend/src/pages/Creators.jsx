import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Creators() {
  const [creators, setCreators] = useState([]);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/admins`, {
          withCredentials: true,
        });
        setCreators(data.admins);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCreators();
  }, [baseURL]);

  return (
    <div className="flex flex-wrap justify-center items-start gap-4 bg-gray-100 px-4 pt-[80px] pb-10 min-h-screen">
      {creators.map((creator) => (
        <Link
          to={`/creator/${creator._id}`}
          key={creator._id}
          className="w-60 h-[320px] rounded-xl overflow-hidden shadow-xl relative group"
        >
         
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300">
          <img
            src={creator.photo.url}
            alt="background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          </div>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <img
              src={creator.photo.url}
              alt="avatar"
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
          <div className="absolute bottom-0 w-full bg-white bg-opacity-95 px-3 py-4 text-center">
            <h2 className="text-sm font-bold text-gray-800">{creator.name}</h2>
            <p className="text-xs text-gray-600">{creator.email}</p>
            <p className="text-xs text-gray-600">{creator.phone}</p>
            <p className="text-xs text-gray-600">{creator.role}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Creators;
