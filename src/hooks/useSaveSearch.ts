
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

interface SearchParams {
  jobTitle: string;
  location: string;
  visaOnly: boolean;
  remote: boolean;
  fullTime: boolean;
  partTime: boolean;
  jobUrls: string[];
}

export const useSaveSearch = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SearchParams) => {
      if (!user) {
        throw new Error("User must be logged in to save a search");
      }

      const { data, error } = await supabase.from("saved_searches").insert({
        user_id: user.id,
        job_title: params.jobTitle,
        location: params.location,
        visa_only: params.visaOnly,
        remote: params.remote,
        full_time: params.fullTime,
        part_time: params.partTime,
        job_urls: params.jobUrls,
        name: `${params.jobTitle} in ${params.location}`,
        created_at: new Date().toISOString(),
      }).select();

      if (error) throw error;
      
      return data[0];
    },
    onSuccess: () => {
      // Invalidate and refetch saved searches
      queryClient.invalidateQueries({ queryKey: ["savedSearches"] });
      toast.success("Search saved successfully");
    },
    onError: (error) => {
      console.error("Error saving search:", error);
      toast.error("Failed to save search");
    },
  });
};
