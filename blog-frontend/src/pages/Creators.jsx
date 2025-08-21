import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

function Creators() {
  const [creators, setCreators] = useState([]);
  const [filteredCreators, setFilteredCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [navigatingTo, setNavigatingTo] = useState(null);
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/admins`, {
          withCredentials: true,
        });
        setCreators(data.admins);
        setFilteredCreators(data.admins);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCreators();
  }, [baseURL]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCreators(creators);
    } else {
      const filtered = creators.filter((creator) =>
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCreators(filtered);
    }
  }, [searchQuery, creators]);

  const handleCreatorClick = (id) => {
    setNavigatingTo(id);
    setTimeout(() => {
      navigate(`/creator/${id}`, { replace: true });
    }, 600);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f1c]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7f5af0]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 py-12 mt-5 bg-[#0f0f1c] relative">
      {navigatingTo && (
        <div className="fixed inset-0 bg-[#0f0f1c]/80 z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7f5af0]"></div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7f5af0] to-[#9370ff] mb-4">
            Our Creative Team
          </h1>

          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-[#94a3b8]" />
            </div>
            <input
              type="text"
              placeholder="Search by name or email..."
              className="block w-full pl-10 pr-3 py-3 bg-[#161627] border border-[#2a2a3a] rounded-lg text-white placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#7f5af0] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            /> 
          </div>
          <div className="mr-10 m-2 font-bold ">Total Creators : {filteredCreators.length}</div>
        </motion.div>
        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCreators.map((creator, index) => (
            <motion.div
              key={creator._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.4,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -8 }}
              className="flex justify-center"
            >
              <div
                onClick={() => handleCreatorClick(creator._id)}
                className="w-full group cursor-pointer relative"
              >
                <div className="bg-[#161627] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-[#2a2a3a] hover:border-[#7f5af0]/50 h-full flex flex-col">
                  <motion.div
                    className="relative h-40 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={creator.photo.url}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1c]/80 via-[#0f0f1c]/10 to-transparent"></div>
                  </motion.div>

                  <div className="flex flex-col items-center px-5 pb-6 pt-2 relative -mt-10 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="relative"
                    >
                      <img
                        src={creator.photo.url}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full border-4 border-[#161627] object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-full border-2 border-[#7f5af0]/30 group-hover:border-[#7f5af0]/80 transition-all duration-300"></div>
                    </motion.div>

                    <div className="text-center mt-4 w-full">
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#9370ff] transition-colors">
                        {creator.name}
                      </h3>
                      <p className="text-sm text-[#7f5af0] font-medium mt-1">
                        {creator.role}
                      </p>

                      <div className="mt-4 pt-4 border-t border-[#2a2a3a]">
                        <div className="flex justify-center">
                          <div className="text-center">
                            <p className="text-xs text-[#94a3b8]">Contact</p>
                            <p className="text-sm text-gray-300 font-medium mt-1 truncate max-w-[180px]">
                              {creator.email}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {creator.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCreators.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-block p-6 bg-[#161627] rounded-xl border border-[#2a2a3a]">
              <p className="text-gray-400">
                {searchQuery ? "No matching creators found" : "No team members found"}
              </p>
              <p className="text-sm text-[#7f5af0] mt-2">
                {searchQuery ? "Try a different search" : "Check back later"}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Creators;
