import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  BriefcaseBusiness,
} from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600" />

      {/* Decorative Blobs */}
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-xl">
          <div className="grid items-center gap-12 p-10 lg:grid-cols-2 lg:p-16">
            {/* Left */}
            <div>
              <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white">
                🚀 Start Your Career Journey
              </span>

              <h2 className="mt-8 text-4xl font-extrabold leading-tight text-white lg:text-6xl">
                Organize Every
                <span className="block">Job Application</span>
                <span className="block text-indigo-200">
                  Like a Professional
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-lg leading-8 text-indigo-100">
                Stop using spreadsheets and scattered notes. Track applications,
                interviews and offers in one beautiful, secure dashboard.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/auth?mode=register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-indigo-700 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:shadow-2xl"
                >
                  Create Free Account
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/auth?mode=login"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
                >
                  Login
                </Link>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-5">
              <CTAFeature
                icon={<ShieldCheck size={22} />}
                title="Secure Authentication"
                description="JWT-based authentication keeps your account and applications protected."
              />

              <CTAFeature
                icon={<BriefcaseBusiness size={22} />}
                title="Complete Application Tracking"
                description="Manage every company, interview, assessment and offer from one dashboard."
              />

              <CTAFeature
                icon={<CheckCircle2 size={22} />}
                title="Simple & Responsive"
                description="Designed to work beautifully on desktop, tablet and mobile devices."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Helper ---------------- */

function CTAFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/15">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>

          <p className="mt-2 leading-7 text-indigo-100">{description}</p>
        </div>
      </div>
    </div>
  );
}
