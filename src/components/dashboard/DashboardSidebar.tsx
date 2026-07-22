"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  PlusCircle,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    href: "/dashboard/applications",
    icon: BriefcaseBusiness,
  },
  {
    title: "Add Application",
    href: "/dashboard/applications/add",
    icon: PlusCircle,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const auth = useContext(AuthContext)!;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-xl border border-gray-200 bg-white p-2 shadow md:hidden dark:border-gray-700 dark:bg-gray-900"
      >
        <Menu size={22} />
      </button>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed
        inset-y-0
        left-0
        z-50
        w-72
        transform
        border-r
        border-gray-200
        bg-white
        transition-transform
        duration-300
        dark:border-gray-800
        dark:bg-gray-950

        ${open ? "translate-x-0" : "-translate-x-full"}

        md:static
        md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <BriefcaseBusiness size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                CareerTrack
              </h2>

              <p className="text-xs text-gray-500">Job Tracker</p>
            </div>
          </Link>

          <button onClick={() => setOpen(false)} className="md:hidden">
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                font-medium
                transition-all

                ${
                  active
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-800"
                }
                `}
              >
                <Icon size={20} />

                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 w-full border-t border-gray-200 p-5 dark:border-gray-800">
          <button
            onClick={() => {
              setOpen(false);
              auth?.logout();
            }}
            className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-red-500
            px-4
            py-3
            font-medium
            text-white
            transition
            hover:bg-red-600
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
