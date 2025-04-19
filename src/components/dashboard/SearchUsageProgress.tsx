
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/hooks/useDashboardData";
import { Link } from "react-router-dom";

interface SearchUsageProgressProps {
  profile: UserProfile | null;
}

export const SearchUsageProgress = ({ profile }: SearchUsageProgressProps) => {
  if (!profile) return null;
  
  const { searches_used, total_searches_allowed, subscription_tier } = profile;
  const usagePercentage = Math.min(Math.round((searches_used / total_searches_allowed) * 100), 100);
  const isPremium = subscription_tier !== 'free';
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Usage</CardTitle>
        <CardDescription>
          {isPremium ? 'Premium searches available this month' : 'Free searches remaining'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress 
            value={usagePercentage} 
            className="h-2" 
          />
          <div className="flex justify-between text-sm">
            <span>
              <strong>{searches_used}</strong> used
            </span>
            <span>
              <strong>{total_searches_allowed}</strong> total
            </span>
          </div>
        </div>
      </CardContent>
      {!isPremium && (
        <CardFooter>
          <Button asChild className="w-full">
            <Link to="/pricing">Upgrade for Unlimited Searches</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
