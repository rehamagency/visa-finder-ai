
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Clock, 
  Search, 
  Bookmark, 
  Settings, 
  Bell, 
  Download,
  User,
  CreditCard,
  FileText,
  Briefcase,
  Building,
  MapPin,
  CalendarDays,
  ExternalLink,
  AlertCircle
} from "lucide-react";

// Mock saved searches data
const savedSearches = [
  {
    id: 1,
    title: "Software Engineer in Europe",
    results: 28,
    date: "2025-04-01",
    params: {
      jobTitle: "Software Engineer",
      location: "Europe",
      visaOnly: true,
      remote: true,
    },
  },
  {
    id: 2,
    title: "Data Scientist in Canada",
    results: 15,
    date: "2025-04-05",
    params: {
      jobTitle: "Data Scientist",
      location: "Canada",
      visaOnly: true,
      remote: false,
    },
  },
  {
    id: 3,
    title: "Frontend Developer in Australia",
    results: 12,
    date: "2025-04-10",
    params: {
      jobTitle: "Frontend Developer",
      location: "Australia",
      visaOnly: true,
      remote: true,
    },
  },
];

// Mock saved jobs data
const savedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechGlobal Inc.",
    location: "Berlin, Germany",
    date: "2025-03-28",
    status: "Applied",
    url: "#",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSync Ltd",
    location: "Amsterdam, Netherlands",
    date: "2025-04-05",
    status: "Saved",
    url: "#",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "InnovateTech",
    location: "Stockholm, Sweden",
    date: "2025-04-10",
    status: "Interview",
    url: "#",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudNet Systems",
    location: "Toronto, Canada",
    date: "2025-04-08",
    status: "Saved",
    url: "#",
  },
];

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState("overview");

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    joinDate: "March 15, 2025",
    subscription: {
      plan: "Starter",
      status: "Active",
      nextBilling: "May 15, 2025",
      searches: {
        used: 8,
        total: 20,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Sidebar */}
            <div className="md:w-64 mb-8 md:mb-0">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs
                    value={currentTab}
                    onValueChange={setCurrentTab}
                    orientation="vertical"
                    className="w-full"
                  >
                    <TabsList className="flex flex-col items-start h-auto bg-transparent space-y-1 w-full p-0">
                      <TabsTrigger
                        value="overview"
                        className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                      >
                        <Clock size={16} className="mr-2" />
                        Overview
                      </TabsTrigger>
                      <TabsTrigger
                        value="searches"
                        className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                      >
                        <Search size={16} className="mr-2" />
                        Saved Searches
                      </TabsTrigger>
                      <TabsTrigger
                        value="jobs"
                        className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                      >
                        <Bookmark size={16} className="mr-2" />
                        Saved Jobs
                      </TabsTrigger>
                      <TabsTrigger
                        value="alerts"
                        className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                      >
                        <Bell size={16} className="mr-2" />
                        Job Alerts
                      </TabsTrigger>
                      <TabsTrigger
                        value="account"
                        className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                      >
                        <User size={16} className="mr-2" />
                        Account
                      </TabsTrigger>
                      <TabsTrigger
                        value="subscription"
                        className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                      >
                        <CreditCard size={16} className="mr-2" />
                        Subscription
                      </TabsTrigger>
                      <TabsTrigger
                        value="settings"
                        className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
                      >
                        <Settings size={16} className="mr-2" />
                        Settings
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 mt-0">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Welcome back, {user.name}</h1>
                    <Button asChild>
                      <a href="/search">New Search</a>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Subscription</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{user.subscription.plan}</div>
                        <p className="text-xs text-muted-foreground mt-1">Next billing: {user.subscription.nextBilling}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Searches Used</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{user.subscription.searches.used}/{user.subscription.searches.total}</div>
                        <div className="w-full h-2 bg-muted rounded-full mt-2">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${(user.subscription.searches.used / user.subscription.searches.total) * 100}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Saved Jobs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{savedJobs.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {savedJobs.filter(job => job.status === "Applied").length} applied
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Saved Searches</CardTitle>
                      <CardDescription>
                        Your most recent job searches
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {savedSearches.slice(0, 3).map((search) => (
                          <div 
                            key={search.id} 
                            className="flex justify-between items-center p-3 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            <div>
                              <h3 className="font-medium">{search.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {search.results} results • {new Date(search.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Button variant="ghost" asChild>
                              <a href={`/search?id=${search.id}`}>View</a>
                            </Button>
                          </div>
                        ))}
                        <div className="pt-2">
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a href="/searches">View All Searches</a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Saved Jobs</CardTitle>
                      <CardDescription>
                        Jobs you've recently saved
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {savedJobs.slice(0, 3).map((job) => (
                          <div 
                            key={job.id} 
                            className="flex justify-between items-center p-3 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            <div>
                              <h3 className="font-medium">{job.title}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Building className="h-3 w-3 mr-1" />
                                <span className="mr-2">{job.company}</span>
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{job.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span 
                                className={`text-xs px-2 py-0.5 rounded-full mr-2
                                  ${job.status === "Applied" ? "bg-primary/10 text-primary" : 
                                    job.status === "Interview" ? "bg-accent/10 text-accent" : 
                                    "bg-muted text-muted-foreground"}`}
                              >
                                {job.status}
                              </span>
                              <Button variant="ghost" size="sm" asChild>
                                <a href={job.url} target="_blank" rel="noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="pt-2">
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <a href="/jobs">View All Jobs</a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Saved Searches Tab */}
                <TabsContent value="searches" className="space-y-6 mt-0">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Saved Searches</h1>
                    <Button asChild>
                      <a href="/search">New Search</a>
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y divide-border">
                        {savedSearches.map((search) => (
                          <div 
                            key={search.id} 
                            className="p-4 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-lg">{search.title}</h3>
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
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Saved Jobs Tab */}
                <TabsContent value="jobs" className="space-y-6 mt-0">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Saved Jobs</h1>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export to CSV
                    </Button>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left px-4 py-3 text-sm font-medium">Job Title</th>
                              <th className="text-left px-4 py-3 text-sm font-medium">Company</th>
                              <th className="text-left px-4 py-3 text-sm font-medium">Location</th>
                              <th className="text-left px-4 py-3 text-sm font-medium">Added Date</th>
                              <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
                              <th className="text-right px-4 py-3 text-sm font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {savedJobs.map((job) => (
                              <tr key={job.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                                <td className="px-4 py-3">
                                  <div className="font-medium">{job.title}</div>
                                </td>
                                <td className="px-4 py-3">{job.company}</td>
                                <td className="px-4 py-3">{job.location}</td>
                                <td className="px-4 py-3">{new Date(job.date).toLocaleDateString()}</td>
                                <td className="px-4 py-3">
                                  <span 
                                    className={`text-xs px-2 py-0.5 rounded-full
                                      ${job.status === "Applied" ? "bg-primary/10 text-primary" : 
                                        job.status === "Interview" ? "bg-accent/10 text-accent" : 
                                        "bg-muted text-muted-foreground"}`}
                                  >
                                    {job.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="ghost" size="sm">
                                      <FileText className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" asChild>
                                      <a href={job.url} target="_blank" rel="noreferrer">
                                        <ExternalLink className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Job Alerts Tab */}
                <TabsContent value="alerts" className="space-y-6 mt-0">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Job Alerts</h1>
                    <Button asChild>
                      <a href="/search">New Alert</a>
                    </Button>
                  </div>

                  <Card className="flex flex-col items-center justify-center p-12 text-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Job Alerts Yet</h3>
                    <p className="text-muted-foreground max-w-md mb-6">
                      Job alerts notify you when new positions matching your criteria become available. Create an alert to stay updated.
                    </p>
                    <Button asChild>
                      <a href="/search">Create Your First Alert</a>
                    </Button>
                  </Card>
                </TabsContent>

                {/* Account Tab */}
                <TabsContent value="account" className="space-y-6 mt-0">
                  <h1 className="text-2xl font-bold">Account Settings</h1>

                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your account details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium block mb-1">
                              Full Name
                            </label>
                            <input 
                              type="text" 
                              value={user.name}
                              className="w-full bg-muted p-2 rounded-md"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium block mb-1">
                              Email Address
                            </label>
                            <input 
                              type="email" 
                              value={user.email}
                              className="w-full bg-muted p-2 rounded-md"
                              readOnly
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">
                            Member Since
                          </label>
                          <input 
                            type="text" 
                            value={user.joinDate}
                            className="w-full bg-muted p-2 rounded-md"
                            readOnly
                          />
                        </div>
                        <Button className="mt-4">
                          Edit Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Update your password
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline">
                        Change Password
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Email Preferences</CardTitle>
                      <CardDescription>
                        Manage your email notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Job Alert Emails</p>
                            <p className="text-sm text-muted-foreground">
                              Receive emails for new job matches
                            </p>
                          </div>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Newsletter</p>
                            <p className="text-sm text-muted-foreground">
                              Receive our weekly newsletter with tips
                            </p>
                          </div>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Product Updates</p>
                            <p className="text-sm text-muted-foreground">
                              Get notified about new features
                            </p>
                          </div>
                          <input type="checkbox" className="toggle" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Subscription Tab */}
                <TabsContent value="subscription" className="space-y-6 mt-0">
                  <h1 className="text-2xl font-bold">Subscription</h1>

                  <Card>
                    <CardHeader>
                      <CardTitle>Current Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/40 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-bold text-xl">{user.subscription.plan}</h3>
                            <p className="text-sm text-muted-foreground">
                              {user.subscription.status} • Renews on {user.subscription.nextBilling}
                            </p>
                          </div>
                          <Button variant="outline">
                            Manage Plan
                          </Button>
                        </div>

                        <div className="mt-6 pt-6 border-t border-border">
                          <h4 className="font-semibold mb-2">Plan Usage</h4>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Job Searches</span>
                            <span className="text-sm font-medium">
                              {user.subscription.searches.used}/{user.subscription.searches.total}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${(user.subscription.searches.used / user.subscription.searches.total) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Resets on {user.subscription.nextBilling}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Plan Options</CardTitle>
                      <CardDescription>
                        Upgrade or downgrade your plan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                          <div>
                            <h3 className="font-semibold">Free</h3>
                            <p className="text-sm text-muted-foreground">3 searches per month</p>
                          </div>
                          <Button variant="outline" disabled>Current Plan</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-primary rounded-lg shadow-md cursor-pointer">
                          <div>
                            <h3 className="font-semibold">Starter <span className="text-primary text-xs ml-1">Popular</span></h3>
                            <p className="text-sm text-muted-foreground">20 searches per month</p>
                          </div>
                          <Button>Upgrade - $9/mo</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                          <div>
                            <h3 className="font-semibold">Pro</h3>
                            <p className="text-sm text-muted-foreground">Unlimited searches</p>
                          </div>
                          <Button variant="outline">Upgrade - $29/mo</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                      <CardDescription>
                        Manage your payment information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Update Payment Method
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6 mt-0">
                  <h1 className="text-2xl font-bold">Settings</h1>

                  <Card>
                    <CardHeader>
                      <CardTitle>Appearance</CardTitle>
                      <CardDescription>
                        Customize your experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Theme</p>
                            <p className="text-sm text-muted-foreground">
                              Choose your preferred theme
                            </p>
                          </div>
                          <select className="p-2 bg-muted rounded-md">
                            <option>Dark</option>
                            <option>Light</option>
                            <option>System</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Data & Privacy</CardTitle>
                      <CardDescription>
                        Manage your data
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline">
                        Download My Data
                      </Button>
                      <Button variant="destructive">
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
