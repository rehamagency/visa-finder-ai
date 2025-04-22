import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search as SearchIcon, Plus, Trash2, Building, MapPin, ExternalLink } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useSaveSearch } from "@/hooks/useSaveSearch";
import { useSaveJob } from "@/hooks/useSaveJob";
import { useJobSearch } from "@/hooks/useJobSearch";
import { toast } from "sonner";
import { ExportButton } from "@/components/dashboard/ExportButton";

const Search = () => {
  const { user } = useAuth();
  const saveSearch = useSaveSearch();
  const saveJob = useSaveJob();
  const { search, results, isLoading } = useJobSearch();

  const [jobUrls, setJobUrls] = useState<string[]>([""]);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [visaOnly, setVisaOnly] = useState(true);
  const [remote, setRemote] = useState(false);
  const [fullTime, setFullTime] = useState(true);
  const [partTime, setPartTime] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");

  const addJobUrl = () => {
    setJobUrls([...jobUrls, ""]);
  };

  const removeJobUrl = (index: number) => {
    const updatedUrls = jobUrls.filter((_, i) => i !== index);
    setJobUrls(updatedUrls.length > 0 ? updatedUrls : [""]);
  };

  const updateJobUrl = (index: number, value: string) => {
    const updatedUrls = [...jobUrls];
    updatedUrls[index] = value;
    setJobUrls(updatedUrls);
  };

  const handleSearch = () => {
    if (!jobTitle && !location && jobUrls.every(url => !url)) {
      toast.error("Please enter at least a job title, location, or job URL");
      return;
    }

    // Execute the job search
    search({
      jobTitle,
      location,
      visaOnly,
      remote,
      fullTime,
      partTime,
      jobUrls: jobUrls.filter(url => url.trim() !== "")
    });
  };

  const handleSaveJob = (job: typeof results[0]) => {
    if (!user) {
      toast.error("Please log in to save jobs");
      return;
    }

    saveJob.mutate({
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      jobType: job.jobType,
      visaSponsored: job.visaSponsored,
      remote: job.remote,
      url: job.url,
      postedDate: job.postedDate
    });
  };

  const sortedResults = [...results].sort((a, b) => {
    switch (sortOrder) {
      case "newest":
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      case "oldest":
        return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime();
      case "relevant":
        // Simple relevance based on title match (could be improved)
        const aMatches = a.title.toLowerCase().includes(jobTitle.toLowerCase()) ? 1 : 0;
        const bMatches = b.title.toLowerCase().includes(jobTitle.toLowerCase()) ? 1 : 0;
        return bMatches - aMatches;
      default:
        return 0;
    }
  });

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Find Visa-Sponsored Jobs</h1>
        
        {/* Search Form */}
        <div className="bg-card rounded-xl shadow-lg p-6 mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="e.g., Software Engineer, Data Scientist"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Berlin, Canada, Europe"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Job Sites URLs</Label>
              <div className="space-y-2">
                {jobUrls.map((url, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Paste LinkedIn, Indeed, or other job board URL"
                      value={url}
                      onChange={(e) => updateJobUrl(index, e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeJobUrl(index)}
                      disabled={jobUrls.length === 1 && index === 0}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addJobUrl}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another URL
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Job Type</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="fullTime" 
                      checked={fullTime} 
                      onCheckedChange={(checked) => {
                        setFullTime(checked as boolean);
                      }}
                    />
                    <label
                      htmlFor="fullTime"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Full-time
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="partTime" 
                      checked={partTime} 
                      onCheckedChange={(checked) => {
                        setPartTime(checked as boolean);
                      }}
                    />
                    <label
                      htmlFor="partTime"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Part-time
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="visaOnly"
                    checked={visaOnly}
                    onCheckedChange={setVisaOnly}
                  />
                  <Label htmlFor="visaOnly">Visa Sponsored Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="remote"
                    checked={remote}
                    onCheckedChange={setRemote}
                  />
                  <Label htmlFor="remote">Remote Jobs</Label>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? (
                <>Searching...</>
              ) : (
                <>
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Search Jobs
                </>
              )}
            </Button>

            {!user && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                <a href="/auth" className="text-primary hover:underline">Sign in</a> to save your searches and get job alerts
              </p>
            )}
          </div>
        </div>
        
        {/* Search Results */}
        {results.length > 0 && (
          <div className="bg-card rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Search Results ({results.length})
              </h2>
              <ExportButton 
                jobs={results} 
                type="search" 
                variant="outline" 
                size="sm"
              />
            </div>
            
            <Tabs defaultValue="cards">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="cards">Cards</TabsTrigger>
                  <TabsTrigger value="table">Table</TabsTrigger>
                </TabsList>
                
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="relevant">Most relevant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <TabsContent value="cards" className="space-y-4">
                {sortedResults.map((job) => (
                  <div key={job.id} className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <Building className="h-4 w-4 mr-1" />
                          <span className="mr-4">{job.company}</span>
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {job.jobType}
                        </div>
                        {job.remote && (
                          <div className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full">
                            Remote
                          </div>
                        )}
                        {job.visaSponsored && (
                          <div className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">
                            Visa Sponsored
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="mt-3 text-muted-foreground text-sm line-clamp-2">
                      {job.description}
                    </p>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-muted-foreground">
                        Posted: {new Date(job.postedDate).toLocaleDateString()}
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSaveJob(job)}
                        >
                          Save
                        </Button>
                        <Button size="sm" asChild>
                          <a href={job.url} target="_blank" rel="noreferrer">
                            Apply
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="table">
                <div className="overflow-x-auto rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Job Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Company
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Posted
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {sortedResults.map((job) => (
                        <tr key={job.id} className="hover:bg-muted/20 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{job.title}</div>
                            <div className="flex space-x-1 mt-1">
                              {job.remote && (
                                <div className="bg-secondary/10 text-secondary text-[10px] px-1.5 py-0.5 rounded-full">
                                  Remote
                                </div>
                              )}
                              {job.visaSponsored && (
                                <div className="bg-accent/10 text-accent text-[10px] px-1.5 py-0.5 rounded-full">
                                  Visa
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {job.company}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {job.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {job.jobType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(job.postedDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleSaveJob(job)}
                              >
                                Save
                              </Button>
                              <Button size="sm" asChild>
                                <a href={job.url} target="_blank" rel="noreferrer">
                                  Apply
                                </a>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
