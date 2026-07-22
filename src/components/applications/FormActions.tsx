"use client";

import { motion } from "framer-motion";
import { Loader2, Save, X } from "lucide-react";

interface FormActionsProps {
  loading: boolean;
  onCancel: () => void;
}

export default function FormActions({ loading, onCancel }: FormActionsProps) {
  return (
    <div className="mt-10 flex flex-col-reverse gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:items-center sm:justify-end dark:border-gray-800">
      {/* Cancel Button */}
      <motion.button
        type="button"
        whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        disabled={loading}
        onClick={onCancel}
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-gray-300
          bg-white
          px-6
          py-3
          text-sm
          font-semibold
          text-gray-700
          shadow-sm
          transition-all
          duration-200
          hover:border-gray-400
          hover:bg-gray-50
          hover:shadow-md
          disabled:cursor-not-allowed
          disabled:opacity-50
          dark:border-gray-700
          dark:bg-gray-900
          dark:text-gray-300
          dark:hover:border-gray-600
          dark:hover:bg-gray-800
        "
      >
        <X size={18} />
        Cancel
      </motion.button>

      {/* Save Button */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={
          !loading
            ? {
                scale: 1.02,
                y: -2,
              }
            : {}
        }
        whileTap={
          !loading
            ? {
                scale: 0.98,
              }
            : {}
        }
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="
          relative
          inline-flex
          min-w-[220px]
          items-center
          justify-center
          gap-2
          overflow-hidden
          rounded-xl
          bg-gradient-to-r
          from-indigo-600
          via-indigo-600
          to-violet-600
          px-6
          py-3
          text-sm
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:shadow-indigo-500/25
          disabled:cursor-not-allowed
          disabled:opacity-70
          disabled:hover:scale-100
        "
      >
        {/* Shine Effect */}
        {!loading && (
          <span
            className="
              absolute
              inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              transition-transform
              duration-700
              group-hover:translate-x-full
            "
          />
        )}

        {loading ? (
          <>
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
            >
              <Loader2 size={20} />
            </motion.div>

            <span>Saving Application...</span>
          </>
        ) : (
          <>
            <Save size={18} />

            <span>Save Application</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
