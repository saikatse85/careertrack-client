"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Application } from "@/types";

import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import useEditApplication from "./useEditApplication";
import { INITIAL_FORM } from "./constants";

interface EditApplicationModalProps {
  open: boolean;
  application: Application | null;
  onClose: () => void;
  onSuccess: () => void | Promise<void>;
}

export default function EditApplicationModal({
  open,
  application,
  onClose,
  onSuccess,
}: EditApplicationModalProps) {
  // ESC Close
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

  const { form, errors, loading, handleChange, updateApplication } =
    useEditApplication({
      id: application?.id ?? "",
      initialData: application ?? INITIAL_FORM,
      onSuccess,
    });

  if (!open) return null;

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
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 40 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
        >
          {/* Decorative Background */}
          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

          <ModalHeader onClose={onClose} />

          <ModalBody form={form} errors={errors} handleChange={handleChange} />

          <ModalFooter
            onClose={onClose}
            onSubmit={updateApplication}
            loading={loading}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
