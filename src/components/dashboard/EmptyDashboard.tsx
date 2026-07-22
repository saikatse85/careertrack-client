"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Plus, Search, ArrowRight } from "lucide-react";

export default function EmptyDashboard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[70vh] items-center justify-center"
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
        {/* Top Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-8 py-12 text-center text-white">
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <BriefcaseBusiness size={48} />
            </div>

            <h1 className="mt-6 text-3xl font-bold">
              Welcome to CareerTrack Lite
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-indigo-100">
              You haven't added any job applications yet. Start tracking every
              opportunity and stay organized throughout your job search.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-indigo-50 p-6 text-center dark:bg-indigo-900/20">
              <Plus className="mx-auto mb-4 text-indigo-600" size={32} />

              <h3 className="font-semibold text-gray-900 dark:text-white">
                Add Applications
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Save every job opportunity in one place.
              </p>
            </div>

            <div className="rounded-2xl bg-blue-50 p-6 text-center dark:bg-blue-900/20">
              <Search className="mx-auto mb-4 text-blue-600" size={32} />

              <h3 className="font-semibold text-gray-900 dark:text-white">
                Track Progress
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Monitor interviews, offers and rejections.
              </p>
            </div>

            <div className="rounded-2xl bg-cyan-50 p-6 text-center dark:bg-cyan-900/20">
              <BriefcaseBusiness
                className="mx-auto mb-4 text-cyan-600"
                size={32}
              />

              <h3 className="font-semibold text-gray-900 dark:text-white">
                Stay Organized
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Manage your career journey from one dashboard.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/dashboard/applications/add"
              className="inline-flex items-center gap-3 rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl"
            >
              <Plus size={22} />
              Add Your First Application
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Footer Text */}
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Once you add your first application, your dashboard statistics,
            recent applications and progress will appear here.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
