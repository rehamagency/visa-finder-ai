
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SavedJobFiltersProps {
  onStatusFilter: (status: string) => void;
  onSortChange: (sort: string) => void;
  selectedStatus: string;
  selectedSort: string;
}

export const SavedJobFilters = ({
  onStatusFilter,
  onSortChange,
  selectedStatus,
  selectedSort
}: SavedJobFiltersProps) => {
  return (
    <div className="flex space-x-4 mb-4">
      <Select value={selectedStatus} onValueChange={onStatusFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="Saved">Saved</SelectItem>
          <SelectItem value="Applied">Applied</SelectItem>
          <SelectItem value="Interview">Interview</SelectItem>
          <SelectItem value="Offer">Offer</SelectItem>
          <SelectItem value="Rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest first</SelectItem>
          <SelectItem value="oldest">Oldest first</SelectItem>
          <SelectItem value="company">Company name</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
