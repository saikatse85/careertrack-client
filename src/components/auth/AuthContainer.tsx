"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import AuthSidePanel from "./AuthSidePanel";

export default function AuthContainer() {
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const mode = searchParams.get("mode");

    if (mode === "register") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isLogin ? "login" : "register"}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.45 }}
        className="grid min-h-[700px] overflow-hidden rounded-3xl lg:grid-cols-2"
      >
        {isLogin ? (
          <>
            {/* Left - Login Form */}
            <div className="flex items-center justify-center bg-white p-8 dark:bg-gray-900 lg:p-12">
              <div className="w-full max-w-md">
                <LoginForm onToggle={() => setIsLogin(false)} />
              </div>
            </div>

            {/* Right - Side Panel */}
            <AuthSidePanel type="login" onToggle={() => setIsLogin(false)} />
          </>
        ) : (
          <>
            {/* Left - Side Panel */}
            <AuthSidePanel type="register" onToggle={() => setIsLogin(true)} />

            {/* Right - Register Form */}
            <div className="flex items-center justify-center bg-white p-8 dark:bg-gray-900 lg:p-12">
              <div className="w-full max-w-md">
                <RegisterForm onToggle={() => setIsLogin(true)} />
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
