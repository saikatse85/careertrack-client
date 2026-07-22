"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  ShieldCheck,
  Search,
  BarChart3,
  CheckCircle2,
  Clock3,
  Building2,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-gray-950 dark:via-gray-900 dark:to-black" />

      <div className="absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-cyan-400/20 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
        {/* Left */}

        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
            <BriefcaseBusiness size={16} />
            CareerTrack Lite
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-gray-900 dark:text-white lg:text-7xl">
            Organize Every
            <span className="block bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Job Application
            </span>
            In One Place
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            Keep track of every application, interview, assessment and offer
            from one modern dashboard built for students and job seekers.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-8 py-4 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Login
            </Link>
          </div>

          {/* Trust Badges */}

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Badge icon={<ShieldCheck size={18} />} text="JWT Secure" />

            <Badge icon={<BarChart3 size={18} />} text="Dashboard" />

            <Badge icon={<Search size={18} />} text="Search" />

            <Badge icon={<CheckCircle2 size={18} />} text="Responsive" />
          </div>
        </div>

        {/* Right */}

        <div className="relative">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-200 pb-5 dark:border-gray-800">
              <div>
                <h2 className="text-xl font-bold dark:text-white">Dashboard</h2>

                <p className="text-sm text-gray-500">
                  Job Application Overview
                </p>
              </div>

              <div className="rounded-xl bg-indigo-100 px-3 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                Today
              </div>
            </div>

            {/* Stats */}

            <div className="mt-6 grid grid-cols-2 gap-4">
              <MiniCard title="Applications" value="36" color="bg-indigo-500" />

              <MiniCard title="Applied" value="12" color="bg-blue-500" />

              <MiniCard title="Interview" value="4" color="bg-amber-500" />

              <MiniCard title="Offers" value="2" color="bg-green-500" />
            </div>

            {/* Applications */}

            <div className="mt-8 space-y-4">
              <ApplicationItem
                company="Google"
                role="Frontend Developer"
                status="Interview"
              />

              <ApplicationItem
                company="Microsoft"
                role="Software Engineer"
                status="Applied"
              />

              <ApplicationItem
                company="Amazon"
                role="Backend Engineer"
                status="Offer"
              />
            </div>
          </div>

          {/* Floating Cards */}

          <div className="absolute -left-10 top-10 hidden rounded-2xl border bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900 lg:block">
            <Clock3 className="mb-2 text-indigo-600" />

            <h4 className="font-semibold dark:text-white">Next Interview</h4>

            <p className="mt-1 text-sm text-gray-500">Tomorrow • 10:00 AM</p>
          </div>

          <div className="absolute -right-10 bottom-8 hidden rounded-2xl border bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-900 lg:block">
            <CheckCircle2 className="mb-2 text-green-600" />

            <h4 className="font-semibold dark:text-white">Offer Received</h4>

            <p className="mt-1 text-sm text-gray-500">Congratulations 🎉</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="text-indigo-600">{icon}</div>

      <span className="text-sm font-medium dark:text-white">{text}</span>
    </div>
  );
}

function MiniCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className={`mb-4 h-2 w-12 rounded-full ${color}`} />

      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="mt-2 text-3xl font-bold dark:text-white">{value}</h3>
    </div>
  );
}

function ApplicationItem({
  company,
  role,
  status,
}: {
  company: string;
  role: string;
  status: string;
}) {
  const colors: Record<string, string> = {
    Applied: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    Interview:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    Offer:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-indigo-100 p-3 dark:bg-indigo-900/30">
          <Building2 size={20} className="text-indigo-600" />
        </div>

        <div>
          <h4 className="font-semibold dark:text-white">{company}</h4>

          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-sm font-medium ${
          colors[status]
        }`}
      >
        {status}
      </span>
    </div>
  );
}
