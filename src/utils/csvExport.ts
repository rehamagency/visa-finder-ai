
import { SavedJob } from "@/hooks/useDashboardData";

export const exportJobsToCSV = (jobs: SavedJob[]) => {
  if (!jobs || jobs.length === 0) {
    return;
  }

  // Define CSV headers
  const headers = [
    "Job Title",
    "Company",
    "Location",
    "Status",
    "Date Saved",
    "Application URL"
  ];

  // Convert jobs data to CSV format
  const csvData = jobs.map(job => [
    `"${job.job_title}"`, // Use quotes to handle commas in titles
    `"${job.company}"`,
    `"${job.location}"`,
    job.status,
    new Date(job.date_saved).toLocaleDateString(),
    job.url
  ]);

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
  link.setAttribute("download", `saved_jobs_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
