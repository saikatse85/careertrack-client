import {
  BriefcaseBusiness,
  Clock3,
  CheckCircle2,
  TrendingUp,
  Building2,
  CalendarDays,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="bg-white py-24 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
            Dashboard Preview
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-5xl">
            Stay Organized With
            <span className="block text-indigo-600">
              Your Personal Dashboard
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Quickly view your job search progress, recent applications and
            upcoming interviews from one modern dashboard.
          </p>
        </div>

        {/* Dashboard */}
        <div className="mt-20 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-8 py-6 dark:border-gray-800">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h3>

              <p className="text-sm text-gray-500">
                Welcome back! Here's your progress.
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
              Active
            </span>
          </div>

          <div className="grid gap-8 p-8 lg:grid-cols-3">
            {/* Left */}
            <div className="space-y-6 lg:col-span-2">
              {/* Stats */}
              <div className="grid gap-5 sm:grid-cols-2">
                <MiniStat
                  icon={<BriefcaseBusiness size={22} />}
                  title="Applications"
                  value="36"
                  color="bg-indigo-500"
                />

                <MiniStat
                  icon={<Clock3 size={22} />}
                  title="Applied"
                  value="12"
                  color="bg-blue-500"
                />

                <MiniStat
                  icon={<CheckCircle2 size={22} />}
                  title="Interviews"
                  value="4"
                  color="bg-amber-500"
                />

                <MiniStat
                  icon={<TrendingUp size={22} />}
                  title="Offers"
                  value="2"
                  color="bg-emerald-500"
                />
              </div>

              {/* Recent Applications */}
              <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
                <h4 className="mb-6 text-xl font-semibold dark:text-white">
                  Recent Applications
                </h4>

                <div className="space-y-4">
                  <ApplicationRow
                    company="Google"
                    role="Frontend Developer"
                    status="Interview"
                  />

                  <ApplicationRow
                    company="Microsoft"
                    role="Software Engineer"
                    status="Applied"
                  />

                  <ApplicationRow
                    company="Amazon"
                    role="Backend Engineer"
                    status="Offer"
                  />
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
              <h4 className="text-xl font-semibold dark:text-white">
                Upcoming Activities
              </h4>

              <div className="mt-8 space-y-6">
                <TimelineItem
                  title="HR Interview"
                  date="Tomorrow • 10:00 AM"
                  color="bg-indigo-500"
                />

                <TimelineItem
                  title="Technical Assessment"
                  date="Friday • 3:00 PM"
                  color="bg-amber-500"
                />

                <TimelineItem
                  title="Offer Discussion"
                  date="Next Week"
                  color="bg-emerald-500"
                />
              </div>

              <div className="mt-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white">
                <p className="text-sm opacity-80">Success Rate</p>

                <h3 className="mt-2 text-5xl font-bold">82%</h3>

                <p className="mt-3 text-sm text-indigo-100">
                  Great progress! Keep applying consistently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */

function MiniStat({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 transition hover:shadow-lg dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div
          className={`${color} flex h-12 w-12 items-center justify-center rounded-xl text-white`}
        >
          {icon}
        </div>

        <h3 className="text-3xl font-bold dark:text-white">{value}</h3>
      </div>

      <p className="mt-4 text-gray-600 dark:text-gray-400">{title}</p>
    </div>
  );
}

function ApplicationRow({
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
    <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-gray-800">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-indigo-100 p-3 dark:bg-indigo-900/30">
          <Building2 size={20} className="text-indigo-600" />
        </div>

        <div>
          <h5 className="font-semibold dark:text-white">{company}</h5>

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

function TimelineItem({
  title,
  date,
  color,
}: {
  title: string;
  date: string;
  color: string;
}) {
  return (
    <div className="flex gap-4">
      <div className={`${color} mt-1 h-3 w-3 rounded-full`} />

      <div>
        <h5 className="font-semibold dark:text-white">{title}</h5>

        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={15} />
          {date}
        </div>
      </div>
    </div>
  );
}
