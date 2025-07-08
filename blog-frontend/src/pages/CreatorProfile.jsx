import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CreatorProfile() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => { 
    const fetchCreator = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/creator/${id}`);
        setCreator(data.user);
      } catch (error) {
        console.error("Error fetching creator:", error);
      }
    };
    fetchCreator();
  }, [id, baseURL]);

  if (!creator) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 pt-[80px]">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm">
        <div className="relative">
          <img
            src={creator.photo.url}
            alt="background"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 translate-y-1/2">
            <img
              src={creator.photo.url}
              alt="avatar"
              className="w-24 h-24 rounded-full mx-auto border-4 border-white object-cover shadow-lg"
            />
          </div>
        </div>
        <div className="px-6 pt-16 pb-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800">{creator.name}</h2>
          <p className="text-sm text-gray-600 mt-1">{creator.email}</p>
          <p className="text-sm text-gray-600">{creator.phone}</p>
          <p className="text-sm text-gray-600">{creator.role}</p>
        </div>
      </div>
    </div>
  );
}

export default CreatorProfile;
