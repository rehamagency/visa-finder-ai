
import { SavedSearch } from "@/hooks/useDashboardData";

interface SearchStatsProps {
  search: SavedSearch;
}

export const SearchStats = ({ search }: SearchStatsProps) => {
  return (
    <div>
      <h3 className="font-medium text-lg">{search.name}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        {search.results} results • Saved on {new Date(search.date).toLocaleDateString()}
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="text-xs bg-muted px-2 py-1 rounded-full">
          {search.params.jobTitle}
        </span>
        <span className="text-xs bg-muted px-2 py-1 rounded-full">
          {search.params.location}
        </span>
        {search.params.visaOnly && (
          <span className="text-xs bg-muted px-2 py-1 rounded-full">
            Visa sponsored
          </span>
        )}
        {search.params.remote && (
          <span className="text-xs bg-muted px-2 py-1 rounded-full">
            Remote
          </span>
        )}
      </div>
    </div>
  );
};
