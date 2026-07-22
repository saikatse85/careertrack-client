"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, LayoutDashboard, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50 px-6 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/30">
      {/* Background Blobs */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 top-10 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="overflow-hidden rounded-[32px] border border-white/20 bg-white/80 p-10 text-center shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80">
          {/* Icon */}

          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-xl"
          >
            <SearchX size={46} className="text-white" />
          </motion.div>

          {/* 404 */}

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-8 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-8xl font-black text-transparent"
          >
            404
          </motion.h1>

          {/* Title */}

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-5 text-3xl font-bold text-gray-900 dark:text-white"
          >
            Oops! Page Not Found
          </motion.h2>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mx-auto mt-5 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400"
          >
            The page you're looking for doesn't exist, may have been moved, or
            the URL might be incorrect.
          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/30"
            >
              <Home size={20} />
              Back Home
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-7 py-3.5 font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
          </motion.div>

          {/* Bottom Text */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800"
          >
            <p className="text-sm text-gray-500 dark:text-gray-500">
              CareerTrack Lite • Stay organized in your job search.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
