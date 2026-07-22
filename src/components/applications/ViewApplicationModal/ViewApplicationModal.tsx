"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Application } from "@/types";

import ViewHeader from "./ViewHeader";
import ViewBody from "./ViewBody";

interface ViewApplicationModalProps {
  open: boolean;
  application: Application | null;
  onClose: () => void;
}

export default function ViewApplicationModal({
  open,
  application,
  onClose,
}: ViewApplicationModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !application) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 40,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          onClick={(e) => e.stopPropagation()}
          className="
            relative
            w-full
            max-w-5xl
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-2xl
            dark:border-gray-800
            dark:bg-gray-900
          "
        >
          {/* Decorative Background */}
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative">
            <ViewHeader onClose={onClose} />

            <ViewBody application={application} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
