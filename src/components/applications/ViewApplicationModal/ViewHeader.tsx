"use client";

import { X, Briefcase } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function ViewHeader({ onClose }: Props) {
  return (
    <div className="relative flex items-center justify-between border-b border-gray-200 px-8 py-6 dark:border-gray-800">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
          <Briefcase size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Application Details
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View your saved job application information.
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-gray-200
          bg-white
          text-gray-600
          transition
          hover:bg-gray-100
          hover:text-gray-900
          dark:border-gray-700
          dark:bg-gray-900
          dark:text-gray-300
          dark:hover:bg-gray-800
          dark:hover:text-white
        "
      >
        <X size={18} />
      </button>
    </div>
  );
}
