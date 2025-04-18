
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

export interface SavedJob {
  id: string;
  job_title: string;
  company: string;
  location: string;
  status: "Saved" | "Applied" | "Interview";
  date_saved: string;
  url: string;
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
      return data as SavedJob[];
    },
    enabled: !!user,
  });

  const { data: savedSearches, isLoading: isLoadingSavedSearches } = useQuery({
    queryKey: ["savedSearches", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_searches")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as SavedSearch[];
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
