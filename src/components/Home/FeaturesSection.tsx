import {
  BriefcaseBusiness,
  BarChart3,
  Search,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="bg-white py-24 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
            Powerful Features
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-5xl">
            Everything You Need
            <span className="block text-indigo-600">
              To Manage Your Job Search
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            CareerTrack Lite provides all the essential tools to organize,
            monitor and manage your job applications efficiently.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <FeatureCard
            icon={<BriefcaseBusiness size={28} />}
            title="Application Tracking"
            description="Create, edit and organize all your job applications in one place."
          />

          <FeatureCard
            icon={<BarChart3 size={28} />}
            title="Dashboard Analytics"
            description="View statistics for applications, interviews and offers instantly."
          />

          <FeatureCard
            icon={<Search size={28} />}
            title="Search & Filter"
            description="Find applications quickly using search, status and source filters."
          />

          <FeatureCard
            icon={<ShieldCheck size={28} />}
            title="Secure Authentication"
            description="JWT-based authentication keeps your account and data protected."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-indigo-500
        hover:shadow-2xl
        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      <div className="inline-flex rounded-2xl bg-indigo-100 p-4 text-indigo-600 transition group-hover:scale-110 dark:bg-indigo-900/30">
        {icon}
      </div>

      <h3 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
        {description}
      </p>

      <div className="mt-6 inline-flex items-center gap-2 font-medium text-indigo-600">
        Learn More
        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </div>
  );
}
