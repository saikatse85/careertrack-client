"use client";

import { useState, InputHTMLAttributes } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function PasswordInput({
  label,
  error,
  className = "",
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      {/* Label */}
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </label>

      {/* Input */}
      <div
        className={`flex items-center rounded-xl border bg-white px-4 py-3 transition-all duration-300
          ${
            error
              ? "border-red-500 focus-within:ring-2 focus-within:ring-red-200"
              : "border-gray-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 dark:border-gray-700 dark:focus-within:ring-indigo-900"
          }
          dark:bg-gray-900`}
      >
        <Lock size={20} className="mr-3 text-gray-400 dark:text-gray-500" />

        <input
          type={showPassword ? "text" : "password"}
          className={`w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-white ${className}`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="ml-3 text-gray-400 transition hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
}
