import Link from "next/link";
import { BriefcaseBusiness, Mail } from "lucide-react";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-950 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg">
                <BriefcaseBusiness size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  CareerTrack
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Lite Job Application Tracker
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md leading-7 text-gray-600 dark:text-gray-400">
              Manage your job applications, track interviews, organize your
              career journey and achieve your goals with ease.
            </p>

            <div className="mt-6 flex gap-3">
              <SocialIcon>
                <FaGithub size={18} />
              </SocialIcon>

              <SocialIcon>
                <FaLinkedin size={18} />
              </SocialIcon>

              <SocialIcon>
                <FaTwitter size={18} />
              </SocialIcon>

              <SocialIcon>
                <Mail size={18} />
              </SocialIcon>
            </div>
          </div>

          {/* Product */}

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white ">
              Product
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <FooterLink href="/" text="Home" />

              <FooterLink href="/dashboard" text="Dashboard" />

              <FooterLink href="/dashboard/applications" text="Applications" />

              <FooterLink href="/login" text="Login" />
            </ul>
          </div>

          {/* Resources */}

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Resources
            </h3>

            <ul className="mt-5 space-y-3 text-sm ">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-12 border-t pt-6 flex flex-col gap-3 items-center justify-between text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} CareerTrack Lite. All rights reserved.
          </p>

          <p>Built By ❤️ CareerTrack</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-600 transition hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
      >
        {text}
      </Link>
    </li>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-indigo-600 hover:text-white dark:border-gray-700 dark:text-gray-400 dark:hover:bg-indigo-600"
    >
      {children}
    </a>
  );
}
