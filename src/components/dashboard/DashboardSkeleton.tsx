export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* ================= Header ================= */}

      <div className="rounded-3xl bg-indigo-200/60 dark:bg-indigo-900/40 p-8">
        <div className="h-5 w-36 rounded bg-white/50 dark:bg-gray-700" />

        <div className="mt-6 h-10 w-80 rounded bg-white/50 dark:bg-gray-700" />

        <div className="mt-4 h-5 w-full max-w-xl rounded bg-white/40 dark:bg-gray-700" />

        <div className="mt-2 h-5 w-2/3 rounded bg-white/40 dark:bg-gray-700" />

        <div className="mt-8 flex gap-4">
          <div className="h-12 w-44 rounded-xl bg-white/50 dark:bg-gray-700" />

          <div className="h-12 w-40 rounded-xl bg-white/30 dark:bg-gray-700" />
        </div>
      </div>

      {/* ================= Stats ================= */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />

                <div className="h-10 w-16 rounded bg-gray-300 dark:bg-gray-600" />

                <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
              </div>

              <div className="h-16 w-16 rounded-2xl bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="mt-6 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>

      {/* ================= Recent Applications ================= */}

      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-200 p-6 dark:border-gray-800">
          <div className="h-6 w-56 rounded bg-gray-200 dark:bg-gray-700" />

          <div className="mt-3 h-4 w-72 rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-700" />

                <div>
                  <div className="h-5 w-44 rounded bg-gray-200 dark:bg-gray-700" />

                  <div className="mt-2 h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>

              <div className="hidden lg:block h-6 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />

              <div className="hidden lg:block h-5 w-24 rounded bg-gray-200 dark:bg-gray-700" />

              <div className="hidden lg:block h-5 w-28 rounded bg-gray-200 dark:bg-gray-700" />

              <div className="h-10 w-24 rounded-xl bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
