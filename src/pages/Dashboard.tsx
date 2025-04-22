
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { useDashboardData } from "@/hooks/useDashboardData";
import { SavedJobsList } from "@/components/dashboard/SavedJobsList";
import { SavedSearchesList } from "@/components/dashboard/SavedSearchesList";
import { SearchStats } from "@/components/dashboard/SearchStats";
import { SearchUsageProgress } from "@/components/dashboard/SearchUsageProgress";
import { SavedJobFilters } from "@/components/dashboard/SavedJobFilters";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { JobDetails } from "@/components/dashboard/JobDetails";
import { JobStatus, SavedJob } from "@/types/job";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { savedJobs, savedSearches, profile, isLoading, statusDistribution } = useDashboardData();
  
  const [filteredJobs, setFilteredJobs] = useState<SavedJob[]>([]);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedJob, setSelectedJob] = useState<SavedJob | null>(null);

  // Apply initial filtering
  useEffect(() => {
    if (savedJobs) {
      setFilteredJobs(savedJobs);
    }
  }, [savedJobs]);

  const handleFilterChange = (filters: {
    searchTerm: string;
    status: JobStatus | "All";
    sortBy: "newest" | "oldest" | "company" | "title";
  }) => {
    if (!savedJobs) return;

    let filtered = [...savedJobs];

    // Filter by search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.job_title.toLowerCase().includes(term) ||
          job.company.toLowerCase().includes(term) ||
          (job.location && job.location.toLowerCase().includes(term))
      );
    }

    // Filter by status
    if (filters.status !== "All") {
      filtered = filtered.filter(
        (job) => (job.status || "Saved") === filters.status
      );
    }

    // Sort jobs
    filtered = filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "newest":
          return new Date(b.date_saved).getTime() - new Date(a.date_saved).getTime();
        case "oldest":
          return new Date(a.date_saved).getTime() - new Date(b.date_saved).getTime();
        case "company":
          return a.company.localeCompare(b.company);
        case "title":
          return a.job_title.localeCompare(b.job_title);
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  };

  const handleViewJobDetails = (job: SavedJob) => {
    setSelectedJob(job);
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-[150px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-[300px] rounded-lg" />
            <Skeleton className="h-[300px] rounded-lg" />
          </div>
          <Skeleton className="h-[400px] rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your saved jobs and searches
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button asChild>
              <Link to="/search">
                <Search className="h-4 w-4 mr-2" />
                New Job Search
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="saved-jobs">Saved Jobs</TabsTrigger>
            <TabsTrigger value="searches">Searches</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SearchUsageProgress 
                searchesUsed={profile?.searches_used || 0}
                totalSearchesAllowed={profile?.total_searches_allowed || 10}
                subscriptionTier={profile?.subscription_tier || "free"}
              />
              <SearchStats 
                savedJobs={savedJobs || []}
                statusDistribution={statusDistribution || {}}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <SavedJobsList jobs={savedJobs || []} isCompact />
              <SavedSearchesList searches={savedSearches || []} isCompact />
            </div>
          </TabsContent>
          
          <TabsContent value="saved-jobs" className="space-y-4">
            {savedJobs && savedJobs.length > 0 ? (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    Your Saved Jobs ({filteredJobs.length})
                  </h2>
                  <ExportButton jobs={filteredJobs} type="saved" variant="outline" size="sm" />
                </div>
                
                <SavedJobFilters onFilterChange={handleFilterChange} />
                
                {filteredJobs.length > 0 ? (
                  <div className="space-y-4">
                    {filteredJobs.map((job) => (
                      <Card key={job.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{job.job_title}</CardTitle>
                              <div className="text-sm text-muted-foreground mt-1">
                                {job.company} • {job.location || "Remote"}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {job.remote && (
                                <div className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full">
                                  Remote
                                </div>
                              )}
                              {job.visa_sponsored && (
                                <div className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">
                                  Visa Sponsored
                                </div>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {job.description && (
                            <p className="text-sm text-muted-foreground mb-4">
                              {job.description.length > 200
                                ? `${job.description.substring(0, 200)}...`
                                : job.description}
                            </p>
                          )}
                          <div className="text-sm">
                            <span className="font-medium">Saved: </span>
                            {new Date(job.date_saved).toLocaleDateString()}
                            {job.date_posted && (
                              <>
                                <span className="mx-2">•</span>
                                <span className="font-medium">Posted: </span>
                                {new Date(job.date_posted).toLocaleDateString()}
                              </>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-0">
                          <div>
                            {job.notes && (
                              <div className="text-sm italic text-muted-foreground">
                                "{job.notes.length > 100 ? `${job.notes.substring(0, 100)}...` : job.notes}"
                              </div>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <JobStatusSelector 
                              jobId={job.id} 
                              currentStatus={(job.status || "Saved") as "Saved" | "Applied" | "Interview" | "Offer" | "Rejected"} 
                              size="sm"
                            />
                            <Button variant="outline" size="sm" onClick={() => handleViewJobDetails(job)}>
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <a href={job.url || "#"} target="_blank" rel="noreferrer">
                                Apply
                              </a>
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No jobs match your filter criteria. Try adjusting your filters.
                    </AlertDescription>
                  </Alert>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <Plus className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No saved jobs yet</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Save jobs from your search results to track your applications and manage your job search process.
                </p>
                <Button asChild>
                  <Link to="/search">
                    <Search className="h-4 w-4 mr-2" />
                    Start Job Search
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="searches">
            <SavedSearchesList searches={savedSearches || []} />
          </TabsContent>
        </Tabs>
      </div>
      
      {selectedJob && (
        <JobDetails 
          job={selectedJob} 
          isOpen={!!selectedJob} 
          onClose={() => setSelectedJob(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;
