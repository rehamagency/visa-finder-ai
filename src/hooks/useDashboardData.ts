
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export interface SavedJob {
  id: string;
  job_title: string;
  company: string;
  location: string;
  status: "Saved" | "Applied" | "Interview" | "Offer" | "Rejected";
  date_saved: string;
  url: string;
  description?: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  job_title: string;
  location: string;
  results: number;
  date: string;
  params: {
    jobTitle: string;
    location: string;
    visaOnly: boolean;
    remote: boolean;
  };
}

export interface UserProfile {
  subscription_tier: string;
  subscription_status: string;
  searches_used: number;
  total_searches_allowed: number;
}

export const useDashboardData = () => {
  const { user } = useAuth();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      return data as UserProfile;
    },
    enabled: !!user,
  });

  const { data: savedJobs, isLoading: isLoadingSavedJobs } = useQuery({
    queryKey: ["savedJobs", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_jobs")
        .select("*")
        .eq("user_id", user?.id)
        .order("date_saved", { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our expected SavedJob type
      return data.map(job => ({
        id: job.id,
        job_title: job.job_title,
        company: job.company,
        location: job.location || "",
        status: job.status || "Saved" as "Saved" | "Applied" | "Interview" | "Offer" | "Rejected",
        date_saved: job.date_saved,
        url: job.url || "#",
        description: job.description
      })) as SavedJob[];
    },
    enabled: !!user,
  });

  const { data: savedSearches, isLoading: isLoadingSavedSearches } = useQuery({
    queryKey: ["savedSearches", user?.id],
    queryFn: async () => {
      const { data: searches, error: searchesError } = await supabase
        .from("saved_searches")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (searchesError) throw searchesError;
      
      // Get result counts for each search
      const searchIds = searches.map(search => search.id);
      
      const { data: resultCounts, error: countsError } = await supabase
        .from("search_results")
        .select("search_id, count")
        .in("search_id", searchIds)
        .groupBy("search_id");
        
      const resultsMap = new Map();
      if (!countsError && resultCounts) {
        resultCounts.forEach(count => {
          resultsMap.set(count.search_id, parseInt(count.count));
        });
      }
      
      // Transform the data to match our expected SavedSearch type
      return searches.map(search => ({
        id: search.id,
        name: search.name || search.job_title || "Untitled Search",
        job_title: search.job_title || "",
        location: search.location || "",
        results: resultsMap.get(search.id) || 0,
        date: search.created_at,
        params: {
          jobTitle: search.job_title || "",
          location: search.location || "",
          visaOnly: search.visa_only || false,
          remote: search.remote || false
        }
      })) as SavedSearch[];
    },
    enabled: !!user,
  });

  return {
    profile,
    savedJobs,
    savedSearches,
    isLoading: isLoadingProfile || isLoadingSavedJobs || isLoadingSavedSearches,
  };
};
