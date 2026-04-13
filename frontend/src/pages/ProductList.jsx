import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const { products, loading, searchTerm, setSearchTerm } = useProducts();

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Search Bar: Full width on mobile, half width on desktop */}
      <div className="w-full max-w-xl mx-auto mb-8">
        <input
          type="text"
          className="w-full p-4 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Responsive Grid:
        grid-cols-1: Mobile (stacks vertically)
        sm:grid-cols-2: Tablets
        lg:grid-cols-3: Small Laptops
        xl:grid-cols-4: Large Desktops
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
