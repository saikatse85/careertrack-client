"use client";

import {
  BriefcaseBusiness,
  Bookmark,
  Send,
  ClipboardCheck,
  Users,
  XCircle,
  Award,
} from "lucide-react";

import StatCard from "./StatCard";

interface DashboardStats {
  totalApplications: number;
  saved: number;
  applied: number;
  assessment: number;
  interview: number;
  rejected: number;
  offer: number;
}

interface StatsGridProps {
  stats: DashboardStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <section className="mb-10">
      {/* Section Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Statistics
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          A quick overview of your current job application progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div
        className="
        grid
        gap-6
        sm:grid-cols-2
        xl:grid-cols-4
        "
      >
        <StatCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={BriefcaseBusiness}
          color="text-indigo-600"
          bg="bg-indigo-100"
        />

        <StatCard
          title="Saved Jobs"
          value={stats.saved}
          icon={Bookmark}
          color="text-amber-600"
          bg="bg-amber-100"
        />

        <StatCard
          title="Applied Jobs"
          value={stats.applied}
          icon={Send}
          color="text-blue-600"
          bg="bg-blue-100"
        />

        <StatCard
          title="Assessments"
          value={stats.assessment}
          icon={ClipboardCheck}
          color="text-cyan-600"
          bg="bg-cyan-100"
        />

        <StatCard
          title="Interviews"
          value={stats.interview}
          icon={Users}
          color="text-purple-600"
          bg="bg-purple-100"
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={XCircle}
          color="text-red-600"
          bg="bg-red-100"
        />

        <StatCard
          title="Offers"
          value={stats.offer}
          icon={Award}
          color="text-green-600"
          bg="bg-green-100"
        />
      </div>
    </section>
  );
}
