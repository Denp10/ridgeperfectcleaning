import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";

import { Home } from "./pages/Home";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";

const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-white z-[9999]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3AB5E5]"></div>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </ErrorBoundary>
);

export default App;
