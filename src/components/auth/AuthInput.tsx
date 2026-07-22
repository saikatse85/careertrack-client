"use client";

import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
}

export default function AuthInput({
  label,
  icon: Icon,
  error,
  className = "",
  ...props
}: AuthInputProps) {
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
        <Icon size={20} className="mr-3 text-gray-400 dark:text-gray-500" />

        <input
          className={`w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-white ${className}`}
          {...props}
        />
      </div>

      {/* Error */}
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
}
