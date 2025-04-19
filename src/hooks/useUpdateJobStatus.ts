
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { JobStatus } from "@/types/job";

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, status }: { jobId: string, status: JobStatus }) => {
      const { data, error } = await supabase
        .from("saved_jobs")
        .update({ status })
        .eq("id", jobId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
      toast.success(`Job status updated to ${data.status}`);
    },
    onError: (error) => {
      console.error("Error updating job status:", error);
      toast.error("Failed to update job status");
    },
  });
};
