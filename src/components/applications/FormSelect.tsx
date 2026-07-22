"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  options: Option[];
  required?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FormSelect({
  label,
  name,
  value,
  options,
  required = false,
  error,
  onChange,
}: FormSelectProps) {
  const [focused, setFocused] = useState(false);

  const floating = focused || value !== "";

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="space-y-2"
    >
      {/* Label */}
      <label
        htmlFor={name}
        className="flex items-center gap-1 text-sm font-semibold text-gray-700 dark:text-gray-300"
      >
        {label}

        {required && <span className="text-red-500">*</span>}
      </label>

      {/* Select Wrapper */}
      <motion.div
        animate={{
          scale: focused ? 1.01 : 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className="relative"
      >
        {/* Floating Label */}
        <motion.span
          animate={{
            y: floating ? -24 : 0,
            scale: floating ? 0.88 : 1,
            color: error ? "#ef4444" : focused ? "#4f46e5" : "#9ca3af",
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            pointer-events-none
            absolute
            left-4
            top-3.5
            origin-left
            bg-white
            px-1
            text-sm
            dark:bg-gray-900
            z-10
          "
        >
          {label}
        </motion.span>

        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full
            appearance-none
            rounded-2xl
            border
            bg-white
            px-4
            pb-2
            pt-6
            pr-12
            text-sm
            text-gray-900
            shadow-sm
            outline-none
            transition-all
            duration-200

            dark:bg-gray-900
            dark:text-white

            ${
              error
                ? `
                  border-red-500
                  focus:border-red-500
                  focus:ring-4
                  focus:ring-red-100
                  dark:focus:ring-red-900/30
                `
                : `
                  border-gray-300
                  hover:border-gray-400
                  focus:border-indigo-600
                  focus:ring-4
                  focus:ring-indigo-100
                  dark:border-gray-700
                  dark:hover:border-gray-600
                  dark:focus:border-indigo-500
                  dark:focus:ring-indigo-900/30
                `
            }
          `}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown Icon */}
        <motion.div
          animate={{
            rotate: focused ? 180 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{
              opacity: 0,
              x: -8,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -8,
            }}
            transition={{
              duration: 0.2,
            }}
            className="text-sm font-medium text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
