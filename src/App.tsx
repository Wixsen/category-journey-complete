
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import JoinAsSeller from "./pages/JoinAsSeller";
import JoinAsDelivery from "./pages/JoinAsDelivery";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./components/ThemeProvider";
import ChatWithAI from "./components/ChatWithAI";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/product/:categoryId/:productId" element={<ProductPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/join-as-seller" element={<JoinAsSeller />} />
              <Route path="/join-as-delivery" element={<JoinAsDelivery />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatWithAI standalone={true} />
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
