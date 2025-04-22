
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Globe, 
  Sparkles, 
  FileText, 
  Briefcase, 
  ChevronRight,
  CheckCircle
} from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-10 text-center">
            <div className="space-y-6 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Find Visa-Sponsored Jobs Globally with <span className="text-gradient">JobAgent AI</span>
              </h1>
              <p className="text-muted-foreground text-xl max-w-[600px] mx-auto">
                Automate your job search across multiple platforms to discover visa-sponsored positions that match your skills.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/search">
                    Start Searching <Search className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
            
            <div className="w-full max-w-4xl p-4 bg-muted/30 rounded-xl border border-border shadow-sm">
              <img 
                src="/placeholder.svg" 
                alt="JobAgent AI Dashboard" 
                className="w-full rounded-md shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How JobAgent AI Works
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-[800px] mx-auto">
              Our intelligent system automates your job search across multiple platforms
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Automated Search</h3>
              <p className="text-muted-foreground">
                Scan thousands of job listings across LinkedIn, Indeed, and other platforms in minutes.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Visa Sponsorship Focus</h3>
              <p className="text-muted-foreground">
                Filter for companies willing to sponsor visas, saving you time from applying to ineligible positions.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Matching</h3>
              <p className="text-muted-foreground">
                Our intelligent algorithms match your profile with jobs most likely to result in interviews.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Find Your Dream Job Abroad
              </h2>
              <p className="text-muted-foreground text-lg">
                Let our AI handle the tedious task of searching through thousands of job listings to find positions that match your skills and offer visa sponsorship.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                  <span>Enter your job preferences and skills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                  <span>Specify target countries and visa requirements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                  <span>Receive a curated list of visa-sponsored positions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                  <span>Apply directly with one click</span>
                </li>
              </ul>
              <Button asChild>
                <Link to="/search">
                  Start Searching <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-background rounded-xl border border-border p-4 shadow-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="JobAgent AI Search Interface" 
                  className="w-full rounded-md" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Success Stories
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-[800px] mx-auto">
              Users who found their dream jobs abroad using JobAgent AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Alex Johnson</h4>
                  <p className="text-sm text-muted-foreground">Software Engineer, Germany</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I spent months applying for jobs with no success until I found JobAgent AI. Within 2 weeks, I had 3 interviews and a job offer with visa sponsorship!"
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Maria Garcia</h4>
                  <p className="text-sm text-muted-foreground">Data Scientist, Canada</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The visa filter saved me countless hours of applying to companies that don't sponsor. I found my position in Toronto thanks to JobAgent AI."
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Raj Patel</h4>
                  <p className="text-sm text-muted-foreground">UX Designer, Australia</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "JobAgent AI found me a position that wasn't even advertised on the major job boards. Their technology is truly impressive."
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link to="/auth?tab=register">
                Sign Up and Find Your Dream Job <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container px-4 md:px-6 max-w-3xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Find Visa-Sponsored Jobs?
            </h2>
            <p className="text-muted-foreground text-lg">
              Start your global job search today with JobAgent AI and discover opportunities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/search">
                  Start Free Search
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">
                  View Premium Plans <FileText className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
