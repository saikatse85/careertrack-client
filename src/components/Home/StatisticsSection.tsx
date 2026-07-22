import {
  BriefcaseBusiness,
  Clock3,
  CheckCircle2,
  XCircle,
  Award,
  TrendingUp,
} from "lucide-react";

export default function StatisticsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50 py-24 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Background */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
            Statistics
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-5xl">
            Understand Your
            <span className="block text-indigo-600">Job Search Progress</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Gain valuable insights into your applications and monitor every
            stage of your hiring journey with an easy-to-read dashboard.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            icon={<BriefcaseBusiness size={28} />}
            number="36"
            label="Applications"
            color="from-indigo-500 to-indigo-700"
          />

          <StatCard
            icon={<Clock3 size={28} />}
            number="12"
            label="Applied"
            color="from-blue-500 to-cyan-600"
          />

          <StatCard
            icon={<CheckCircle2 size={28} />}
            number="4"
            label="Interviews"
            color="from-amber-500 to-orange-500"
          />

          <StatCard
            icon={<Award size={28} />}
            number="2"
            label="Offers"
            color="from-emerald-500 to-green-600"
          />

          <StatCard
            icon={<XCircle size={28} />}
            number="5"
            label="Rejected"
            color="from-rose-500 to-red-600"
          />

          <StatCard
            icon={<TrendingUp size={28} />}
            number="82%"
            label="Success Rate"
            color="from-violet-500 to-fuchsia-600"
          />
        </div>

        {/* Bottom Highlights */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          <HighlightCard
            title="Track Applications"
            text="Manage every application from a single dashboard and never lose track of an opportunity."
          />

          <HighlightCard
            title="Stay Organized"
            text="Filter, search and update applications as they move through different hiring stages."
          />

          <HighlightCard
            title="Measure Progress"
            text="Visual statistics help you understand your job search and improve your strategy."
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Helpers ---------------- */

function StatCard({
  icon,
  number,
  label,
  color,
}: {
  icon: React.ReactNode;
  number: string;
  label: string;
  color: string;
}) {
  return (
    <div className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
      <div
        className={`inline-flex rounded-2xl bg-gradient-to-r ${color} p-4 text-white transition group-hover:scale-110`}
      >
        {icon}
      </div>

      <h3 className="mt-8 text-5xl font-extrabold text-gray-900 dark:text-white">
        {number}
      </h3>

      <p className="mt-3 text-lg font-medium text-gray-600 dark:text-gray-400">
        {label}
      </p>
    </div>
  );
}

function HighlightCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">{text}</p>
    </div>
  );
}
