
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

interface JobData {
  title: string;
  company: string;
  location: string;
  description?: string;
  jobType?: string;
  visaSponsored?: boolean;
  remote?: boolean;
  url?: string;
  postedDate?: string;
}

export const useSaveJob = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (job: JobData) => {
      if (!user) {
        throw new Error("User must be logged in to save a job");
      }

      const { data, error } = await supabase.from("saved_jobs").insert({
        user_id: user.id,
        job_title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        job_type: job.jobType,
        visa_sponsored: job.visaSponsored ?? true,
        remote: job.remote ?? false,
        url: job.url,
        date_posted: job.postedDate,
        date_saved: new Date().toISOString(),
      }).select();

      if (error) throw error;
      
      return data[0];
    },
    onSuccess: () => {
      // Invalidate and refetch saved jobs
      queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
      toast.success("Job saved successfully");
    },
    onError: (error) => {
      console.error("Error saving job:", error);
      toast.error("Failed to save job");
    },
  });
};
