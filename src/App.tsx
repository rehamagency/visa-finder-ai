
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./components/AuthProvider";
import Layout from "./components/Layout";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/dashboard" element={<Layout requireAuth><Dashboard /></Layout>} />
          <Route path="/search" element={<Layout><Search /></Layout>} />
          <Route path="/auth" element={<Layout><Auth /></Layout>} />
          <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
          <Route path="/admin" element={<Layout requireAuth><Admin /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
