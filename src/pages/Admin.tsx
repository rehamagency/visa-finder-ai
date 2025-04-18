
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { User, Users, Search, CheckCircle, XCircle, Activity, BarChart } from "lucide-react";

// Mock admin data (would be replaced with actual data fetching)
const ADMIN_EMAILS = ["admin@example.com"];

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  // Check if user is an admin
  const isAdmin = user && ADMIN_EMAILS.includes(user.email || "");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!isAdmin) {
      navigate("/dashboard");
    }
  }, [user, isAdmin, navigate]);

  // Fetch all users from the database
  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user && isAdmin,
  });

  // Fetch all saved searches
  const { data: searches, isLoading: loadingSearches } = useQuery({
    queryKey: ["adminSearches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_searches")
        .select("*, profiles(email)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user && isAdmin,
  });

  // Fetch all saved jobs
  const { data: jobs, isLoading: loadingJobs } = useQuery({
    queryKey: ["adminJobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_jobs")
        .select("*, profiles(email)")
        .order("date_saved", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user && isAdmin,
  });

  if (!user || !isAdmin) {
    return <div className="min-h-screen flex items-center justify-center">Unauthorized</div>;
  }

  if (loadingUsers || loadingSearches || loadingJobs) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, jobs, and searches</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users?.length || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Saved Searches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{searches?.length || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Saved Jobs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobs?.length || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Premium Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {users?.filter(u => u.subscription_tier !== "free").length || 0}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="users">
                <User className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="searches">
                <Search className="h-4 w-4 mr-2" />
                Searches
              </TabsTrigger>
              <TabsTrigger value="jobs">
                <Activity className="h-4 w-4 mr-2" />
                Jobs
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage all users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Input
                      placeholder="Search users..."
                      className="max-w-sm"
                    />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Subscription</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Searches Used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users?.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.full_name || "-"}</TableCell>
                          <TableCell>
                            <span className={user.subscription_tier !== "free" ? "text-primary font-medium" : ""}>
                              {user.subscription_tier}
                            </span>
                          </TableCell>
                          <TableCell>
                            {user.subscription_status === "active" ? (
                              <span className="flex items-center text-green-500">
                                <CheckCircle className="h-4 w-4 mr-1" /> Active
                              </span>
                            ) : (
                              <span className="flex items-center text-yellow-500">
                                <XCircle className="h-4 w-4 mr-1" /> Inactive
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>{user.searches_used} / {user.total_searches_allowed}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="searches">
              <Card>
                <CardHeader>
                  <CardTitle>Search History</CardTitle>
                  <CardDescription>View all user searches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Input
                      placeholder="Search..."
                      className="max-w-sm"
                    />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Search Name</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Visa Only</TableHead>
                        <TableHead>Remote</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searches?.map((search) => (
                        <TableRow key={search.id}>
                          <TableCell>{search.profiles?.email}</TableCell>
                          <TableCell>{search.name || "-"}</TableCell>
                          <TableCell>{search.job_title || "-"}</TableCell>
                          <TableCell>{search.location || "-"}</TableCell>
                          <TableCell>{new Date(search.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>{search.visa_only ? "Yes" : "No"}</TableCell>
                          <TableCell>{search.remote ? "Yes" : "No"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Jobs</CardTitle>
                  <CardDescription>View all saved jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Input
                      placeholder="Search jobs..."
                      className="max-w-sm"
                    />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Date Saved</TableHead>
                        <TableHead>Visa Sponsored</TableHead>
                        <TableHead>Remote</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobs?.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell>{job.profiles?.email}</TableCell>
                          <TableCell>{job.job_title}</TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell>{job.location || "-"}</TableCell>
                          <TableCell>{new Date(job.date_saved).toLocaleDateString()}</TableCell>
                          <TableCell>{job.visa_sponsored ? "Yes" : "No"}</TableCell>
                          <TableCell>{job.remote ? "Yes" : "No"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                  <CardDescription>Overview of platform usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="border border-border rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Subscription Distribution</h3>
                      <div className="h-64 flex items-center justify-center">
                        <p className="text-muted-foreground">Chart visualization will be implemented</p>
                      </div>
                    </div>
                    <div className="border border-border rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Searches Over Time</h3>
                      <div className="h-64 flex items-center justify-center">
                        <p className="text-muted-foreground">Chart visualization will be implemented</p>
                      </div>
                    </div>
                    <div className="border border-border rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Most Popular Job Titles</h3>
                      <div className="h-64 flex items-center justify-center">
                        <p className="text-muted-foreground">Chart visualization will be implemented</p>
                      </div>
                    </div>
                    <div className="border border-border rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Most Popular Locations</h3>
                      <div className="h-64 flex items-center justify-center">
                        <p className="text-muted-foreground">Chart visualization will be implemented</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
