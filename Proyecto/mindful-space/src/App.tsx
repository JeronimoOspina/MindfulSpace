import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import ImmediateHelp from "@/components/ImmediateHelp";
import RequireAuth from "@/components/RequireAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Exercises from "./pages/Exercises";
import Teleconsult from "./pages/Teleconsult";
import Payment from "./pages/Payment";
import Chatbot from "./pages/Chatbot";
import Library from "./pages/Library";
import RelaxMusic from "./pages/RelaxMusic";
import MentalHealthInfo from "./pages/MentalHealthInfo";
import AnxietyAssessment from "./pages/AnxietyAssessment";
import { ArticleDetailPage } from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <ImmediateHelp />
          <Routes>
            <Route path="/" element={<RequireAuth><Index /></RequireAuth>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/exercises" element={<RequireAuth><Exercises /></RequireAuth>} />
            <Route path="/library" element={<RequireAuth><Library /></RequireAuth>} />
            <Route path="/library/:articleSlug" element={<RequireAuth><ArticleDetailPage /></RequireAuth>} />
            <Route path="/music" element={<RequireAuth><RelaxMusic /></RequireAuth>} />
            <Route path="/mental-health-info" element={<RequireAuth><MentalHealthInfo /></RequireAuth>} />
            <Route path="/self-assessment" element={<RequireAuth><AnxietyAssessment /></RequireAuth>} />
            <Route path="/teleconsult" element={<RequireAuth><Teleconsult /></RequireAuth>} />
            <Route path="/payment" element={<RequireAuth><Payment /></RequireAuth>} />
            <Route path="/chatbot" element={<RequireAuth><Chatbot /></RequireAuth>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
