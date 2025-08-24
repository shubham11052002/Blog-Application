import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [currentUser, setCurrentUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState("all");

  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/users`, {
        withCredentials: true,
      });
      setUsers(data.users);
    } catch {
      toast.error("Failed to load users");
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/my-profile`, {
        withCredentials: true,
      });
      setCurrentUser(data.user);
    } catch {
      toast.error("Failed to fetch current user");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

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
    } catch {
      toast.error("Failed to update user status");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === "all" ? true : user.role === roleFilter;
    return matchSearch && matchRole;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const getRoleBadge = (role) => role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="w-full h-full px-6 py-8 bg-[#1e1e2e] text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold">User Management</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-64 px-4 py-2 border border-gray-600 rounded-md bg-[#2c2c3b] text-white"
          />
          <select
            value={usersPerPage}
            onChange={(e) => {
              setUsersPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-[#2c2c3b] text-white border border-gray-600 rounded-md"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          {currentUser?.role === "superadmin" && (
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-[#2c2c3b] text-white border border-gray-600 rounded-md"
            >
              <option value="all">All</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-gray-400 text-center">No users found.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl shadow-lg bg-[#2c2c3b] text-white">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-[#1e1e2e] text-sm text-gray-300 uppercase tracking-wider">
                  <th className="px-6 py-4 text-left">S.No</th>
                  <th className="px-6 py-4 text-left">Avatar</th>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Joined</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className="border-t border-gray-700 hover:bg-[#3a3a4d] cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      {(currentPage - 1) * usersPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={user.photo?.url}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-bold ${
                          user.isBlocked ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBlockToggle(user._id);
                        }}
                        className={`px-4 py-2 rounded-lg ${
                          user.isBlocked
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
              {Math.min(currentPage * usersPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 disabled:opacity-50"
              >
                First
              </button>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-4">{currentPage} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 disabled:opacity-50"
              >
                Next
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 disabled:opacity-50"
              >
                Last
              </button>
            </div>
          </div>
        </>
      )}

      {selectedUser && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-[#2c2c3b] rounded-xl p-6 text-white max-w-md w-full relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-2 text-white text-xl hover:text-red-500"
            >
              &times;
            </button>
            <div className="flex flex-col items-center gap-4">
              <img
                src={selectedUser.photo?.url}
                alt={selectedUser.name}
                className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
              />
              <h3 className="text-2xl font-bold">{selectedUser.name}</h3>
              <p className="text-sm text-gray-400">{selectedUser.email}</p>
              <p className="text-sm">
                Role: <span className="font-semibold">{getRoleBadge(selectedUser.role)}</span>
              </p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    selectedUser.isBlocked ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {selectedUser.isBlocked ? "Blocked" : "Active"}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                Joined: {new Date(selectedUser.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
