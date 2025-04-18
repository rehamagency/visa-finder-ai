
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, HelpCircle } from "lucide-react";

const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  // Features for each plan
  const features = {
    free: [
      "3 job searches per month",
      "Basic job results",
      "Save up to 5 jobs",
      "Standard support",
    ],
    starter: [
      "20 job searches per month",
      "Advanced filtering options",
      "CSV export",
      "Save unlimited jobs",
      "Priority support",
    ],
    pro: [
      "Unlimited job searches",
      "Job alerts for new listings",
      "Priority processing",
      "All Starter features",
      "Dedicated account manager",
      "API access",
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your job search needs. All plans include our core visa sponsorship detection technology.
            </p>

            <div className="mt-8">
              <Tabs
                defaultValue="monthly"
                className="inline-flex"
                onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")}
              >
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="annual">
                    Annual
                    <span className="ml-1.5 rounded-full bg-secondary/20 px-2 py-0.5 text-xs text-secondary">
                      Save 20%
                    </span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card className="border-border transition-all hover:shadow-lg hover:border-primary/20">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>For occasional job seekers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {features.free.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Sign Up Free</Button>
              </CardFooter>
            </Card>

            {/* Starter Plan */}
            <Card className="border-primary relative shadow-lg md:scale-105 z-10">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary px-3 py-1 rounded-full text-xs font-semibold">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>For active job seekers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${billingCycle === "annual" ? "7" : "9"}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                  {billingCycle === "annual" && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Billed as ${7 * 12} annually
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {features.starter.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Subscribe Now</Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="border-border transition-all hover:shadow-lg hover:border-primary/20">
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For power users and companies</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${billingCycle === "annual" ? "23" : "29"}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                  {billingCycle === "annual" && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Billed as ${23 * 12} annually
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {features.pro.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-primary mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Subscribe Now</Button>
              </CardFooter>
            </Card>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto mt-24">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How does Reham Job AI Agent find visa-sponsored jobs?</h3>
                <p className="text-muted-foreground">
                  Our AI technology scans job listings across multiple platforms, looking for keywords and phrases that indicate visa sponsorship availability. This includes terms like "visa sponsorship," "work permit," "relocation assistance," and more.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to your plan until the end of the current billing period.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Is there a limit to how many jobs I can save?</h3>
                <p className="text-muted-foreground">
                  Free users can save up to 5 jobs, while Starter and Pro subscribers can save unlimited jobs to their dashboard.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">
                  We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact us within 7 days of your purchase for a full refund.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto mt-20 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our team is here to help you find the right plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" asChild>
                <a href="/contact">Contact Sales</a>
              </Button>
              <Button asChild>
                <a href="/search">Try For Free</a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPlans;
