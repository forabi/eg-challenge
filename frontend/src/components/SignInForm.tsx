import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

export const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await fetch("http://localhost:3001/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setErrors({
            general:
              "Invalid email or password. Please double-check your credentials and try again.",
          });
        } else if (Array.isArray(data.message)) {
          const newErrors: ValidationErrors = {};
          data.message.forEach((error: string) => {
            if (error.toLowerCase().includes("email")) {
              newErrors.email = error;
            } else if (error.toLowerCase().includes("password")) {
              newErrors.password = error;
            }
          });
          setErrors(newErrors);
        } else {
          setErrors({
            general: "Something went wrong. Please try again later.",
          });
        }
        return;
      }

      login(data.token);
      navigate("/app");
    } catch (err) {
      setErrors({
        general:
          "Unable to connect to the server. Please check your internet connection and try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
      >
        Sign In
      </button>
      {errors.general && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-center text-sm">{errors.general}</p>
        </div>
      )}
    </form>
  );
};
