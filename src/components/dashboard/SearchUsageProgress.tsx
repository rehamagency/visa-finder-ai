
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

interface SearchUsageProgressProps {
  searchesUsed: number;
  totalSearchesAllowed: number;
  subscriptionTier: string;
}

export const SearchUsageProgress = ({ 
  searchesUsed = 0, 
  totalSearchesAllowed = 10,
  subscriptionTier = "free"
}: SearchUsageProgressProps) => {
  const remaining = Math.max(0, totalSearchesAllowed - searchesUsed);
  const usagePercentage = (searchesUsed / totalSearchesAllowed) * 100;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm font-medium">
            <span>{searchesUsed} used</span>
            <span>{remaining} remaining</span>
          </div>
          
          <Progress value={usagePercentage} className="h-2" />
          
          <div>
            <div className="text-sm text-muted-foreground mb-4">
              {subscriptionTier === "free" ? (
                <span>
                  You are currently on the <span className="font-medium">Free tier</span> with {totalSearchesAllowed} searches per month.
                </span>
              ) : (
                <span>
                  You are on the <span className="font-medium">{subscriptionTier} tier</span> with {totalSearchesAllowed} searches per month.
                </span>
              )}
            </div>
            
            {subscriptionTier === "free" && (
              <Button className="w-full" asChild>
                <Link to="/pricing">
                  <Zap className="h-4 w-4 mr-2" />
                  Upgrade to Premium
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
