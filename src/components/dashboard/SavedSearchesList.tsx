
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import type { SavedSearch } from "@/hooks/useDashboardData";

interface SavedSearchesListProps {
  searches: SavedSearch[];
  isCompact?: boolean;
}

export const SavedSearchesList = ({ searches, isCompact = false }: SavedSearchesListProps) => {
  const displaySearches = isCompact ? searches.slice(0, 3) : searches;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Searches</CardTitle>
        <CardDescription>
          Your most recent job searches
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displaySearches.map((search) => (
            <div 
              key={search.id} 
              className="flex justify-between items-center p-3 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div>
                <h3 className="font-medium">{search.name || search.job_title}</h3>
                <p className="text-sm text-muted-foreground">
                  {search.results} results • {new Date(search.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Alert
                </Button>
                <Button size="sm" asChild>
                  <a href={`/search?id=${search.id}`}>View Results</a>
                </Button>
              </div>
            </div>
          ))}
          {isCompact && searches.length > 3 && (
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="/searches">View All Searches</a>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
