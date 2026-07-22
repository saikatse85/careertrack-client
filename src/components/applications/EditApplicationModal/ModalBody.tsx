"use client";

import FormInput from "@/components/applications/FormInput";
import FormSelect from "@/components/applications/FormSelect";
import FormTextarea from "@/components/applications/FormTextarea";

interface Props {
  form: any;
  errors: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}

const STATUS_OPTIONS = [
  { label: "Saved", value: "SAVED" },
  { label: "Applied", value: "APPLIED" },
  { label: "Assessment", value: "ASSESSMENT" },
  { label: "Interview", value: "INTERVIEW" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Offer", value: "OFFER" },
];

const SOURCE_OPTIONS = [
  { label: "LinkedIn", value: "LINKEDIN" },
  { label: "Bdjobs", value: "BDJOBS" },
  { label: "Indeed", value: "INDEED" },
  { label: "Wellfound", value: "WELLFOUND" },
  { label: "Facebook", value: "FACEBOOK" },
  { label: "Referral", value: "REFERRAL" },
  { label: "Other", value: "OTHER" },
];

export default function ModalBody({ form, errors, handleChange }: Props) {
  return (
    <div className="space-y-8 p-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FormInput
          label="Company Name"
          name="companyName"
          value={form.companyName ?? ""}
          placeholder="Google"
          required
          error={errors.companyName}
          onChange={handleChange}
        />

        <FormInput
          label="Job Title"
          name="jobTitle"
          value={form.jobTitle ?? ""}
          placeholder="Frontend Developer"
          required
          error={errors.jobTitle}
          onChange={handleChange}
        />

        <FormInput
          label="Job URL"
          name="jobUrl"
          type="url"
          value={form.jobUrl ?? ""}
          placeholder="https://company.com/job"
          onChange={handleChange}
        />

        <FormSelect
          label="Application Source"
          name="source"
          value={form.source ?? "LINKEDIN"}
          options={SOURCE_OPTIONS}
          error={errors.source}
          onChange={handleChange}
        />

        <FormInput
          label="Application Date"
          name="applicationDate"
          type="date"
          value={form.applicationDate?.slice(0, 10) ?? ""}
          required
          error={errors.applicationDate}
          onChange={handleChange}
        />

        <FormSelect
          label="Application Status"
          name="status"
          value={form.status ?? "SAVED"}
          options={STATUS_OPTIONS}
          error={errors.status}
          onChange={handleChange}
        />
      </div>

      <FormTextarea
        label="Notes"
        name="notes"
        value={form.notes ?? ""}
        placeholder="Interview schedule, recruiter contact, salary expectation..."
        onChange={handleChange}
      />
    </div>
  );
}
