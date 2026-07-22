export interface User {
  id: string;
  name: string;
  email: string;
}

export type ApplicationStatus =
  "SAVED" | "APPLIED" | "ASSESSMENT" | "INTERVIEW" | "REJECTED" | "OFFER";

export type ApplicationSource =
  | "LINKEDIN"
  | "BDJOBS"
  | "INDEED"
  | "WELLFOUND"
  | "FACEBOOK"
  | "REFERRAL"
  | "OTHER";

export interface Application {
  id: string;
  companyName: string;
  jobTitle: string;
  jobUrl?: string;
  source: ApplicationSource;
  status: ApplicationStatus;
  applicationDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
