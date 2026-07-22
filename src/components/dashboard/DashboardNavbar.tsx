"use client";

import Link from "next/link";
import { useMemo, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Search, House, Sun, Moon, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";

import { AuthContext } from "@/context/AuthContext";

export default function DashboardNavbar() {
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const auth = useContext(AuthContext);

  const user = auth?.user;

  const pageTitle = useMemo(() => {
    if (pathname === "/dashboard") return "Dashboard";

    if (pathname === "/dashboard/applications") return "Applications";

    if (pathname === "/dashboard/applications/add") return "Add Application";

    if (pathname.includes("/edit")) return "Edit Application";

    if (pathname.includes("/applications/")) return "Application Details";

    return "Dashboard";
  }, [pathname]);

  const breadcrumb = pathname
    .split("/")
    .filter(Boolean)
    .map((item) =>
      item.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    );

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/80">
      <div className="flex h-20 items-center justify-between px-5 lg:px-8">
        {/* Left */}
        <div className="ml-12 md:ml-0">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            {breadcrumb.map((item, index) => (
              <div key={item} className="flex items-center gap-2">
                {index !== 0 && <ChevronRight size={16} />}
                <span>{item}</span>
              </div>
            ))}
          </div>

          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {pageTitle}
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden lg:block">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72 rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-11 pr-4 outline-none transition focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <Link
            href="/"
            className="
    inline-flex
    items-center
    gap-2
    rounded-xl
    border
    border-gray-300
    px-3
    py-2.5
    text-gray-700
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:border-indigo-500
    hover:bg-gradient-to-r
    hover:from-cyan-500
    hover:via-indigo-600
    hover:to-violet-600
    hover:text-white
    hover:shadow-lg
    dark:border-gray-700
    dark:text-gray-300
"
          >
            <House size={20} />
            <span className="hidden lg:inline">Home</span>
          </Link>

          {/* Theme */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-xl
    border
    border-gray-200
    p-2.5
    text-gray-700
    transition
    hover:bg-gray-100
    dark:border-gray-700
    dark:text-gray-200
    dark:hover:bg-gray-800"
          >
            {!mounted ? (
              <div className="h-5 w-5" />
            ) : theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {/* Notifications */}
          {/* <button className="relative rounded-xl border border-gray-300 p-2.5 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button> */}

          {/* User */}
          <Link
            href="/dashboard/profile"
            className="inline-flex items-center gap-3
    rounded-full
    border
    border-gray-200
    bg-white/70
    px-4
    py-2
    font-semibold
    text-gray-700
    backdrop-blur-md
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:border-indigo-500
    hover:bg-gradient-to-r
    hover:from-cyan-500
    hover:via-indigo-600
    hover:to-violet-600
    hover:text-white
    hover:shadow-xl
    dark:border-gray-700
    dark:bg-gray-900/60
    dark:text-gray-300
    dark:hover:text-white"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
              {initials}
            </div>

            <div className="hidden text-left lg:block">
              <p className="font-semibold text-gray-900 dark:text-white">
                {user?.name ?? "Loading..."}
              </p>

              <p className="text-xs text-gray-500">{user?.email ?? ""}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
