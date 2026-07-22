import { UserPlus, FilePlus2, BarChart3, ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-24 dark:bg-gray-900">
      {/* Background Blur */}
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
            How It Works
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-5xl">
            Get Started in
            <span className="block text-indigo-600">Three Simple Steps</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            CareerTrack Lite makes organizing your job search simple, fast and
            stress-free.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-20 grid gap-8 lg:grid-cols-3">
          <StepCard
            number="01"
            icon={<UserPlus size={30} />}
            title="Create Your Account"
            description="Register securely and access your personal dashboard where only you can manage your applications."
          />

          <StepCard
            number="02"
            icon={<FilePlus2 size={30} />}
            title="Track Applications"
            description="Add company name, job title, status, application date, notes and update them anytime."
          />

          <StepCard
            number="03"
            icon={<BarChart3 size={30} />}
            title="Monitor Progress"
            description="View statistics, search applications, filter by status and stay organized throughout your journey."
          />
        </div>
      </div>
    </section>
  );
}

function StepCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-950">
      {/* Step Number */}
      <div className="absolute right-6 top-6 text-6xl font-black text-gray-100 dark:text-gray-800">
        {number}
      </div>

      {/* Icon */}
      <div className="relative z-10 inline-flex rounded-2xl bg-indigo-100 p-4 text-indigo-600 transition group-hover:scale-110 dark:bg-indigo-900/30">
        {icon}
      </div>

      {/* Content */}
      <h3 className="relative z-10 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="relative z-10 mt-4 leading-7 text-gray-600 dark:text-gray-400">
        {description}
      </p>

      {/* Footer */}
      <div className="relative z-10 mt-8 inline-flex items-center gap-2 font-medium text-indigo-600">
        Step {number}
        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </div>
  );
}
