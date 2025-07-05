import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/users`, {
        withCredentials: true,
      });
      setUsers(data.users);
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [baseURL]);

  const handleBlockToggle = async (userId) => {
    try {
      const { data } = await axios.put(
        `${baseURL}/block/${userId}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
      await fetchUsers();
      if (selectedUser && selectedUser._id === userId) {
        setSelectedUser((prev) => ({
          ...prev,
          isBlocked: data.user.isBlocked,
        }));
      }
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="w-full h-full px-6 py-8 bg-[#1e1e2e] text-white transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-3xl font-bold">User Management</h2>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-72 px-4 py-2 border border-gray-600 rounded-md bg-[#2c2c3b] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredUsers.length === 0 ? (
          <p className="text-gray-400 text-center">No users found.</p>
        ) : (
          <>
            <div className="space-y-6">
              {currentUsers.map((user) => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className="bg-[#2c2c3b] p-5 rounded-xl shadow hover:shadow-xl transition duration-300 flex justify-between items-center cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.photo?.url}
                      alt={user.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-300">{user.email}</p>
                      <p className="text-xs mt-1 text-gray-400">
                        Role: <span>{user.role}</span> |{" "}
                        <span
                          className={`font-bold ${
                            user.isBlocked ? "text-red-400" : "text-green-400"
                          }`}
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Joined: {new Date(user.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleBlockToggle(user._id)}
                      className={`px-4 py-2 rounded-lg transition ${
                        user.isBlocked
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      } text-white`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg text-white ${
                    currentPage === 1
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Prev
                </button>
                <span className="text-gray-300 font-semibold">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg text-white ${
                    currentPage === totalPages
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-[#2c2c3b] rounded-2xl shadow-2xl w-full max-w-2xl p-10 relative text-white">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-white hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>
            <div className="text-center mt-4">
              <img
                src={selectedUser.photo?.url}
                alt={selectedUser.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover"
              />
              <h3 className="text-2xl font-bold">{selectedUser.name}</h3>
              <p className="text-gray-300 mb-1">{selectedUser.email}</p>
              <div className="mt-6 text-base text-gray-300 space-y-1">
                <p>
                  <strong>Role:</strong> {selectedUser.role}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-bold ${
                      selectedUser.isBlocked ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {selectedUser.isBlocked ? "Blocked" : "Active"}
                  </span>
                </p>
              </div>
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={() => handleBlockToggle(selectedUser._id)}
                  className={`px-6 py-2 ${
                    selectedUser.isBlocked
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white rounded-lg`}
                >
                  {selectedUser.isBlocked ? "Unblock" : "Block"}
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-black rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserList;
