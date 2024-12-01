import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Get Started with the App
        </h1>
        <div className="space-y-4">
          <Link
            to="/signup"
            className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="block w-full border border-blue-500 text-blue-500 text-center py-2 px-4 rounded-md hover:bg-blue-50 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
