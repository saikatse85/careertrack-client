export const APPLICATION_STATUSES = [
  "Saved",
  "Applied",
  "Assessment",
  "Interview",
  "Rejected",
  "Offer",
] as const;

export const APPLICATION_SOURCES = [
  "LinkedIn",
  "Bdjobs",
  "Indeed",
  "Wellfound",
  "Facebook",
  "Referral",
  "Other",
] as const;

export const INITIAL_FORM = {
  companyName: "",
  jobTitle: "",
  status: "Saved",
  source: "LinkedIn",
  applicationDate: "",
  jobUrl: "",
  notes: "",
};
