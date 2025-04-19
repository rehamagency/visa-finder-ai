import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import type { SavedJob, JobStatus } from "@/types/job";

export interface SavedJob {
  id: string;
  user_id: string;
  job_title: string;
  company: string;
  location: string;
  description: string;
  job_type: string;
  visa_sponsored: boolean;
  remote: boolean;
  url: string;
  date_posted: string;
  date_saved: string;
  notes: string;
  status: string;  // Added status property to interface
}

export interface SavedSearch {
  id: string;
  user_id: string;
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
    fullTime: boolean;
    partTime: boolean;
  };
  created_at: string;
  last_run: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  subscription_status: string;
  subscription_tier: string;
  searches_used: number;
  total_searches_allowed: number;
}

export const useDashboardData = () => {
  const { user } = useAuth();

  const savedJobsQuery = useQuery({
    queryKey: ["savedJobs"],
    queryFn: async (): Promise<SavedJob[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("saved_jobs")
        .select("*")
        .eq("user_id", user.id)
        .order("date_saved", { ascending: false });

      if (error) throw error;
      
      return data.map(job => ({
        ...job,
        status: (job.status as JobStatus) || "Saved"
      }));
    },
    enabled: !!user,
  });

  const savedSearchesQuery = useQuery({
    queryKey: ["savedSearches"],
    queryFn: async (): Promise<SavedSearch[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("saved_searches")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      return data.map(search => ({
        id: search.id,
        user_id: search.user_id,
        name: search.name || search.job_title,
        job_title: search.job_title,
        location: search.location,
        results: 0, // Default value
        date: search.created_at,
        params: {
          jobTitle: search.job_title,
          location: search.location,
          visaOnly: search.visa_only || false,
          remote: search.remote || false,
          fullTime: search.full_time || false,
          partTime: search.part_time || false
        },
        created_at: search.created_at,
        last_run: search.last_run
      }));
    },
    enabled: !!user,
  });

  const userProfileQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: async (): Promise<UserProfile | null> => {
      if (!user) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Calculate status distribution
  const statusDistribution = savedJobsQuery.data ? 
    savedJobsQuery.data.reduce((acc, job) => {
      const status = job.status || "Saved";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) : {};

  return {
    savedJobs: savedJobsQuery.data || [],
    savedSearches: savedSearchesQuery.data || [],
    profile: userProfileQuery.data, // Renamed from userProfile to profile to match usage
    isLoading: savedJobsQuery.isLoading || savedSearchesQuery.isLoading || userProfileQuery.isLoading,
    isError: savedJobsQuery.isError || savedSearchesQuery.isError || userProfileQuery.isError,
    error: savedJobsQuery.error || savedSearchesQuery.error || userProfileQuery.error,
    statusDistribution
  };
};
