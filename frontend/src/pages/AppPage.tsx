import React from "react";
import { useAuth } from "../contexts/AuthContext";

export const AppPage: React.FC = () => {
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome to the application
            </h1>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
          <p className="text-gray-600">You are now signed in!</p>
        </div>
      </div>
    </div>
  );
};
