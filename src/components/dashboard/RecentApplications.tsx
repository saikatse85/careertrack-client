"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ExternalLink,
} from "lucide-react";
import ViewApplicationModal from "../applications/ViewApplicationModal/ViewApplicationModal";
import { useState } from "react";
import { Application } from "@/types";

interface RecentApplicationsProps {
  applications: Application[];
}

const statusStyles: Record<Application["status"], string> = {
  SAVED: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",

  APPLIED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

  ASSESSMENT:
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",

  INTERVIEW:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",

  REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",

  OFFER: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
};

export default function RecentApplications({
  applications,
}: RecentApplicationsProps) {
  const [viewOpen, setViewOpen] = useState(false);

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  return (
    <section className="mt-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recent Applications
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your latest job applications.
          </p>
        </div>

        <Link
          href="/dashboard/applications"
          className="inline-flex items-center gap-2 font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          View All
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Empty State */}
      {applications.length === 0 && (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-14 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <Building2 className="mx-auto mb-4 text-indigo-500" size={48} />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            No Applications Yet
          </h3>

          <p className="mt-2 text-gray-500">
            Start tracking your job applications by adding your first one.
          </p>

          <Link
            href="/dashboard/applications/add"
            className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Add Application
          </Link>
        </div>
      )}

      {/* Desktop Table */}
      {applications.length > 0 && (
        <>
          <div className="hidden overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 lg:block">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr className="text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Job Title</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4">Applied Date</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-t border-gray-100 transition hover:bg-indigo-50/40 dark:border-gray-800 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30">
                          <Building2 size={20} />
                        </div>

                        <span className="font-semibold text-gray-900 dark:text-white">
                          {app.companyName}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 font-medium text-gray-700 dark:text-gray-300">
                      {app.jobTitle}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full text-gray-700 dark:text-gray-200 px-3 py-1 text-xs font-semibold ${statusStyles[app.status]}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-gray-600 dark:text-gray-400">
                      {app.source}
                    </td>

                    <td className="px-6 py-5 text-gray-600 dark:text-gray-400">
                      {app.applicationDate}
                    </td>

                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => {
                          setSelectedApplication(app);
                          setViewOpen(true);
                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                      >
                        View
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-5 lg:hidden">
            {applications.map((app) => (
              <div
                key={app.id}
                className="rounded-3xl border border-gray-200 bg-white p-5 shadow dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30">
                    <Building2 size={22} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {app.companyName}
                    </h3>

                    <p className="text-sm text-gray-500">{app.jobTitle}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[app.status]}`}
                  >
                    {app.status}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs dark:bg-gray-800">
                    {app.source}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays size={16} />
                  {app.applicationDate}
                </div>

                <Link
                  href={`/dashboard/applications/${app.id}`}
                  className="mt-6 flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
          <ViewApplicationModal
            open={viewOpen}
            application={selectedApplication}
            onClose={() => setViewOpen(false)}
          />
        </>
      )}
    </section>
  );
}
