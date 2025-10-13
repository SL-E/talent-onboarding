import React from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user?.email || 'User'}!</h2>
        <p className="text-gray-600">This is your dashboard.</p >
      </div>
    </div>
  );
}

export default Dashboard;