import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ValidationErrors {
  email?: string;
  name?: string;
  password?: string;
  general?: string;
}

export const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors from NestJS
        if (Array.isArray(data.message)) {
          const newErrors: ValidationErrors = {};
          data.message.forEach((error: string) => {
            // NestJS class-validator messages contain the property name
            if (error.toLowerCase().includes("email")) {
              newErrors.email = error;
            } else if (error.toLowerCase().includes("password")) {
              newErrors.password = error;
            } else if (error.toLowerCase().includes("name")) {
              newErrors.name = error;
            }
          });
          setErrors(newErrors);
        } else {
          setErrors({ general: data.message || "Failed to sign up" });
        }
        return;
      }

      login(data.token);
      navigate("/app");
    } catch (err) {
      setErrors({ general: "Network error occurred. Please try again." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.name
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.email
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          required
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            errors.password
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          placeholder="••••••••"
        />
        {errors.password ? (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        ) : (
          <p className="mt-1 text-sm text-gray-500">
            Password must contain at least 8 characters, including a letter,
            number, and a special character.
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
      >
        Sign Up
      </button>
      {errors.general && (
        <p className="text-red-500 text-center">{errors.general}</p>
      )}
    </form>
  );
};
