import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

export default function ProductCard({ product }) {
  const { deleteProduct } = useProducts();

  // Safety check: if product is undefined for some reason, don't crash
  if (!product) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
      {/* 1. Fixed aspect ratio for images */}
      <div className="aspect-square w-full bg-gray-50 p-4">
        <img
          src={
            product.thumbnail || "https://via.placeholder.com/150?text=No+Image"
          }
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <h3
            className="font-bold text-gray-900 truncate flex-1"
            title={product.title}
          >
            {product.title}
          </h3>
          <p className="text-blue-600 font-bold ml-2">${product.price}</p>
        </div>

        <p className="text-gray-500 text-xs mt-1 line-clamp-1 italic">
          {product.category || "General"}
        </p>

        {/* Action Buttons */}
        <div className="mt-auto pt-4 space-y-2">
          {/* 2. View Details Link - MUST use product._id */}
          <Link
            to={`/product/${product._id}`}
            className="block text-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white py-2 rounded-lg font-medium transition-all"
          >
            View Details
          </Link>

          <div className="flex gap-2">
            {/* 3. Edit Button - MUST use product._id */}
            <Link
              to={`/edit/${product._id}`}
              className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Edit
            </Link>

            {/* 4. Delete Button - MUST use product._id */}
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete "${product.title}"?`,
                  )
                ) {
                  deleteProduct(product._id);
                }
              }}
              className="px-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-lg text-sm transition-all"
              title="Delete Product"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
