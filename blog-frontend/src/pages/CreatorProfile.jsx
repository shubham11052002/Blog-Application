import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiArrowLeft, FiMail, FiPhone, FiAward } from "react-icons/fi";

function CreatorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${baseURL}/creator/${id}`);
        setCreator(data.user);
      } catch (error) {
        console.error("Error fetching creator:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCreator();
  }, [id, baseURL]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Creator Not Found</h2>
          <p className="text-gray-600 mb-6">The requested creator profile could not be loaded.</p>
          <button
            onClick={() => navigate("/creators")}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f1c] pt-5 pb-20 mt-10">
      <div className="max-w-3xl mx-auto px-4">
        <motion.button
          onClick={() => navigate("/creators")}
          whileHover={{ x: -4 }}
          className="flex items-center text-white hover:bg-red-600 p-1 rounded hover:font-bold mb-6 transition duration-300"
        >
          <FiArrowLeft className="mr-2" />
          Back to Creators
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
<div 
  className="h-64 flex items-center justify-center bg-[#0f0f1c] px-4 relative overflow-hidden group border-b border-[#7f5af0]/30"
  style={{
    background: 'radial-gradient(ellipse at center, #1e1e2e 0%, #0f0f1c 100%)'
  }}
>
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
    <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-[#7f5af0] rounded-full filter blur-[90px] opacity-60 animate-float"></div>
    <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#2cb67d] rounded-full filter blur-[100px] opacity-50 animate-float-delay"></div>
  </div>

  <div className="relative w-full max-w-4xl mx-auto" style={{ height: '3.5rem' }}>
    <h1 className="text-center font-bold italic text-transparent font-playfair uppercase whitespace-nowrap"
      style={{
        fontSize: 'min(5vw, 4.5rem)',
        lineHeight: '1',
        letterSpacing: '0.1em',
        transform: 'scaleY(1.3)'
      }}
    >
      {creator.name.split('').map((letter, index) => (
        <span 
          key={index}
          className="relative inline-block"
          style={{
            WebkitTextStroke: '1px #7f5af0',
            padding: '0 0.05em'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
          
          <span 
            className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-[#7f5af0] via-[#9370ff] to-[#2cb67d] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              backgroundSize: '300% 300%',
              animation: 'gradientShift 4s ease infinite',
              WebkitTextStroke: '0px transparent'
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </h1>
  </div>

  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-1000">
    {[...Array(30)].map((_, i) => (
      <div 
        key={i}
        className="absolute rounded-full bg-white/80"
        style={{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 8 + 5}s linear infinite`,
          animationDelay: `${Math.random() * 5}s`
        }}
      />
    ))}
  </div>

  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute -inset-y-full -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300"></div>
  </div>
</div>
<style jsx global>{`
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(-150vh) rotate(720deg); opacity: 0; }
  }
  @keyframes float-delay {
    0% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-80px) scale(1.2); }
    100% { transform: translateY(-160px) scale(1); }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%) rotate(25deg); }
    100% { transform: translateX(300%) rotate(25deg); }
  }
`}</style>

          <div className="px-6 pb-8">
            <div className="flex flex-col items-center -mt-16 relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative"
              >
                <img
                  src={creator.photo?.url || "/default-avatar.jpg"}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl"
                />
                <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 hover:border-purple-400/80 transition-all duration-300"></div>
              </motion.div>

              <div className="text-center mt-4">
                <h1 className="text-2xl font-bold text-gray-900">{creator.name}</h1>
                <div className="flex items-center justify-center mt-1">
                  <FiAward className="text-purple-600 mr-1" />
                  <span className="text-purple-600 font-medium">{creator.role}</span>
                </div>
              </div>

              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="p-3 bg-purple-100 rounded-full mr-4">
                    <FiMail className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{creator.email}</p>
                  </div>
                </div>

                {creator.phone && (
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="p-3 bg-purple-100 rounded-full mr-4">
                      <FiPhone className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{creator.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700">
                    {creator.bio || "No additional information provided."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CreatorProfile;
