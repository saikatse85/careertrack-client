"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Application } from "@/types";

import Swal from "sweetalert2";

import {
  Plus,
  Search,
  ArrowUpDown,
  BriefcaseBusiness,
  RefreshCw,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import EditApplicationModal from "@/components/applications/EditApplicationModal/EditApplicationModal";
import ViewApplicationModal from "@/components/applications/ViewApplicationModal/ViewApplicationModal";

export default function ApplicationsPage() {
  /* =====================================
      States
  ====================================== */

  const [applications, setApplications] = useState<Application[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [sourceFilter, setSourceFilter] = useState("All");

  const [sortBy, setSortBy] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);

  const [editOpen, setEditOpen] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const itemsPerPage = 8;

  /* =====================================
      Fetch Applications
  ====================================== */

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const data = await apiFetch<{
        success: boolean;
        data: Application[];
      }>("/applications");

      setApplications(data.data || []);
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Unable to load applications.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  /* =====================================
      Delete
  ====================================== */

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Application?",
      text: "You won't be able to recover it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);

      await apiFetch(`/applications/${id}`, {
        method: "DELETE",
      });

      await Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        text: "Application has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchApplications();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  /* =====================================
      Search + Filter + Sort
  ====================================== */

  const filteredApplications = useMemo(() => {
    let data = [...applications];

    if (search.trim()) {
      data = data.filter(
        (item) =>
          item.companyName.toLowerCase().includes(search.toLowerCase()) ||
          item.jobTitle.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (statusFilter !== "All") {
      data = data.filter((item) => item.status === statusFilter);
    }

    if (sourceFilter !== "All") {
      data = data.filter((item) => item.source === sourceFilter);
    }

    data.sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.applicationDate).getTime() -
          new Date(a.applicationDate).getTime()
        );
      }

      return (
        new Date(a.applicationDate).getTime() -
        new Date(b.applicationDate).getTime()
      );
    });

    return data;
  }, [applications, search, statusFilter, sourceFilter, sortBy]);

  /* =====================================
      Pagination
  ====================================== */

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, sourceFilter, sortBy]);

  /* =====================================
      Loading
  ====================================== */

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-12 w-60 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />

        <div className="grid gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-14 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </div>

        <div className="h-[500px] animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* =====================================
            Header
      ====================================== */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 p-8 text-white shadow-2xl">
        {/* Decorative Background */}
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-20 left-10 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">My Applications</h1>

            <p className="mt-2 text-indigo-100">
              Manage, organize, and track every job application in one place.
            </p>
          </div>

          {/* Add Button */}
          <Link
            href="/dashboard/applications/add"
            className="group inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-semibold text-indigo-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <Plus size={20} />
            Add Application
          </Link>
        </div>
      </div>

      {/* =====================================
            Search Toolbar
      ====================================== */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
    rounded-3xl
    border
    border-gray-200/70
    bg-white/80
    p-7
    shadow-xl
    backdrop-blur-xl
    dark:border-gray-800
    dark:bg-gray-900/80
  "
      >
        <div className="grid gap-5 lg:grid-cols-5">
          {/* Search */}

          <div className="relative lg:col-span-2">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search company or job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
          w-full
          rounded-2xl
          border
          border-gray-300
          bg-gray-100
          py-3
          pl-12
          pr-4
          text-gray-900
          shadow-sm
          outline-none
          transition-all
          duration-300
          hover:border-indigo-400
          focus:border-indigo-600
          focus:ring-4
          focus:ring-indigo-500/20
          dark:border-gray-700
          dark:bg-gray-800/70
          dark:text-white
          dark:hover:border-indigo-500
        "
            />
          </div>

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
        rounded-2xl
        border
        border-gray-300
        bg-gray-100
        px-4
        py-3
        text-gray-900
        shadow-sm
        outline-none
        transition-all
        duration-300
        hover:border-indigo-400
        focus:border-indigo-600
        focus:ring-4
        focus:ring-indigo-500/20
        dark:border-gray-700
        dark:bg-gray-800/70
        dark:text-white
      "
          >
            <option>All</option>
            <option>Saved</option>
            <option>Applied</option>
            <option>Assessment</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>

          {/* Source */}

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="
        rounded-2xl
        border
        border-gray-300
        bg-gray-100
        px-4
        py-3
        text-gray-900
        shadow-sm
        outline-none
        transition-all
        duration-300
        hover:border-indigo-400
        focus:border-indigo-600
        focus:ring-4
        focus:ring-indigo-500/20
        dark:border-gray-700
        dark:bg-gray-800/70
        dark:text-white
      "
          >
            <option>All</option>
            <option>LinkedIn</option>
            <option>Bdjobs</option>
            <option>Indeed</option>
            <option>Wellfound</option>
            <option>Facebook</option>
            <option>Referral</option>
            <option>Other</option>
          </select>

          {/* Sort */}

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() => setSortBy(sortBy === "newest" ? "oldest" : "newest")}
            className="
        flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        bg-gradient-to-r
        from-indigo-600
        to-violet-600
        px-4
        py-3
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:shadow-xl
      "
          >
            <ArrowUpDown size={18} />

            {sortBy === "newest" ? "Newest First" : "Oldest First"}
          </motion.button>
        </div>

        {/* Bottom Toolbar */}

        <div className="mt-7 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing
              <span className="mx-2 rounded-full bg-indigo-100 px-3 py-1 font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                {filteredApplications.length}
              </span>
              application(s)
            </p>
          </div>

          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={fetchApplications}
            className="
        group
        inline-flex
        items-center
        gap-2
        rounded-2xl
        border
        border-indigo-300
        bg-indigo-50
        px-5
        py-2.5
        font-medium
        text-indigo-700
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-indigo-600
        hover:text-white
        hover:shadow-lg
        dark:border-indigo-700
        dark:bg-indigo-950/30
        dark:text-indigo-300
      "
          >
            <RefreshCw
              size={18}
              className="transition-transform duration-500 group-hover:rotate-180"
            />
            Refresh
          </motion.button>
        </div>
      </motion.div>

      {/* ===========================
          Empty State
      ============================ */}

      {filteredApplications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-dashed
      border-indigo-200
      bg-white/80
      px-6
      py-24
      text-center
      shadow-xl
      backdrop-blur-xl
      dark:border-indigo-800
      dark:bg-gray-900/80
    "
        >
          {/* Background Decoration */}
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
              }}
              className="
          mx-auto
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-indigo-600
          to-violet-600
          text-white
          shadow-2xl
        "
            >
              <BriefcaseBusiness size={42} />
            </motion.div>

            {/* Title */}
            <h2 className="mt-8 text-3xl font-bold text-gray-900 dark:text-white">
              No Applications Found
            </h2>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-500 dark:text-gray-400">
              We couldn't find any applications that match your current search
              or filters.
              <br />
              Start tracking your job journey by adding your first application.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  href="/dashboard/applications/add"
                  className="
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-indigo-600
              to-violet-600
              px-7
              py-3.5
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:shadow-2xl
            "
                >
                  <Plus size={20} />
                  Add First Application
                </Link>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={fetchApplications}
                className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            border
            border-gray-300
            bg-white
            px-7
            py-3.5
            font-medium
            text-gray-700
            shadow-sm
            transition-all
            duration-300
            hover:bg-gray-100
            dark:border-gray-700
            dark:bg-gray-800
            dark:text-gray-200
            dark:hover:bg-gray-700
          "
              >
                <RefreshCw size={18} />
                Refresh
              </motion.button>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          {/* ===========================
              Desktop Table
          ============================ */}

          {/* ================= Desktop Table ================= */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="
    hidden
    overflow-hidden
    rounded-3xl
    border
    border-gray-200/70
    bg-white/80
    shadow-xl
    backdrop-blur-xl
    dark:border-gray-800
    dark:bg-gray-900/80
    lg:block
  "
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-gray-50/80 backdrop-blur-xl dark:bg-gray-800/80">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Company
                    </th>

                    <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Position
                    </th>

                    <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Source
                    </th>

                    <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Status
                    </th>

                    <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Applied
                    </th>

                    <th className="px-6 py-5 text-right text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedApplications.map((app, index) => (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="
              border-b
              border-gray-100
              transition-all
              duration-300
              text-gray-700
              dark:text-gray-200
              hover:bg-indigo-50/60
              dark:border-gray-800
              dark:hover:bg-gray-800/60
            "
                    >
                      {/* Company */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div
                            className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-indigo-600
                    to-violet-600
                    text-lg
                    font-bold
                    text-white
                    shadow-lg
                  "
                          >
                            {app.companyName.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {app.companyName}
                            </h3>

                            <p className="text-xs text-gray-500">
                              Job Application
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Job */}

                      <td className="px-6 py-5">
                        <p className="font-medium text-gray-700 dark:text-gray-200">
                          {app.jobTitle}
                        </p>
                      </td>

                      {/* Source */}

                      <td className="px-6 py-5">
                        <span
                          className="
                  inline-flex
                  rounded-full
                  bg-gray-100
                  px-3
                  py-1
                  text-sm
                  font-medium
                  text-gray-700
                  dark:bg-gray-800
                  dark:text-gray-300
                "
                        >
                          {app.source}
                        </span>
                      </td>

                      {/* Status */}

                      <td className="px-6 py-5 text-gray-700 dark:text-gray-200">
                        <StatusBadge status={app.status} />
                      </td>

                      {/* Date */}

                      <td className="px-6 py-5">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(app.applicationDate).toLocaleDateString()}
                        </span>
                      </td>

                      {/* Actions */}

                      <td className="px-6 py-5">
                        <div className="flex justify-end items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <button
                              onClick={() => {
                                setSelectedApplication(app);
                                setViewOpen(true);
                              }}
                              className="
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-gray-700
                      transition
                      hover:bg-gray-100
                      dark:border-gray-700
                      dark:bg-gray-800
                      dark:text-gray-200
                      dark:hover:bg-gray-700
                    "
                            >
                              View
                            </button>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setSelectedApplication(app);
                                setEditOpen(true);
                              }}
                              className="rounded-xl bg-gradient-to-r  from-indigo-600 to-violet-600 px-4 py-2 text-sm font-medium  text-white shadow-md transition hover:shadow-xl"
                            >
                              Edit
                            </motion.button>
                          </motion.div>

                          <motion.button
                            disabled={deletingId === app.id}
                            onClick={() => handleDelete(app.id)}
                            className="
        rounded-xl
        bg-gradient-to-r
        from-red-500
        to-rose-600
        px-4
        py-2
        text-sm
        font-medium
        text-white
        shadow-md
        transition
        hover:shadow-xl
        disabled:opacity-50
        disabled:cursor-not-allowed
    "
                          >
                            {deletingId === app.id ? "Deleting..." : "Delete"}
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* ================= Mobile Cards ================= */}

          <div className="space-y-5 lg:hidden">
            {paginatedApplications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                className="
        overflow-hidden
        rounded-3xl
        border
        border-gray-200/70
        bg-white/80
        p-6
        shadow-xl
        backdrop-blur-xl
        dark:border-gray-800
        dark:bg-gray-900/80
      "
              >
                {/* Header */}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-600
              to-violet-600
              text-xl
              font-bold
              text-white
              shadow-lg
            "
                    >
                      {app.companyName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {app.companyName}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {app.jobTitle}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={app.status} />
                </div>

                {/* Information */}

                <div className="mt-6 grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Source
                    </p>

                    <span
                      className="
              mt-2
              inline-flex
              rounded-full
              bg-gray-100
              px-3
              py-1
              text-sm
              font-medium
              text-gray-700
              dark:bg-gray-800
              dark:text-gray-300
            "
                    >
                      {app.source}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Applied
                    </p>

                    <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {new Date(app.applicationDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Divider */}

                <div className="my-6 border-t border-gray-200 dark:border-gray-800" />

                {/* Actions */}

                <div className="grid grid-cols-3 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => {
                        setSelectedApplication(app);
                        setViewOpen(true);
                      }}
                      className="
              flex
              items-center
              justify-center
              rounded-2xl
              border
              border-gray-300
              bg-white
              py-3
              text-sm
              font-semibold
              text-gray-700
              transition
              hover:bg-gray-100
              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-200
              dark:hover:bg-gray-700
            "
                    >
                      View
                    </button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => {
                        setSelectedApplication(app);
                        setEditOpen(true);
                      }}
                      className="
              flex
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-indigo-600
              to-violet-600
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
            "
                    >
                      Edit
                    </button>
                  </motion.div>

                  <motion.button
                    disabled={deletingId === app.id}
                    onClick={() => handleDelete(app.id)}
                    className="
        rounded-xl
        bg-gradient-to-r
        from-red-500
        to-rose-600
        px-4
        py-2
        text-sm
        font-medium
        text-white
        shadow-md
        transition
        hover:shadow-xl
        disabled:opacity-50
        disabled:cursor-not-allowed
    "
                  >
                    {deletingId === app.id ? "Deleting..." : "Delete"}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ===========================
              Pagination
          ============================ */}
          <EditApplicationModal
            open={editOpen}
            application={selectedApplication}
            onClose={() => {
              setEditOpen(false);
              setSelectedApplication(null);
            }}
            onSuccess={async () => {
              await fetchApplications();
              setEditOpen(false);
              setSelectedApplication(null);
            }}
          />
          <ViewApplicationModal
            open={viewOpen}
            application={selectedApplication}
            onClose={() => setViewOpen(false)}
          />

          {/* ================= Pagination ================= */}

          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="
      mt-10
      flex
      flex-col
      items-center
      justify-between
      gap-5
      rounded-3xl
      border
      border-gray-200/70
      bg-white/80
      px-6
      py-5
      shadow-lg
      backdrop-blur-xl
      dark:border-gray-800
      dark:bg-gray-900/80
      sm:flex-row
    "
            >
              {/* Page Info */}

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page
                <span className="mx-2 rounded-full bg-indigo-100 px-3 py-1 font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                  {currentPage}
                </span>
                of
                <span className="ml-2 rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {totalPages}
                </span>
              </div>

              {/* Pagination Buttons */}

              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Previous */}

                <motion.button
                  whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="
          rounded-2xl
          border
          border-gray-300
          bg-white
          px-5
          py-3
          font-medium
          text-gray-700
          shadow-sm
          transition-all
          hover:bg-gray-100
          disabled:cursor-not-allowed
          disabled:opacity-40
          dark:border-gray-700
          dark:bg-gray-800
          dark:text-gray-200
          dark:hover:bg-gray-700
        "
                >
                  Previous
                </motion.button>

                {/* Page Numbers */}

                {Array.from({ length: totalPages }).map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`h-12 w-12 rounded-2xl text-sm font-bold transition-all duration-300 ${
                      currentPage === index + 1
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                        : "border border-gray-300 bg-white text-gray-700 dark:text-white hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-500 dark:hover:bg-gray-700"
                    }`}
                  >
                    {index + 1}
                  </motion.button>
                ))}

                {/* Next */}

                <motion.button
                  whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="
          rounded-2xl
          border
          border-gray-300
          bg-white
          px-5
          py-3
          font-medium
          text-gray-700
          shadow-sm
          transition-all
          hover:bg-gray-100
          disabled:cursor-not-allowed
          disabled:opacity-40
          dark:border-gray-700
          dark:bg-gray-800
          dark:text-gray-200
          dark:hover:bg-gray-700
        "
                >
                  Next
                </motion.button>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

/* =====================================
      Status Badge
===================================== */

function StatusBadge({ status }: { status: Application["status"] }) {
  const colors: Record<Application["status"], string> = {
    SAVED:
      "border border-gray-200 bg-gray-100 text-gray-700 dark:text-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800",

    APPLIED:
      "border border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300",

    ASSESSMENT:
      "border border-purple-200 bg-purple-100 text-purple-700 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300",

    INTERVIEW:
      "border border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-300",

    REJECTED:
      "border border-red-200 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300",

    OFFER:
      "border border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3.5
        py-1.5
        text-xs
        font-semibold
        tracking-wide
        transition-all
        duration-200
        hover:scale-105
        ${colors[status]}
      `}
    >
      {status}
    </span>
  );
}
