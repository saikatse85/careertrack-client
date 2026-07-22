import AuthContainer from "@/components/auth/AuthContainer";

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-5 py-10">
      <div className="w-full p-5 max-w-7xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
        <AuthContainer />
      </div>
    </main>
  );
}
