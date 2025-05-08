
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";
import Index from "./pages/Index";
import Pets from "./pages/Pets";
import PetDetails from "./pages/PetDetails";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AdoptionForm from "./pages/AdoptionForm";
import ListPet from "./pages/ListPet";
import MyPets from "./pages/MyPets";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Documentation from "./pages/Documentation";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <FavoritesProvider>
            <TooltipProvider>
              <Toaster />
              <SonnerToaster />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/pets" element={<Pets />} />
                <Route path="/pets/:id" element={<PetDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/adopt/:id" element={<AdoptionForm />} />
                <Route path="/list-pet" element={<ProtectedRoute><ListPet /></ProtectedRoute>} />
                <Route path="/my-pets" element={<ProtectedRoute><MyPets /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </FavoritesProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
