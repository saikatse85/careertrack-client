import { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <section className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="flex">
          {/* Sidebar */}
          <DashboardSidebar />

          {/* Right Content */}
          <div className="flex min-h-screen flex-1 flex-col">
            {/* Top Navbar */}
            <DashboardNavbar />

            {/* Page Content */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              <div className="mx-auto max-w-7xl">{children}</div>
            </main>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
