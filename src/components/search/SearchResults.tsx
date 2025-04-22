
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, ExternalLink, Save, Calendar } from "lucide-react";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { useSaveJob } from "@/hooks/useSaveJob";
import { toast } from "sonner";

export interface SearchResultItem {
  id: string;
  title: string;
  company: string;
  location: string;
  description?: string;
  jobType?: string;
  visaSponsored: boolean;
  remote: boolean;
  url: string;
  postedDate?: string;
}

interface SearchResultsProps {
  results: SearchResultItem[];
  isLoading: boolean;
}

export const SearchResults = ({ results, isLoading }: SearchResultsProps) => {
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  const saveJob = useSaveJob();

  const handleSaveJob = (job: SearchResultItem) => {
    if (savedJobIds.has(job.id)) {
      toast.info("This job is already saved");
      return;
    }

    saveJob.mutate(
      {
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        jobType: job.jobType,
        visaSponsored: job.visaSponsored,
        remote: job.remote,
        url: job.url,
        postedDate: job.postedDate,
      },
      {
        onSuccess: () => {
          setSavedJobIds((prev) => new Set(prev).add(job.id));
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Searching for jobs...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">
              Please wait while we search for matching jobs. This may take a few moments.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Results Found</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-6 text-center">
            <p className="text-muted-foreground">
              No jobs matching your criteria were found. Try adjusting your search parameters.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Search Results ({results.length} jobs)
        </h2>
        <ExportButton jobs={results} type="search" variant="outline" />
      </div>

      <div className="space-y-4">
        {results.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <div className="border-l-4 border-primary h-full"></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center">
                    <Building className="h-3 w-3 mr-1" />
                    <span className="mr-2">{job.company}</span>
                    {job.location && (
                      <>
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{job.location}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.visaSponsored && (
                    <Badge variant="secondary">Visa Sponsored</Badge>
                  )}
                  {job.remote && <Badge>Remote</Badge>}
                  {job.jobType && (
                    <Badge variant="outline">{job.jobType}</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              {job.description && (
                <p className="text-sm text-muted-foreground mb-3">
                  {job.description.length > 200
                    ? `${job.description.substring(0, 200)}...`
                    : job.description}
                </p>
              )}
              {job.postedDate && (
                <div className="text-xs text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSaveJob(job)}
                disabled={savedJobIds.has(job.id) || saveJob.isPending}
              >
                <Save className="h-4 w-4 mr-1" />
                {savedJobIds.has(job.id) ? "Saved" : "Save Job"}
              </Button>
              <Button size="sm" asChild>
                <a href={job.url} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Apply
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
