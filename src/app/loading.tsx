"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-950 dark:via-slate-950 dark:to-indigo-950">
      {/* Background Blur */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.45,
        }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/80 p-10 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80"
      >
        {/* Logo */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl"
        >
          <BriefcaseBusiness size={38} />
        </motion.div>

        {/* Title */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
          }}
          className="mt-8 text-center text-3xl font-bold text-gray-900 dark:text-white"
        >
          CareerTrack
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          className="mt-3 text-center text-gray-500 dark:text-gray-400"
        >
          Preparing your dashboard...
        </motion.p>

        {/* Spinner */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.45,
          }}
          className="mt-10 flex justify-center"
        >
          <Loader2
            size={38}
            className="animate-spin text-indigo-600 dark:text-indigo-400"
          />
        </motion.div>

        {/* Progress */}

        <div className="mt-10 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <motion.div
            initial={{
              x: "-100%",
            }}
            animate={{
              x: "100%",
            }}
            transition={{
              repeat: Infinity,
              duration: 1.3,
              ease: "easeInOut",
            }}
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500"
          />
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Please wait a moment...
        </p>
      </motion.div>
    </div>
  );
}
