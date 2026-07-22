import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  side: ReactNode;
}

export default function AuthLayout({ children, side }: AuthLayoutProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 py-10">
        <div className="grid w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900 lg:grid-cols-2">
          {/* Left Side */}
          <div className="order-2 lg:order-1">{side}</div>

          {/* Right Side */}
          <div className="order-1 flex items-center justify-center p-8 sm:p-12 lg:order-2">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
