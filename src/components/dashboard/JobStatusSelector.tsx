
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateJobStatus } from "@/hooks/useUpdateJobStatus";

interface JobStatusSelectorProps {
  jobId: string;
  currentStatus: string;
}

export const JobStatusSelector = ({ jobId, currentStatus }: JobStatusSelectorProps) => {
  const updateStatus = useUpdateJobStatus();

  const handleStatusChange = (newStatus: string) => {
    updateStatus.mutate({ 
      jobId, 
      status: newStatus as "Saved" | "Applied" | "Interview" | "Offer" | "Rejected" 
    });
  };

  return (
    <Select 
      value={currentStatus} 
      onValueChange={handleStatusChange}
      disabled={updateStatus.isPending}
    >
      <SelectTrigger className="w-[120px] h-8 text-xs">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Saved">Saved</SelectItem>
        <SelectItem value="Applied">Applied</SelectItem>
        <SelectItem value="Interview">Interview</SelectItem>
        <SelectItem value="Offer">Offer</SelectItem>
        <SelectItem value="Rejected">Rejected</SelectItem>
      </SelectContent>
    </Select>
  );
};
