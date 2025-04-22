
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PencilLine, Check } from "lucide-react";

interface JobNotesProps {
  jobId: string;
  initialNotes?: string;
}

export const JobNotes = ({ jobId, initialNotes = "" }: JobNotesProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(initialNotes);
  const queryClient = useQueryClient();

  const updateNotes = useMutation({
    mutationFn: async (notes: string) => {
      const { data, error } = await supabase
        .from("saved_jobs")
        .update({ notes })
        .eq("id", jobId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
      toast.success("Notes updated successfully");
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Error updating notes:", error);
      toast.error("Failed to update notes");
    },
  });

  const handleSave = () => {
    updateNotes.mutate(notes);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Notes</h3>
        {!isEditing ? (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(true)}
          >
            <PencilLine className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSave}
            disabled={updateNotes.isPending}
          >
            <Check className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about this job application..."
          className="min-h-[100px]"
        />
      ) : (
        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md min-h-[60px]">
          {notes ? notes : "No notes added yet."}
        </div>
      )}
    </div>
  );
};
