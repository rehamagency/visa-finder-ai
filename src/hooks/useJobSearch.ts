
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";

export interface JobSearchParams {
  jobTitle: string;
  location: string;
  visaOnly: boolean;
  remote: boolean;
  fullTime: boolean;
  partTime: boolean;
  jobUrls: string[];
}

export interface JobSearchResult {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  jobType: string;
  visaSponsored: boolean;
  remote: boolean;
  url: string;
  postedDate: string;
}

export const useJobSearch = () => {
  const { user } = useAuth();
  const [results, setResults] = useState<JobSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchMutation = useMutation({
    mutationFn: async (params: JobSearchParams) => {
      if (!user) {
        throw new Error("You must be logged in to search for jobs");
      }

      setIsLoading(true);
      
      try {
        // Call the Supabase edge function
        const { data, error } = await supabase.functions.invoke('scrape-jobs', {
          body: {
            jobTitle: params.jobTitle,
            location: params.location,
            jobUrls: params.jobUrls.filter(url => url.trim() !== ""),
            visaOnly: params.visaOnly,
            remote: params.remote,
            fullTime: params.fullTime,
            partTime: params.partTime
          }
        });

        if (error) throw error;

        // Transform the search results
        const jobResults: JobSearchResult[] = data.results.map((job: any) => ({
          id: job.id,
          title: job.job_title,
          company: job.company,
          location: job.location,
          description: job.description,
          jobType: job.job_type,
          visaSponsored: job.visa_sponsored,
          remote: job.remote,
          url: job.url,
          postedDate: job.date_posted
        }));

        setResults(jobResults);
        return { results: jobResults, searchId: data.search_id };
      } catch (error: any) {
        console.error("Job search error:", error);
        throw new Error(error.message || "Failed to search for jobs");
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (data) => {
      toast.success(`Found ${data.results.length} jobs matching your criteria`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to search for jobs");
    }
  });

  return {
    search: searchMutation.mutate,
    searchAsync: searchMutation.mutateAsync,
    results,
    isLoading: isLoading || searchMutation.isPending,
    error: searchMutation.error
  };
};
