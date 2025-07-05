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
    <div
      className="min-h-screen bg-cover bg-center pt-[72px] px-6 py-16"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1557682260-9670c696e9d7?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl p-8 max-w-7xl mx-auto shadow-xl">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-12">
          Meet the Creators
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {creators.map((creator) => (
            <div
              key={creator._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden relative"
            >
              {/* Top gradient banner */}
              <div className="h-24 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

              {/* Circular avatar */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                <img
                  src={creator.photo.url}
                  alt="avatar"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>

              {/* Card content */}
              <div className="pt-14 pb-6 px-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {creator.name}
                </h2>
                <p className="text-indigo-600 font-medium">{creator.role}</p>
                <p className="text-gray-600 mt-2 text-sm">{creator.email}</p>
                <p className="text-gray-600 text-sm">{creator.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Creators;
