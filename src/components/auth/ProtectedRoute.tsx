"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("access-token");

    if (!token) {
      router.replace("/auth");
    }
  }, [router]);

  if (auth?.loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
