"use client";
export default function Badge({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="text-indigo-600">{icon}</div>

      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {text}
      </span>
    </div>
  );
}
