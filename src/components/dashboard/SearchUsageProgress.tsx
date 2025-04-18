
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/components/AuthProvider";
import { UserProfile } from "@/hooks/useDashboardData";

interface SearchUsageProgressProps {
  profile: UserProfile;
}

export const SearchUsageProgress = ({ profile }: SearchUsageProgressProps) => {
  const { user } = useAuth();
  
  if (!user || !profile) return null;
  
  const { searches_used, total_searches_allowed } = profile;
  const usagePercentage = (searches_used / total_searches_allowed) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Search Usage</span>
        <span className="font-medium">{searches_used} of {total_searches_allowed}</span>
      </div>
      <Progress value={usagePercentage} className="h-2" />
      {usagePercentage >= 80 && (
        <p className="text-xs text-amber-500">
          You're almost at your search limit. Consider upgrading to our premium plan for unlimited searches.
        </p>
      )}
      {usagePercentage >= 100 && (
        <p className="text-xs text-destructive">
          You've reached your search limit. <a href="/pricing" className="font-medium underline">Upgrade now</a> to continue searching.
        </p>
      )}
    </div>
  );
};
