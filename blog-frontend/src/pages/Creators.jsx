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
          className="w-72 h-[360px] relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          style={{
            backgroundImage: `url(${creator.photo.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

          <div className="absolute top-4 left-0 right-0 flex justify-center">
            <img
              src={creator.photo.url}
              alt="avatar"
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
          </div>

          <div className="absolute bottom-0 w-full bg-white bg-opacity-90 px-4 py-6 text-center">
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
