
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search as SearchIcon, Plus, Trash2, Download, Briefcase, Building, MapPin, Globe, ExternalLink } from "lucide-react";

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechGlobal Inc.",
    location: "Berlin, Germany",
    remote: true,
    jobType: "Full-time",
    visaSponsored: true,
    postedDate: "2025-03-28",
    url: "#",
    description: "We're looking for an experienced Frontend Developer to join our team. We offer visa sponsorship for the right candidate."
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSync Ltd",
    location: "Amsterdam, Netherlands",
    remote: false,
    jobType: "Full-time",
    visaSponsored: true,
    postedDate: "2025-04-05",
    url: "#",
    description: "Join our backend team to work on scalable systems. Visa sponsorship available for qualified candidates."
  },
  {
    id: 3,
    title: "Product Manager",
    company: "InnovateTech",
    location: "Stockholm, Sweden",
    remote: true,
    jobType: "Full-time",
    visaSponsored: true,
    postedDate: "2025-04-10",
    url: "#",
    description: "Lead product development in our fast-growing startup. We provide work permit assistance for international candidates."
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudNet Systems",
    location: "Toronto, Canada",
    remote: false,
    jobType: "Full-time",
    visaSponsored: true,
    postedDate: "2025-04-08",
    url: "#",
    description: "Join our DevOps team. Eligible for Canadian work visa sponsorship."
  },
  {
    id: 5,
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Sydney, Australia",
    remote: true,
    jobType: "Contract",
    visaSponsored: true,
    postedDate: "2025-04-02",
    url: "#",
    description: "Looking for creative designers. Sponsorship for Australian work visa possible."
  }
];

const Search = () => {
  const [jobUrls, setJobUrls] = useState<string[]>([""]);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [visaOnly, setVisaOnly] = useState(true);
  const [remote, setRemote] = useState(false);
  const [fullTime, setFullTime] = useState(true);
  const [partTime, setPartTime] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof mockJobs | null>(null);
  const [isSearching, setIsSearching] = useState(false);

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
    setIsSearching(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setSearchResults(mockJobs);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container">
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
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>Searching...</>
                  ) : (
                    <>
                      <SearchIcon className="h-4 w-4 mr-2" />
                      Search Jobs
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Search Results */}
            {searchResults && (
              <div className="bg-card rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    Search Results ({searchResults.length})
                  </h2>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
                
                <Tabs defaultValue="cards">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="cards">Cards</TabsTrigger>
                      <TabsTrigger value="table">Table</TabsTrigger>
                    </TabsList>
                    
                    <Select defaultValue="newest">
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
                    {searchResults.map((job) => (
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
                            <Button variant="outline" size="sm">Save</Button>
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
                          {searchResults.map((job) => (
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
                                  <Button variant="ghost" size="sm">Save</Button>
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
