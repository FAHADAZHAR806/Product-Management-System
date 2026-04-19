import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  // 1. Context se zaroori cheezein nikalein
  const {
    products,
    loading,
    searchTerm,
    setSearchTerm,
    pages, // Backend se total pages info
    fetchProducts, // Backend se specific page mangne wala function
  } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);

  // 2. Jab bhi page change ho, backend se naya data mangwao
  useEffect(() => {
    fetchProducts(currentPage);
    // Scroll to top jab page badle
    window.scrollTo(0, 0);
  }, [currentPage, fetchProducts]);

  // 3. Search handle karte waqt page 1 par reset karein
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="w-full max-w-xl mx-auto mb-8 relative">
        <input
          type="text"
          className="w-full p-4 pl-12 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      {/* Grid Display */}
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p._id || p.id} product={p} />
            ))}
          </div>

          {/* ── PAGINATION UI ── */}
          {pages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12 pb-10">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-6 py-2 rounded-xl font-bold bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-md">
                  {currentPage}
                </span>
                <span className="text-gray-400 font-medium">of {pages}</span>
              </div>

              <button
                disabled={currentPage === pages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-6 py-2 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg disabled:opacity-50 transition-all"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-lg">No products found.</p>
        </div>
      )}
    </div>
  );
}
