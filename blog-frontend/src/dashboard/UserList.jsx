import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/users", {
        withCredentials: true,
      });
      setUsers(data.users);
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  const handleBlockToggle = async (userId) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/block/${userId}`,
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
  

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className={`w-full h-full px-6 py-8 bg-white transition-all duration-300 ${selectedUser ? "blur-sm" : ""}`}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">User Management</h2>
        {users.length === 0 ? (
          <p className="text-gray-600 text-center">No users found.</p>
        ) : (
          <div className="space-y-6">
            {users.map((user) => (
              <div
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className="bg-gray-100 p-5 rounded-xl shadow hover:shadow-lg transition duration-300 flex justify-between items-center cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={user.photo?.url}
                    alt={user.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs mt-1 text-gray-700">
                      Role: <span className="font-medium">{user.role}</span> |{" "}
                      <span className={`font-bold ${user.isBlocked ? "text-red-600" : "text-green-600"}`}>
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                  {user.isBlocked ? (
                    <button
                      onClick={() => handleBlockToggle(user._id)}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockToggle(user._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                    >
                      Block
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/10">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-10 relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>
            <div className="text-center mt-4">
              <img
                src={selectedUser.photo?.url}
                alt={selectedUser.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover"
              />
              <h3 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h3>
              <p className="text-gray-600 mb-1">{selectedUser.email}</p>
              <div className="mt-6 text-base text-gray-700 space-y-1">
                <p><strong>Role:</strong> {selectedUser.role}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`font-bold ${selectedUser.isBlocked ? "text-red-600" : "text-green-600"}`}>
                    {selectedUser.isBlocked ? "Blocked" : "Active"}
                  </span>
                </p>
              </div>
              <div className="mt-6 flex justify-center space-x-4">
                {selectedUser.isBlocked ? (
                  <button
                    onClick={() => handleBlockToggle(selectedUser._id)}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlockToggle(selectedUser._id)}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    Block
                  </button>
                )}
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg"
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
