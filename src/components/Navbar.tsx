"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Menu, X, Sun, Moon, BriefcaseBusiness, UserPlus } from "lucide-react";
import { useTheme } from "next-themes";
import { AuthContext } from "@/context/AuthContext";
import NavMenuLink from "./NavMenuLink";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const auth = useContext(AuthContext);

  const user = auth?.user;

  const logout = auth?.logout;

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50">
      <nav
        className="
        border-b 
        bg-white/80 
        dark:bg-gray-950/80
        backdrop-blur-lg
        shadow-sm
        dark:border-gray-800
        "
      >
        <div
          className="
          max-w-7xl 
          mx-auto 
          px-5 
          sm:px-6 
          lg:px-8
          "
        >
          <div
            className="
            flex 
            h-20 
            items-center 
            justify-between
            "
          >
            {/* Logo */}

            <Link
              href="/"
              className="
              flex 
              items-center 
              gap-3
              "
            >
              <div
                className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-indigo-600
                text-white
                shadow-lg
                "
              >
                <BriefcaseBusiness size={24} />
              </div>

              <div>
                <h1
                  className="
                  text-xl
                  font-bold
                  block bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent
                  "
                >
                  CareerTrack
                </h1>

                <p
                  className="
                  hidden
                  sm:block
                  text-xs
                  text-gray-500
                  dark:text-gray-400
                  "
                >
                  Job Application Tracker
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}

            <div
              className="
              hidden
              md:flex
              items-center
              gap-8
              "
            >
              <NavMenuLink href="/" text="Home" />

              {user ? (
                <>
                  <NavMenuLink href="/dashboard" text="Dashboard" />

                  <Link
                    href="/dashboard"
                    className="inline-flex
    items-center
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
                    {user.name}
                  </Link>

                  <button
                    onClick={logout}
                    className="rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavMenuLink href="/auth?mode=login" text="Login" />

                  <Link
                    href="/auth?mode=register"
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700 hover:shadow-lg"
                  >
                    <UserPlus size={18} />
                    Get Started
                  </Link>
                </>
              )}

              {/* Theme Button */}

              <button
                onClick={toggleTheme}
                className="
    rounded-xl
    border
    border-gray-200
    p-2.5
    text-gray-700
    transition
    hover:bg-gray-100
    dark:border-gray-700
    dark:text-gray-200
    dark:hover:bg-gray-800
  "
              >
                {!mounted ? (
                  <div className="h-5 w-5" />
                ) : theme === "dark" ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>
            </div>

            {/* Mobile Buttons */}

            <div
              className="
              flex
              items-center
              gap-3
              md:hidden
              "
            >
              <button
                onClick={toggleTheme}
                className="rounded-xl border border-gray-200 p-2.5 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {!mounted ? (
                  <div className="h-5 w-5" />
                ) : theme === "dark" ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="
                rounded-lg
                border
                p-2
                dark:border-gray-700
                "
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}

        {open && (
          <div
            className="
              md:hidden
              border-t
              bg-white
              dark:bg-gray-950
              dark:border-gray-800
              "
          >
            <div
              className="
                flex
                flex-col
                gap-4
                px-6
                py-6
                "
            >
              <NavMenuLink href="/" text="Home" />

              {user ? (
                <>
                  <NavMenuLink href="/dashboard" text="Dashboard" />
                  <NavMenuLink href="/dashboard" text={user.name} />

                  <button
                    onClick={() => {
                      logout?.();
                      setOpen(false);
                    }}
                    className="rounded-xl bg-red-600 py-3 font-medium text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavMenuLink href="/auth?mode=login" text="Login" />

                  <Link
                    href="/auth?mode=register"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-medium text-white"
                  >
                    <UserPlus size={18} />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLink({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="
font-medium
text-gray-700
transition
hover:text-indigo-600
dark:text-gray-300
dark:hover:text-indigo-400
"
    >
      {text}
    </Link>
  );
}

function MobileLink({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="
rounded-lg
px-3
py-2
font-medium
text-gray-700
hover:bg-gray-100
dark:text-gray-300
dark:hover:bg-gray-800
"
    >
      {text}
    </Link>
  );
}
