
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, MapPin, ExternalLink } from "lucide-react";
import type { SavedJob } from "@/types/job";
import { JobStatusSelector } from "./JobStatusSelector";

interface SavedJobsListProps {
  jobs: SavedJob[];
  isCompact?: boolean;
}

export const SavedJobsList = ({ jobs, isCompact = false }: SavedJobsListProps) => {
  const displayJobs = isCompact ? jobs.slice(0, 3) : jobs;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Jobs</CardTitle>
        <CardDescription>
          Jobs you've recently saved
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayJobs.map((job) => (
            <div 
              key={job.id} 
              className="flex justify-between items-center p-3 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div>
                <h3 className="font-medium">{job.job_title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Building className="h-3 w-3 mr-1" />
                  <span className="mr-2">{job.company}</span>
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{job.location}</span>
                </div>
              </div>
              <div className="flex items-center">
                <JobStatusSelector 
                  jobId={job.id} 
                  currentStatus={(job.status || "Saved") as "Saved" | "Applied" | "Interview" | "Offer" | "Rejected"} 
                  size="sm"
                />
                <Button variant="ghost" size="sm" asChild className="ml-2">
                  <a href={job.url} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
          {isCompact && jobs.length > 3 && (
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="/dashboard">View All Jobs</a>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
