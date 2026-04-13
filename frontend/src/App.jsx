import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

export default function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        {/* min-h-screen ensures the background covers the whole page */}
        <div className="flex flex-col min-h-screen">
          <Navbar />

          {/* container: Sets a max-width based on screen size
            mx-auto: Centers the content
            px-4: Adds "gutters" on mobile so text doesn't touch the screen edge
          */}
          <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/edit/:id" element={<EditProduct />} />
            </Routes>
          </main>
        </div>
      </ProductProvider>
    </BrowserRouter>
  );
}
