
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportJobsToCSV, SearchResult } from "@/utils/csvExport";
import { SavedJob } from "@/hooks/useDashboardData";

interface ExportButtonProps {
  jobs: SavedJob[] | SearchResult[];
  type?: 'saved' | 'search';
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const ExportButton = ({ 
  jobs, 
  type = 'saved',
  variant = "outline", 
  size = "sm",
  className = ""
}: ExportButtonProps) => {
  const handleExport = () => {
    exportJobsToCSV(jobs, type);
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleExport}
      className={className}
      disabled={!jobs || jobs.length === 0}
    >
      <Download className="h-4 w-4 mr-2" />
      Export to CSV
    </Button>
  );
};
