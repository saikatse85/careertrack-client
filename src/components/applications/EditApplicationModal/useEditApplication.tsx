"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { validateApplication } from "./validation";

interface Props {
  id: string;
  initialData: any;
  onSuccess: () => void | Promise<void>;
}

export default function useEditApplication({
  id,
  initialData,
  onSuccess,
}: Props) {
  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function updateApplication() {
    const validation = validateApplication(form);

    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    try {
      setLoading(true);

      await apiFetch(`/applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify(form),
      });

      await onSuccess();
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    errors,
    loading,
    handleChange,
    updateApplication,
  };
}
