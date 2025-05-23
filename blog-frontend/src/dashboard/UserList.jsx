import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("📦 Sending request to backend...");
        const res = await axios.get('http://localhost:3001/users', {
          withCredentials: true,
        });
        console.log("✅ Got response:", res.data);
        if (res.data.success) {
          setUsers(res.data.users);
        }
      } catch (err) {
        console.error("❌ Failed to fetch:", err.message);
        if (err.response) {
          console.error("Response error data:", err.response.data);
        }
        setError(err.response?.data?.message || 'Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const toggleBlock = async (id, currentStatus) => {
    try {
      const res = await axios.put(`http://localhost:3001/users/block/${id}`, {
        isBlocked: !currentStatus,
      }, { withCredentials: true });

      console.log(res.data.message);

      // Refresh the list
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isBlocked: !currentStatus } : user
        )
      );
    } catch (err) {
      console.error("❌ Failed to toggle block status:", err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User List</h2>
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">S.No</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                {user.isBlocked ? "Blocked" : "Active"}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => toggleBlock(user._id, user.isBlocked)}
                  className={`px-3 py-1 rounded text-white ${
                    user.isBlocked ? "bg-green-500 hover:bg-green-700" : "bg-red-500 hover:bg-red-700"
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
  );
};

export default UserList;
