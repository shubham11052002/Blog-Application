import axios from "axios";
import React, { useEffect, useState } from "react";

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
    <div className="flex flex-wrap justify-center items-center my-20 bg-gray-100">
      {creators.map((creator) => (
        <div
          key={creator._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full m-4"
        >
          <div className="relative w-full h-36 overflow-hidden">
            <img
              src={creator.photo.url}
              alt="background"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="relative -mt-10">
            <img
              src={creator.photo.url}
              alt="avatar"
              className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-md"
            />
          </div>

          <div className="px-4 py-6">
            <h2 className="text-center text-xl font-semibold text-gray-800">
              {creator.name}
            </h2>
            <p className="text-center text-gray-600 mt-2">{creator.email}</p>
            <p className="text-center text-gray-600 mt-2">{creator.phone}</p>
            <p className="text-center text-gray-600 mt-2">{creator.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Creators;
