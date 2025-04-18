
import { SavedJob } from "@/hooks/useDashboardData";

export interface SearchResult {
  id: number | string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  jobType: string;
  visaSponsored: boolean;
  postedDate: string;
  url: string;
  description?: string;
}

export const exportJobsToCSV = (jobs: SavedJob[] | SearchResult[], type: 'saved' | 'search' = 'saved') => {
  if (!jobs || jobs.length === 0) {
    return;
  }

  // Define CSV headers based on type
  const headers = type === 'saved' 
    ? ["Job Title", "Company", "Location", "Status", "Date Saved", "Application URL"]
    : ["Job Title", "Company", "Location", "Job Type", "Remote", "Visa Sponsored", "Date Posted", "Application URL"];

  // Convert jobs data to CSV format
  const csvData = jobs.map(job => {
    if (type === 'saved') {
      const savedJob = job as SavedJob;
      return [
        `"${savedJob.job_title}"`,
        `"${savedJob.company}"`,
        `"${savedJob.location}"`,
        savedJob.status,
        new Date(savedJob.date_saved).toLocaleDateString(),
        savedJob.url
      ];
    } else {
      const searchResult = job as SearchResult;
      return [
        `"${searchResult.title}"`,
        `"${searchResult.company}"`,
        `"${searchResult.location}"`,
        searchResult.jobType || "",
        searchResult.remote ? "Yes" : "No",
        searchResult.visaSponsored ? "Yes" : "No",
        new Date(searchResult.postedDate).toLocaleDateString(),
        searchResult.url || ""
      ];
    }
  });

  // Combine headers and data
  const csvContent = [
    headers.join(","),
    ...csvData.map(row => row.join(","))
  ].join("\n");

  // Create a Blob with the CSV data
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  
  // Create a download link and trigger the download
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  
  const filename = type === 'saved' 
    ? `saved_jobs_${new Date().toISOString().slice(0, 10)}.csv`
    : `job_search_results_${new Date().toISOString().slice(0, 10)}.csv`;
  
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
