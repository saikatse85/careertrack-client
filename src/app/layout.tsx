import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/components/ThemeProvider";
import AuthProvider from "@/context/AuthContext";
import LoadingProvider from "@/context/LoadingContext";

export const metadata: Metadata = {
  title: {
    default: "CareerTrack Lite",
    template: "%s | CareerTrack Lite",
  },
  description:
    "CareerTrack Lite helps you organize and track your job applications in one place.",
  keywords: [
    "CareerTrack Lite",
    "Job Tracker",
    "Job Application",
    "Next.js",
    "Prisma",
    "PostgreSQL",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <LoadingProvider>
              <main>{children}</main>
            </LoadingProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
