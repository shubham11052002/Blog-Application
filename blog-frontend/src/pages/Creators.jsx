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
    <div className="flex flex-wrap justify-center items-center my-10 gap-6 bg-gray-100 px-4">
      {creators.map((creator) => (
        <Link
          to={`/creator/${creator._id}`}
          key={creator._id}
          className="w-72 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative h-32 w-full overflow-hidden rounded-t-xl">
            <img
              src={creator.photo.url}
              alt="background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-[-24px] flex justify-center">
              <img
                src={creator.photo.url}
                alt="avatar"
                className="w-16 h-16 rounded-full border-4 border-white shadow-md"
              />
            </div>
          </div>
          <div className="pt-10 pb-4 px-4 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              {creator.name}
            </h2>
            <p className="text-sm text-gray-600">{creator.email}</p>
            <p className="text-sm text-gray-600">{creator.phone}</p>
            <p className="text-sm text-gray-600">{creator.role}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Creators;
