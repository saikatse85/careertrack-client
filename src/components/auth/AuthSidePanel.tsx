"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

interface AuthSidePanelProps {
  type: "login" | "register";
  onToggle: () => void;
}

export default function AuthSidePanel({ type, onToggle }: AuthSidePanelProps) {
  const isLogin = type === "login";

  return (
    <div className="relative flex h-full min-h-[420px] overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white lg:p-12">
      {/* Background Decorations */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-1 flex-col justify-between"
      >
        {/* Logo */}
        <div>
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white/15 px-5 py-3 backdrop-blur">
            <BriefcaseBusiness size={28} />

            <div>
              <h2 className="text-xl font-bold">CareerTrack Lite</h2>

              <p className="text-sm text-indigo-100">Job Application Tracker</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="my-12">
          <h1 className="text-4xl font-extrabold leading-tight lg:text-5xl">
            {isLogin ? "Welcome Back!" : "Start Your Career Journey"}
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">
            {isLogin
              ? "Sign in to manage your job applications, interviews, assessments and offers from one beautiful dashboard."
              : "Create your account and organize every application in one secure place. Never lose track of your opportunities again."}
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-300" size={22} />
              <span>Track all applications</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-300" size={22} />
              <span>Dashboard statistics</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-300" size={22} />
              <span>Secure JWT authentication</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div>
          <p className="mb-5 text-indigo-100">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>

          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition-all duration-300 hover:bg-white hover:text-indigo-700"
          >
            {isLogin ? (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            ) : (
              <>
                <ArrowLeft size={18} />
                Sign In
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
