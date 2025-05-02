
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import SignupStep1 from "./pages/SignupStep1";
import SignupStep2 from "./pages/SignupStep2";
import Dashboard from "./pages/Dashboard";
import Withdraw from "./pages/Withdraw";
import ActivationCode from "./pages/ActivationCode";
import FundWallet from "./pages/FundWallet";
import BankTransferPayment from "./pages/BankTransferPayment";
import FlutterwavePayment from "./pages/FlutterwavePayment";
import FlutterwaveConfirmation from "./pages/FlutterwaveConfirmation";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/index" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup/step1" element={<SignupStep1 />} />
            <Route path="/signup/step2" element={<SignupStep2 />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/withdraw/activation" element={<ActivationCode />} />
            <Route path="/fund-wallet" element={<FundWallet />} />
            <Route path="/fund-wallet/bank-transfer" element={<BankTransferPayment />} />
            <Route path="/fund-wallet/flutterwave" element={<FlutterwavePayment />} />
            <Route path="/flutterwave-confirmation" element={<FlutterwaveConfirmation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
