import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

export default function ProductDetail() {
  const { id } = useParams(); // This is the string _id from the URL
  const navigate = useNavigate();
  const { getProduct, deleteProduct } = useProducts(); // Added deleteProduct
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state explicitly

  useEffect(() => {
    let isMounted = true;

    // We use id directly (no Number(id) conversion)
    getProduct(id)
      .then((data) => {
        if (isMounted) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, getProduct]);

  // Handle deletion from detail page
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
      await deleteProduct(product._id);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 font-medium animate-pulse">
          Loading product details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found.</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 font-bold"
        >
          ← Back to Inventory
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium transition-colors"
      >
        <span>←</span> Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        {/* LEFT: Image Section */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 p-6 md:p-12">
            <img
              src={product.thumbnail || (product.images && product.images[0])}
              alt={product.title}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          {/* Small Thumbnails Row */}
          {product.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border border-gray-200 flex-shrink-0"
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Info Section */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg uppercase tracking-wider">
              {product.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-blue-600">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed text-lg mb-8">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-2xl">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Stock</p>
              <p className="font-semibold text-gray-700">
                {product.stock} units
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Brand</p>
              <p className="font-semibold text-gray-700">
                {product.brand || "Generic"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
            <button
              onClick={() => navigate(`/edit/${product._id}`)} // FIXED: used _id
              className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
            >
              ✎ Edit Product
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-50 text-red-600 py-4 rounded-xl font-bold hover:bg-red-100 transition-all"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
