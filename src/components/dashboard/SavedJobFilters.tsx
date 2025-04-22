
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { JobStatus } from "@/types/job";

interface SavedJobFiltersProps {
  onFilterChange: (filters: {
    searchTerm: string;
    status: JobStatus | "All";
    sortBy: "newest" | "oldest" | "company" | "title";
  }) => void;
}

export const SavedJobFilters = ({ onFilterChange }: SavedJobFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<JobStatus | "All">("All");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "company" | "title">("newest");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    applyFilters(e.target.value, status, sortBy);
  };

  const handleStatusChange = (value: JobStatus | "All") => {
    setStatus(value);
    applyFilters(searchTerm, value, sortBy);
  };

  const handleSortChange = (value: "newest" | "oldest" | "company" | "title") => {
    setSortBy(value);
    applyFilters(searchTerm, status, value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatus("All");
    setSortBy("newest");
    applyFilters("", "All", "newest");
  };

  const applyFilters = (
    search: string,
    statusFilter: JobStatus | "All",
    sort: "newest" | "oldest" | "company" | "title"
  ) => {
    onFilterChange({
      searchTerm: search,
      status: statusFilter,
      sortBy: sort,
    });
  };

  return (
    <div className="bg-card rounded-lg p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by title, company..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={status}
            onValueChange={(value) => 
              handleStatusChange(value as JobStatus | "All")
            }
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Saved">Saved</SelectItem>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Offer">Offer</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sortBy">Sort By</Label>
          <Select
            value={sortBy}
            onValueChange={(value) => 
              handleSortChange(value as "newest" | "oldest" | "company" | "title")
            }
          >
            <SelectTrigger id="sortBy">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="title">Job Title</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            size="sm"
            className="ml-auto"
            onClick={clearFilters}
          >
            <X className="h-4 w-4 mr-1" /> Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};
