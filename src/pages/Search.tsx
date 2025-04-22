
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { SearchForm } from "@/components/search/SearchForm";
import { SearchResults, SearchResultItem } from "@/components/search/SearchResults";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useJobSearch } from "@/hooks/useJobSearch";
import { toast } from "sonner";

const Search = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { results, isLoading, error } = useJobSearch();
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Parse query parameters to initialize search form
  const searchParams = new URLSearchParams(location.search);
  const initialValues = {
    jobTitle: searchParams.get("jobTitle") || "",
    location: searchParams.get("location") || "",
    visaOnly: searchParams.get("visaOnly") === "true",
    remote: searchParams.get("remote") === "true",
    fullTime: searchParams.get("fullTime") !== "false", // default to true
    partTime: searchParams.get("partTime") === "true",
    jobUrls: searchParams.getAll("jobUrls") || ["", ""]
  };

  // Set search results when available
  useEffect(() => {
    if (results && results.length > 0) {
      setSearchResults(
        results.map((result) => ({
          id: result.id,
          title: result.title,
          company: result.company,
          location: result.location,
          description: result.description,
          jobType: result.jobType,
          visaSponsored: result.visaSponsored,
          remote: result.remote,
          url: result.url,
          postedDate: result.postedDate
        }))
      );
      setHasSearched(true);
    }
  }, [results]);

  // Handle search completion
  const handleSearchComplete = (results: SearchResultItem[]) => {
    setSearchResults(results);
    setHasSearched(true);
    
    // Update URL with search parameters to make it shareable
    // This functionality can be implemented as a future enhancement
  };

  // Show authentication alert if user is not logged in
  if (!user) {
    return (
      <div className="container py-12">
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            You need to sign in to search for jobs. Please log in or create an account.
          </AlertDescription>
          <Button className="mt-4" asChild>
            <a href="/auth">Go to Login</a>
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Job Search</h1>
          <p className="text-muted-foreground">
            Find visa-sponsored jobs globally using our AI-powered job search
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <SearchForm 
            onSearchComplete={handleSearchComplete}
            initialValues={initialValues}
          />
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error instanceof Error ? error.message : "An error occurred during search. Please try again."}
              </AlertDescription>
            </Alert>
          )}
          
          {hasSearched && (
            <SearchResults results={searchResults} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
