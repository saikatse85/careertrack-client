"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access-token");

    if (!token) {
      router.replace("/auth?mode=login");
    }
    setChecking(false);
  }, [router]);

  if (checking || auth?.loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
