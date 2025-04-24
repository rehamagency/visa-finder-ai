
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, Plus, Search } from "lucide-react";
import { useJobSearch } from "@/hooks/useJobSearch";
import { useSaveSearch } from "@/hooks/useSaveSearch";
import { toast } from "sonner";
import type { JobSearchParams } from "@/types/job";

// Define validation schema for search form
const searchFormSchema = z.object({
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  visaOnly: z.boolean().default(true),
  remote: z.boolean().default(false),
  fullTime: z.boolean().default(true),
  partTime: z.boolean().default(false),
  jobUrls: z.array(z.string().url("Must be a valid URL").or(z.string().length(0)))
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

interface SearchFormProps {
  onSearchComplete: (results: any[]) => void;
  initialValues?: Partial<SearchFormValues>;
}

export const SearchForm = ({ onSearchComplete, initialValues }: SearchFormProps) => {
  const [jobUrls, setJobUrls] = useState<string[]>(initialValues?.jobUrls || ["", ""]);
  const { search, isLoading } = useJobSearch();
  const saveSearch = useSaveSearch();
  const { toast } = useToast();

  const defaultValues: Partial<SearchFormValues> = {
    jobTitle: "",
    location: "",
    visaOnly: true,
    remote: false,
    fullTime: true,
    partTime: false,
    jobUrls: jobUrls,
    ...initialValues
  };

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
  });

  const addJobUrlField = () => {
    setJobUrls([...jobUrls, ""]);
  };

  const removeJobUrlField = (index: number) => {
    const updatedUrls = [...jobUrls];
    updatedUrls.splice(index, 1);
    setJobUrls(updatedUrls);
  };

  const handleJobUrlChange = (index: number, value: string) => {
    const updatedUrls = [...jobUrls];
    updatedUrls[index] = value;
    setJobUrls(updatedUrls);
    form.setValue("jobUrls", updatedUrls);
  };

  const onSubmit = async (data: SearchFormValues) => {
    try {
      // Filter out empty URLs
      const cleanedJobUrls = data.jobUrls.filter(url => url.trim() !== "");
      
      const searchParams: JobSearchParams = {
        jobTitle: data.jobTitle,
        location: data.location,
        visaOnly: data.visaOnly,
        remote: data.remote,
        fullTime: data.fullTime,
        partTime: data.partTime,
        jobUrls: cleanedJobUrls
      };
      
      // Perform the search
      const response = await search(searchParams);
      
      // Save the search for future reference
      await saveSearch.mutateAsync(searchParams);
      
      // Pass the results back to the parent component
      onSearchComplete(response);
      
      toast({
        title: "Search completed",
        description: `Found ${response.length} matching jobs`,
      });
    } catch (error: any) {
      toast({
        title: "Search failed",
        description: error.message || "An error occurred during the search",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Find Visa-Sponsored Jobs</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Software Engineer" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the job title you're looking for
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. United States, Remote" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a location or "Remote"
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="visaOnly"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Visa Sponsorship</FormLabel>
                      <FormDescription>
                        Only show jobs with visa sponsorship
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="remote"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Remote</FormLabel>
                      <FormDescription>
                        Only show remote jobs
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fullTime"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Full Time</FormLabel>
                      <FormDescription>
                        Include full-time positions
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="partTime"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Part Time</FormLabel>
                      <FormDescription>
                        Include part-time positions
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Job Board URLs (Optional)</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addJobUrlField}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add URL
                </Button>
              </div>
              
              <FormDescription>
                Add links to job boards or specific job listings to include in your search
              </FormDescription>
              
              {jobUrls.map((url, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder="e.g. https://linkedin.com/jobs/..."
                    value={url}
                    onChange={(e) => handleJobUrlChange(index, e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeJobUrlField(index)}
                    disabled={jobUrls.length <= 1}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <FormMessage>{form.formState.errors.jobUrls?.message}</FormMessage>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Searching..." : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search Jobs
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
