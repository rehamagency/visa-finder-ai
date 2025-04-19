
export type JobStatus = "Saved" | "Applied" | "Interview" | "Offer" | "Rejected";

export interface SavedJob {
  id: string;
  user_id: string;
  job_title: string;
  company: string;
  location: string;
  description: string;
  job_type: string;
  visa_sponsored: boolean;
  remote: boolean;
  url: string;
  date_posted: string;
  date_saved: string;
  notes: string;
  status: JobStatus;
}

export interface JobSearchParams {
  jobTitle: string;
  location: string;
  visaOnly: boolean;
  remote: boolean;
  fullTime: boolean;
  partTime: boolean;
  jobUrls?: string[];
}
