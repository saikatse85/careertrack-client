"use client";

import { useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import { apiFetch } from "@/lib/api";

import FormInput from "@/components/applications/FormInput";
import FormSelect from "@/components/applications/FormSelect";
import FormTextarea from "@/components/applications/FormTextarea";
import FormActions from "@/components/applications/FormActions";

type Status =
  "SAVED" | "APPLIED" | "ASSESSMENT" | "INTERVIEW" | "REJECTED" | "OFFER";

type Source =
  | "LINKEDIN"
  | "BDJOBS"
  | "INDEED"
  | "WELLFOUND"
  | "FACEBOOK"
  | "REFERRAL"
  | "OTHER";

interface ApplicationForm {
  companyName: string;
  jobTitle: string;
  jobUrl: string;
  source: Source;
  status: Status;
  applicationDate: string;
  notes: string;
}

interface ValidationErrors {
  companyName?: string;
  jobTitle?: string;
  source?: string;
  status?: string;
  applicationDate?: string;
}

const STATUS_OPTIONS = [
  { label: "Saved", value: "SAVED" },
  { label: "Applied", value: "APPLIED" },
  { label: "Assessment", value: "ASSESSMENT" },
  { label: "Interview", value: "INTERVIEW" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Offer", value: "OFFER" },
];

const SOURCE_OPTIONS = [
  { label: "LinkedIn", value: "LINKEDIN" },
  { label: "Bdjobs", value: "BDJOBS" },
  { label: "Indeed", value: "INDEED" },
  { label: "Wellfound", value: "WELLFOUND" },
  { label: "Facebook", value: "FACEBOOK" },
  { label: "Referral", value: "REFERRAL" },
  { label: "Other", value: "OTHER" },
];

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export default function AddApplicationPage() {
  const router = useRouter();

  const { isLoading, showLoading, hideLoading } = useLoading();

  const [errors, setErrors] = useState<ValidationErrors>({});

  const [form, setForm] = useState<ApplicationForm>({
    companyName: "",
    jobTitle: "",
    jobUrl: "",
    source: "LINKEDIN",
    status: "SAVED",
    applicationDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors: ValidationErrors = {};

    if (!form.companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    }

    if (!form.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required.";
    }

    if (!form.applicationDate) {
      newErrors.applicationDate = "Application date is required.";
    }

    if (!form.source) {
      newErrors.source = "Please select a source.";
    }

    if (!form.status) {
      newErrors.status = "Please select a status.";
    }

    if (form.jobUrl && !/^https?:\/\/.+/i.test(form.jobUrl)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid URL",
        text: "Job URL must start with http:// or https://",
        confirmButtonColor: "#4f46e5",
      });

      return false;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please complete all required fields.",
        confirmButtonColor: "#4f46e5",
      });

      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    if (!validate()) return;

    try {
      showLoading();

      await apiFetch("/applications", {
        method: "POST",
        body: JSON.stringify(form),
      });

      await Swal.fire({
        icon: "success",
        title: "Application Added",
        text: "Your job application has been saved successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      router.push("/dashboard/applications");

      router.refresh();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error instanceof Error
            ? error.message
            : "Failed to save application.",
        confirmButtonColor: "#4f46e5",
      });
    } finally {
      hideLoading();
    }
  };
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-6xl"
    >
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
      >
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-8 dark:border-gray-800">
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Add New Application
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-gray-500 dark:text-gray-400"
          >
            Save and manage every job application in one organized place.
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-8 p-8">
            {/* Main Fields */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-1 gap-6 lg:grid-cols-2"
            >
              <FormInput
                label="Company Name"
                name="companyName"
                value={form.companyName}
                placeholder="Google"
                required
                error={errors.companyName}
                onChange={handleChange}
              />

              <FormInput
                label="Job Title"
                name="jobTitle"
                value={form.jobTitle}
                placeholder="Frontend Developer"
                required
                error={errors.jobTitle}
                onChange={handleChange}
              />

              <FormInput
                label="Job URL"
                name="jobUrl"
                type="url"
                value={form.jobUrl}
                placeholder="https://company.com/job"
                onChange={handleChange}
              />

              <FormSelect
                label="Application Source"
                name="source"
                value={form.source}
                options={SOURCE_OPTIONS}
                error={errors.source}
                onChange={handleChange}
              />

              <FormInput
                label="Application Date"
                name="applicationDate"
                type="date"
                value={form.applicationDate}
                required
                error={errors.applicationDate}
                onChange={handleChange}
              />

              <FormSelect
                label="Application Status"
                name="status"
                value={form.status}
                options={STATUS_OPTIONS}
                error={errors.status}
                onChange={handleChange}
              />
            </motion.div>

            {/* Notes */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <FormTextarea
                label="Notes"
                name="notes"
                value={form.notes}
                placeholder="Interview schedule, recruiter contact, salary expectation, follow-up reminder..."
                onChange={handleChange}
              />
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FormActions loading={isLoading} onCancel={() => router.back()} />
            </motion.div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
