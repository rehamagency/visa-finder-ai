
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building, MapPin, Link as LinkIcon, FileText, Clock } from "lucide-react";
import { SavedJob } from "@/types/job";
import { JobStatusSelector } from "./JobStatusSelector";
import { JobNotes } from "./JobNotes";
import { format } from "date-fns";

interface JobDetailsProps {
  job: SavedJob;
  isOpen: boolean;
  onClose: () => void;
}

export const JobDetails = ({ job, isOpen, onClose }: JobDetailsProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{job.job_title}</DialogTitle>
          <DialogDescription className="flex items-center space-x-1">
            <Building className="h-4 w-4" />
            <span>{job.company}</span>
            {job.location && (
              <>
                <span className="mx-1">•</span>
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Job Description</h3>
              <div className="text-sm text-muted-foreground">
                {job.description ? job.description : "No description available."}
              </div>
            </div>
            
            <JobNotes jobId={job.id} initialNotes={job.notes || ""} />
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Status</h3>
              <JobStatusSelector 
                jobId={job.id} 
                currentStatus={(job.status || "Saved") as "Saved" | "Applied" | "Interview" | "Offer" | "Rejected"} 
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Details</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date Saved</p>
                    <p className="text-sm">{formatDate(job.date_saved)}</p>
                  </div>
                </div>
                
                {job.date_posted && (
                  <div className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date Posted</p>
                      <p className="text-sm">{formatDate(job.date_posted)}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start space-x-2">
                  <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Job Type</p>
                    <p className="text-sm">{job.job_type || "Not specified"}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.remote && (
                    <Badge variant="secondary">Remote</Badge>
                  )}
                  {job.visa_sponsored && (
                    <Badge variant="outline">Visa Sponsored</Badge>
                  )}
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-4" asChild>
              <a href={job.url || "#"} target="_blank" rel="noreferrer">
                <LinkIcon className="h-4 w-4 mr-2" />
                Apply Now
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
