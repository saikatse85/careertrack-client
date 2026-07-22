"use client";

import { useContext, useEffect, useState } from "react";
import { User, Mail, CalendarDays, Briefcase } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { AuthContext } from "@/context/AuthContext";

export default function ProfilePage() {
  const auth = useContext(AuthContext);

  const user = auth?.user;

  const [totalApplications, setTotalApplications] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await apiFetch<{
          success: boolean;
          data: any[];
        }>("/applications");

        setTotalApplications(data.data?.length || 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  if (!user) {
    return <div className="rounded-3xl bg-white p-10">Loading user...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div
        className="
        rounded-3xl
        bg-gradient-to-br
        from-indigo-600
        to-violet-600
        p-8
        text-white
        shadow-xl
        "
      >
        <h1 className="text-3xl font-bold">My Profile</h1>

        <p className="mt-2 text-indigo-100">Manage your account information</p>
      </div>

      <div
        className="
        rounded-3xl
        border
        bg-white
        p-8
        shadow-lg
        dark:border-gray-800
        dark:bg-gray-900
        "
      >
        <ProfileItem icon={<User />} label="Name" value={user.name} />

        <ProfileItem icon={<Mail />} label="Email" value={user.email} />

        <ProfileItem
          icon={<CalendarDays />}
          label="Member Since"
          value={
            user.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : "N/A"
          }
        />

        <ProfileItem
          icon={<Briefcase />}
          label="Total Applications"
          value={totalApplications.toString()}
        />
      </div>
    </div>
  );
}

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
flex
items-center
gap-4
border-b
py-5
last:border-none
dark:border-gray-800
"
    >
      <div
        className="
rounded-xl
bg-indigo-100
p-3
text-indigo-600
dark:bg-indigo-900/30
"
      >
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>

        <p className="font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
