"use client";

import { LucideIcon, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: string;
  bg?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-indigo-600",
  bg = "bg-indigo-100",
}: StatCardProps) {
  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-gray-200
      bg-white
      p-6
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      dark:border-gray-800
      dark:bg-gray-900
      "
    >
      {/* Decorative Blur */}
      <div
        className="
        absolute
        -right-10
        -top-10
        h-32
        w-32
        rounded-full
        bg-indigo-500/10
        blur-3xl
        transition-all
        duration-500
        group-hover:scale-125
        "
      />

      <div className="relative flex items-start justify-between">
        {/* Left */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {value}
          </h2>

          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <TrendingUp size={14} />
            Active
          </div>
        </div>

        {/* Icon */}
        <div
          className={`
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          ${bg}
          transition-transform
          duration-300
          group-hover:rotate-6
          group-hover:scale-110
          `}
        >
          <Icon className={`${color}`} size={30} />
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500" />
      </div>
    </div>
  );
}
