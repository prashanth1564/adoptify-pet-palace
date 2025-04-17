import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { AuthProvider } from "@/context/AuthContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Toaster />
          <SonnerToaster />
          <BrowserRouter>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
