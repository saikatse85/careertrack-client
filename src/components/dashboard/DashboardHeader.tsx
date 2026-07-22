"use client";

import Link from "next/link";
import { CalendarDays, Plus, Sparkles } from "lucide-react";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="mb-8">
      <div className="overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 p-8 shadow-xl dark:border-indigo-900">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              <Sparkles size={16} />
              Welcome Back
            </div>

            <h1 className="text-3xl font-bold text-white lg:text-5xl">
              Track Every Opportunity.
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-indigo-100">
              Organize your job applications, monitor interview progress, and
              never miss an opportunity again.
            </p>

            <div className="mt-6 flex items-center gap-2 text-indigo-100">
              <CalendarDays size={18} />

              <span>{today}</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/dashboard/applications/add"
              className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-white
              px-6
              py-4
              font-semibold
              text-indigo-700
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
              "
            >
              <Plus size={20} />
              Add Application
            </Link>

            <Link
              href="/dashboard/applications"
              className="
              inline-flex
              items-center
              justify-center
              rounded-2xl
              border
              border-white/30
              bg-white/10
              px-6
              py-4
              font-semibold
              text-white
              backdrop-blur
              transition-all
              duration-300
              hover:bg-white
              hover:text-indigo-700
              "
            >
              View Applications
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
