"use client";

import { useContext, useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentApplications from "@/components/dashboard/RecentApplications";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import EmptyDashboard from "@/components/dashboard/EmptyDashboard";
import { apiFetch } from "@/lib/api";
import { Application } from "@/types";
import { AuthContext } from "@/context/AuthContext";

interface DashboardStats {
  totalApplications: number;
  saved: number;
  applied: number;
  assessment: number;
  interview: number;
  rejected: number;
  offer: number;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);

  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    saved: 0,
    applied: 0,
    assessment: 0,
    interview: 0,
    rejected: 0,
    offer: 0,
  });

  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (auth?.loading) return;

    if (!auth?.user) return;

    fetchDashboard();
  }, [auth?.loading, auth?.user]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [statsRes, appsRes] = await Promise.all([
        apiFetch<{ data: DashboardStats }>("/dashboard/stats"),
        apiFetch<{ data: Application[] }>("/applications?limit=5&sort=newest"),
      ]);

      setStats(statsRes.data);
      setApplications(appsRes.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (applications.length === 0) {
    return <EmptyDashboard />;
  }

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <StatsGrid stats={stats} />

      <RecentApplications applications={applications} />
    </div>
  );
}
