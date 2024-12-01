import React from "react";
import { SignUpForm } from "../components";

export const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Create your account
        </h2>
        <SignUpForm />
      </div>
    </div>
  );
};
