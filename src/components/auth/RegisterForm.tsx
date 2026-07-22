"use client";

import { useLoading } from "@/context/LoadingContext";
import { useRouter } from "next/navigation";
import React from "react";

import Swal from "sweetalert2";
import { Mail, User, Loader2, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import useAuth from "@/hooks/useAuth";

// ==============================
// Zod Schema
// ==============================

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name is too long."),

    email: z
      .string()
      .min(1, "Email is required.")
      .email("Please enter a valid email address."),

    password: z.string().min(6, "Password must be at least 6 characters."),

    confirmPassword: z.string().min(6, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onToggle: () => void;
}

export default function RegisterForm({ onToggle }: RegisterFormProps) {
  const router = useRouter();

  const { register: registerUser } = useAuth();

  const { isLoading, showLoading, hideLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // ==============================
  // Submit
  // ==============================

  const onSubmit = async (values: RegisterFormData) => {
    try {
      showLoading();

      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      await Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your account has been created.",
        timer: 1800,
        showConfirmButton: false,
      });

      router.push("/auth");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      hideLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Heading */}
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Create Account
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Register to start tracking your job applications.
        </p>
      </div>
      {/* Name */}
      <AuthInput
        label="Full Name"
        type="text"
        icon={User}
        placeholder="Enter your full name"
        error={errors.name?.message}
        {...register("name")}
      />
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
        placeholder="Create a password"
        error={errors.password?.message}
        {...register("password")}
      />
      {/* Confirm Password */}
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />{" "}
      {/* Terms */}
      <div className="mt-5 flex items-start gap-2">
        <input
          id="terms"
          type="checkbox"
          {...register("terms")}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />

        <label
          htmlFor="terms"
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          I agree to the{" "}
          <span className="font-medium text-indigo-600">
            Terms & Conditions
          </span>
        </label>
      </div>
      {errors.terms && (
        <p className="mt-2 text-sm text-red-500">{errors.terms.message}</p>
      )}
      {/* Register Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-8 flex w-full items-center justify-center rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Creating Account...
          </>
        ) : (
          <>
            Sign Up
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </button>
      {/* Divider */}
      <div className="my-8 flex items-center">
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>

        <span className="mx-4 text-sm text-gray-500">OR</span>

        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
      </div>
      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onToggle}
          className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
        >
          Sign In
        </button>
      </p>
    </form>
  );
}
