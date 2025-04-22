
import { Button } from "@/components/ui/button";
import { exportJobsToCSV } from "@/utils/csvExport";
import { SavedJob } from "@/types/job";
import { SearchResult } from "@/utils/csvExport";
import { Download } from "lucide-react";

interface ExportButtonProps {
  jobs: SavedJob[] | SearchResult[];
  type: 'saved' | 'search';
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const ExportButton = ({ 
  jobs, 
  type, 
  variant = "default",
  size = "default"
}: ExportButtonProps) => {
  if (!jobs || jobs.length === 0) {
    return null;
  }

  const handleExport = () => {
    exportJobsToCSV(jobs, type);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleExport}
    >
      <Download className="h-4 w-4 mr-2" />
      Export to CSV
    </Button>
  );
};
