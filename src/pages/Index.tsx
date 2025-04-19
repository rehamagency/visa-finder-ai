
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Search, Compass, Database } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-50"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fadeIn">
              Find <span className="text-gradient">Visa-Sponsored</span> Jobs Worldwide
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl animate-fadeIn animation-delay-100">
              Let our AI agent search through thousands of job listings to find positions that offer visa sponsorship.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 animate-fadeIn animation-delay-200">
              <Button size="lg" asChild>
                <Link to="/search">Start Searching</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our AI-powered platform automates your job search across multiple sites, focusing on visa-sponsored positions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
                <Search className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Intelligent Search</h3>
              <p className="text-muted-foreground">
                Enter your job title, location, and preferred job boards. Our AI handles the rest.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
              <div className="rounded-full bg-secondary/10 w-12 h-12 flex items-center justify-center mb-6">
                <Compass className="text-secondary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visa Detection</h3>
              <p className="text-muted-foreground">
                Our algorithms identify job listings mentioning visa sponsorship, work permits, and relocation.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
              <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-6">
                <Database className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Organized Results</h3>
              <p className="text-muted-foreground">
                View matching jobs in a clean interface. Save favorites and export your results.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Teaser */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Flexible Pricing Plans</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Choose the plan that fits your job search needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-card rounded-xl p-6 border border-border transition-all hover:shadow-lg hover:border-primary/50 duration-300">
              <h3 className="text-xl font-semibold">Free</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>3 job searches per month</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Basic results view</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Save up to 5 jobs</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Get Started</Button>
            </div>
            
            {/* Starter Plan */}
            <div className="bg-card rounded-xl p-6 border border-primary shadow-lg relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary px-3 py-1 rounded-full text-xs font-semibold">
                Popular
              </div>
              <h3 className="text-xl font-semibold">Starter</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>20 job searches per month</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Advanced filtering options</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>CSV export</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Save unlimited jobs</span>
                </li>
              </ul>
              <Button className="w-full">Subscribe</Button>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-card rounded-xl p-6 border border-border transition-all hover:shadow-lg hover:border-primary/50 duration-300">
              <h3 className="text-xl font-semibold">Pro</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Unlimited job searches</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Job alerts for new listings</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>Priority processing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>All Starter features</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Subscribe</Button>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/pricing" className="text-primary hover:underline">
              View full pricing details →
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Find Your Next Career Move?</h2>
            <p className="text-muted-foreground text-lg">
              Start searching for visa-sponsored jobs today and take the first step towards your global career.
            </p>
            <Button size="lg" asChild className="mt-6">
              <Link to="/search">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
