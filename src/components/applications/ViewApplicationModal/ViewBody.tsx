"use client";

import {
  Building2,
  Briefcase,
  CalendarDays,
  Link as LinkIcon,
  FileText,
  CircleDot,
  Globe,
} from "lucide-react";

import { Application } from "@/types";
import DetailItem from "@/components/DetailItem";

interface Props {
  application: Application;
}

export default function ViewBody({ application }: Props) {
  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "OFFER":
        return "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400";

      case "INTERVIEW":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400";

      case "ASSESSMENT":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400";

      case "REJECTED":
        return "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-8 p-8">
      {/* Top Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Building2 size={18} />
            <span className="text-sm font-medium">Company</span>
          </div>

          <DetailItem label="Company Name" value={application.companyName} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Briefcase size={18} />
            <span className="text-sm font-medium">Position</span>
          </div>

          <DetailItem label="Job Title" value={application.jobTitle} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <CircleDot size={18} />
            <span className="text-sm font-medium">Status</span>
          </div>

          <div
            className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${statusColor(
              application.status,
            )}`}
          >
            {application.status}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Globe size={18} />
            <span className="text-sm font-medium">Source</span>
          </div>

          <DetailItem label="Application Source" value={application.source} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <CalendarDays size={18} />
            <span className="text-sm font-medium">Date</span>
          </div>

          <DetailItem
            label="Application Date"
            value={formatDate(application.applicationDate)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <LinkIcon size={18} />
            <span className="text-sm font-medium">Job Link</span>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            {application.jobUrl ? (
              <a
                href={application.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {application.jobUrl}
              </a>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">
                No URL provided
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <FileText size={18} />
          <span className="text-sm font-medium">Notes</span>
        </div>

        <div className="min-h-36 rounded-2xl border border-gray-200 bg-gray-50 p-5 leading-7 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
          {application.notes?.trim() ? (
            application.notes
          ) : (
            <span className="italic text-gray-400">No notes available.</span>
          )}
        </div>
      </div>
    </div>
  );
}
