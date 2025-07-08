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
    <div className="flex flex-wrap justify-center items-start gap-6 bg-gray-100 px-4 pt-[80px] pb-10 min-h-screen">
      {creators.map((creator) => (
        <Link
          to={`/creator/${creator._id}`}
          key={creator._id}
          className="w-60 rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition duration-300"
        >
          <div className="w-full h-32 relative">
          <img src={creator.photo.url} alt="background" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col items-center px-4 py-4">
            <img
              src={creator.photo.url}
              alt="avatar"
              className="w-16 h-16 rounded-full border-4 border-white -mt-8 object-cover shadow-md"
            />
            <h2 className="text-sm font-semibold text-gray-800 mt-2">
              {creator.name}
            </h2>
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
