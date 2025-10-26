


import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PremiumProvider } from "./context/premiumContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RideBooking from "../client2/src/pages/Index"; // Adjust path to Project B's Index
import RideBookingDriver from "../client2/src/pages/RideBookingDriver"; 

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PremiumProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Add this new route for Project B integration */}
              <Route path="/ride-booking" element={<RideBooking />} />
               <Route path="/ride-booking-driver" element={<RideBookingDriver />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PremiumProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;





