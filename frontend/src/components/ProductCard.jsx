import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Fixed aspect ratio for images so the grid stays aligned */}
      <div className="aspect-square w-full bg-gray-50 p-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 truncate">{product.title}</h3>
        <p className="text-blue-600 font-bold mt-1">${product.price}</p>

        {/* Full-width button on mobile for better thumb-target */}
        <Link
          to={`/product/${product.id}`}
          className="mt-4 block text-center bg-gray-100 hover:bg-blue-600 hover:text-white py-2 rounded-lg font-medium transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
