"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface NavMenuLinkProps {
  href: string;
  text: string;
}

export default function NavMenuLink({ href, text }: NavMenuLinkProps) {
  const pathname = usePathname();

  const active =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <motion.div
      whileHover={{
        y: -2,
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.98,
      }}
    >
      <Link
        href={href}
        className="
          group
          relative
          overflow-hidden
          rounded-full
          px-4
          py-2
          font-medium
        "
      >
        <motion.span
          layoutId={active ? "navbar-indicator" : undefined}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 35,
          }}
          className={`
            absolute
            inset-0
            rounded-full
            bg-gradient-to-r
            from-cyan-500
            via-indigo-600
            to-violet-600
            shadow-[0_0_25px_rgba(79,70,229,0.35)]
            transition-all
            duration-300
            ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
        />

        <span
          className={`
            relative
            z-10
            transition-colors
            duration-300
            ${
              active
                ? "text-white"
                : "text-gray-700 group-hover:text-white dark:text-gray-300"
            }
          `}
        >
          {text}
        </span>
      </Link>
    </motion.div>
  );
}
