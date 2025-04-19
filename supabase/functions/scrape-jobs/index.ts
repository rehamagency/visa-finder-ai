
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.23.0";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get request JSON data
    const { jobTitle, location, jobUrls, visaOnly, remote } = await req.json();

    // Authenticate the user from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    // Get user from auth
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if user has enough searches left
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('searches_used, total_searches_allowed, subscription_status')
      .eq('id', user.id)
      .single();

    if (profileError) {
      return new Response(
        JSON.stringify({ error: "Failed to get user profile" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (profile.subscription_status !== 'active') {
      return new Response(
        JSON.stringify({ error: "Subscription is not active" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (profile.searches_used >= profile.total_searches_allowed) {
      return new Response(
        JSON.stringify({ error: "Search limit reached. Please upgrade your plan." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // In a real implementation, we would use Playwright here to scrape the job boards
    // For this example, we'll simulate the scraping with mock data
    
    // Mock scraped jobs
    const mockedJobs = [
      {
        job_title: "Senior Software Engineer",
        company: "GlobalTech Solutions",
        location: location || "Remote",
        description: "We're looking for a senior software engineer with experience in cloud technologies. Visa sponsorship available.",
        job_type: "Full-time",
        visa_sponsored: true,
        remote: remote || false,
        url: "https://example.com/job1",
        date_posted: new Date().toISOString(),
        status: "Saved"
      },
      {
        job_title: "Backend Developer",
        company: "InnovateX",
        location: location || "Berlin, Germany",
        description: "Join our backend team to build scalable APIs. Work permit sponsorship for qualified candidates.",
        job_type: "Full-time",
        visa_sponsored: true,
        remote: remote || false,
        url: "https://example.com/job2",
        date_posted: new Date().toISOString(),
        status: "Saved"
      },
      {
        job_title: jobTitle || "Full Stack Developer",
        company: "TechVision Inc",
        location: location || "Toronto, Canada",
        description: "Full stack developer position with visa sponsorship for the right candidate.",
        job_type: "Full-time",
        visa_sponsored: true,
        remote: remote || true,
        url: "https://example.com/job3",
        date_posted: new Date().toISOString(),
        status: "Saved"
      }
    ];

    // Create a saved search record
    const { data: savedSearch, error: searchError } = await supabaseClient
      .from('saved_searches')
      .insert({
        user_id: user.id,
        job_title: jobTitle,
        location: location,
        visa_only: visaOnly,
        remote: remote,
        job_urls: jobUrls,
        name: `${jobTitle || 'Jobs'} in ${location || 'Anywhere'}`,
        created_at: new Date().toISOString(),
        last_run: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (searchError) {
      return new Response(
        JSON.stringify({ error: "Failed to save search" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert job results
    const jobResults = mockedJobs.map(job => ({
      ...job,
      user_id: user.id,
      search_id: savedSearch.id,
      date_found: new Date().toISOString()
    }));

    const { error: insertError } = await supabaseClient
      .from('search_results')
      .insert(jobResults);

    if (insertError) {
      return new Response(
        JSON.stringify({ error: "Failed to save job results" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Increment the number of searches used
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({ searches_used: profile.searches_used + 1 })
      .eq('id', user.id);

    if (updateError) {
      console.error("Failed to update searches_used", updateError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Job search completed",
        results: jobResults,
        search_id: savedSearch.id
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
