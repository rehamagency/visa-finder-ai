
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, MapPin, ExternalLink } from "lucide-react";
import type { SavedJob } from "@/hooks/useDashboardData";

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
                <span 
                  className={`text-xs px-2 py-0.5 rounded-full mr-2
                    ${job.status === "Applied" ? "bg-primary/10 text-primary" : 
                      job.status === "Interview" ? "bg-accent/10 text-accent" : 
                      "bg-muted text-muted-foreground"}`}
                >
                  {job.status}
                </span>
                <Button variant="ghost" size="sm" asChild>
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
                <a href="/jobs">View All Jobs</a>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
