
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SavedSearch } from "@/hooks/useDashboardData";
import { CalendarIcon, Search, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface SavedSearchesListProps {
  searches: SavedSearch[];
  isCompact?: boolean;
}

export const SavedSearchesList = ({ searches, isCompact = false }: SavedSearchesListProps) => {
  const navigate = useNavigate();
  const displaySearches = isCompact ? searches.slice(0, 3) : searches;

  const handleRunSearch = (search: SavedSearch) => {
    // Navigate to search page with the saved search parameters
    const params = search.params;
    const queryParams = new URLSearchParams();
    
    if (params.jobTitle) queryParams.append("jobTitle", params.jobTitle);
    if (params.location) queryParams.append("location", params.location);
    if (params.visaOnly) queryParams.append("visaOnly", params.visaOnly.toString());
    if (params.remote) queryParams.append("remote", params.remote.toString());
    if (params.fullTime) queryParams.append("fullTime", params.fullTime.toString());
    if (params.partTime) queryParams.append("partTime", params.partTime.toString());
    
    navigate(`/search?${queryParams.toString()}`);
  };

  if (searches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Searches</CardTitle>
          <CardDescription>
            Your recent search history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No saved searches yet</h3>
            <p className="text-muted-foreground mb-4">
              Save your job searches to run them again later
            </p>
            <Button asChild>
              <a href="/search">Start a new search</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Searches</CardTitle>
        <CardDescription>
          Your recent search history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displaySearches.map((search) => (
            <div 
              key={search.id} 
              className="p-3 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{search.name}</h3>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  <span>
                    {search.created_at
                      ? formatDistanceToNow(new Date(search.created_at), { addSuffix: true })
                      : "Recently"}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 my-2">
                {search.params.jobTitle && (
                  <div className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                    {search.params.jobTitle}
                  </div>
                )}
                {search.params.location && (
                  <div className="bg-secondary/10 text-secondary text-xs px-2 py-0.5 rounded-full">
                    {search.params.location}
                  </div>
                )}
                {search.params.visaOnly && (
                  <div className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full">
                    Visa Sponsored
                  </div>
                )}
                {search.params.remote && (
                  <div className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                    Remote
                  </div>
                )}
              </div>
              
              <div className="flex justify-end mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mr-2"
                  onClick={() => handleRunSearch(search)}
                >
                  <Search className="h-3 w-3 mr-1" />
                  Run
                </Button>
                
                <Button 
                  size="sm" 
                  variant="ghost"
                  asChild
                >
                  <a href="/search" target="_blank" rel="noreferrer">
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
          
          {isCompact && searches.length > 3 && (
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="/dashboard">View All Searches</a>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
