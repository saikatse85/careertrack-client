export interface ApplicationForm {
  companyName: string;
  jobTitle: string;
  source: string;
  status: string;
  applicationDate: string;
  jobUrl?: string;
  notes?: string;
}

export function validateApplication(data: ApplicationForm) {
  const errors: Record<string, string> = {};

  if (!data.companyName?.trim()) {
    errors.companyName = "Company name is required";
  }

  if (!data.jobTitle?.trim()) {
    errors.jobTitle = "Job title is required";
  }

  if (!data.status) {
    errors.status = "Status is required";
  }

  if (!data.source) {
    errors.source = "Source is required";
  }

  if (!data.applicationDate) {
    errors.applicationDate = "Application date is required";
  }

  if (data.jobUrl && !/^https?:\/\/.+/i.test(data.jobUrl)) {
    errors.jobUrl = "Please enter a valid URL";
  }

  return errors;
}
