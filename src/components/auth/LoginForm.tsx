"use client";

import React from "react";
import { useLoading } from "@/context/LoadingContext";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";

import Swal from "sweetalert2";

import PasswordInput from "./PasswordInput";
import useAuth from "@/hooks/useAuth";
import AuthInput from "./AuthInput";

// ==============================
// Zod Schema
// ==============================

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onToggle: () => void;
}

export default function LoginForm({ onToggle }: LoginFormProps) {
  const router = useRouter();

  const { login } = useAuth();

  const { isLoading, showLoading, hideLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ==============================
  // Submit Handler
  // ==============================

  const onSubmit = async (values: LoginFormData) => {
    try {
      showLoading();

      await login(values);

      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1800,
        showConfirmButton: false,
      });

      router.push("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      hideLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome Back
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sign in to continue managing your job applications.
        </p>
      </div>
      {/* Email */}
      <AuthInput
        label="Email Address"
        type="email"
        icon={Mail}
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />
      {/* Password */}
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />{" "}
      {/* Remember Me + Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          Remember me
        </label>

        <button
          type="button"
          className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Forgot Password?
        </button>
      </div>
      {/* Login Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <svg
              className="mr-2 h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />

              <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </button>
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
            Don't have an account?
          </span>
        </div>
      </div>
      {/* Register Link */}
      <button
        type="button"
        onClick={onToggle}
        className="block w-full rounded-xl border border-indigo-600 px-5 py-3 text-center font-semibold text-indigo-600 transition-all duration-300 hover:bg-indigo-50 dark:border-indigo-500 dark:text-indigo-400 dark:hover:bg-indigo-950/40"
      >
        Create an Account
      </button>
    </form>
  );
}
