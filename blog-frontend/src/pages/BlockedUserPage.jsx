import React from 'react';

const BlockedUserPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">🚫 You Are Blocked</h1>
        <p className="mt-4 text-lg text-gray-700">Access denied. Please contact the administrator.</p>
      </div>
    </div>
  );
};

export default BlockedUserPage;
