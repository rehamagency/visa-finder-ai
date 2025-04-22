
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SavedJob } from "@/types/job";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface SearchStatsProps {
  savedJobs: SavedJob[];
  statusDistribution: Record<string, number>;
}

export const SearchStats = ({ savedJobs, statusDistribution }: SearchStatsProps) => {
  const totalJobs = savedJobs.length;
  
  const chartData = Object.entries(statusDistribution).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = {
    "Saved": "#9333ea", // Purple
    "Applied": "#3b82f6", // Blue
    "Interview": "#10b981", // Green
    "Offer": "#f59e0b", // Amber
    "Rejected": "#ef4444" // Red
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Application Stats</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Total Saved Jobs</div>
            <div className="text-2xl font-bold">{totalJobs}</div>
            
            <div className="space-y-4 mt-4">
              {Object.entries(statusDistribution).map(([status, count]) => (
                <div key={status} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ 
                        backgroundColor: COLORS[status as keyof typeof COLORS] || "#9ca3af"
                      }}
                    />
                    <span>{status}</span>
                  </div>
                  <div className="font-medium">{count}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="h-[200px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[entry.name as keyof typeof COLORS] || "#9ca3af"} 
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value} jobs (${((value / totalJobs) * 100).toFixed(0)}%)`,
                      name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                No job data available
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
