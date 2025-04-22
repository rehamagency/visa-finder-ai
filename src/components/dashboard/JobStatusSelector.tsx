
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useUpdateJobStatus } from "@/hooks/useUpdateJobStatus";
import type { JobStatus } from "@/types/job";

interface JobStatusSelectorProps {
  jobId: string;
  currentStatus: JobStatus;
  size?: "sm" | "default";
}

export const JobStatusSelector = ({ 
  jobId, 
  currentStatus = "Saved",
  size = "default"
}: JobStatusSelectorProps) => {
  const [status, setStatus] = useState<JobStatus>(currentStatus);
  const updateStatus = useUpdateJobStatus();

  const statusOptions: { value: JobStatus; label: string; color: string }[] = [
    { value: "Saved", label: "Saved", color: "bg-muted text-muted-foreground" },
    { value: "Applied", label: "Applied", color: "bg-primary/10 text-primary" },
    { value: "Interview", label: "Interview", color: "bg-secondary/10 text-secondary" },
    { value: "Offer", label: "Offer", color: "bg-accent/10 text-accent" },
    { value: "Rejected", label: "Rejected", color: "bg-destructive/10 text-destructive" },
  ];

  const handleStatusChange = (newStatus: JobStatus) => {
    if (newStatus !== status) {
      setStatus(newStatus);
      updateStatus.mutate({ jobId, status: newStatus });
    }
  };

  const currentOption = statusOptions.find((option) => option.value === status);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          size={size} 
          className={cn(
            "justify-between font-normal",
            currentOption?.color
          )}
        >
          {currentOption?.label}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            className={cn(
              "flex items-center justify-between",
              status === option.value && "font-medium"
            )}
          >
            <span className={cn("mr-2", option.color)}>{option.label}</span>
            {status === option.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
