import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

export default function AddProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    stock: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(formData);
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Button - Easy to tap on mobile */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-gray-500 hover:text-blue-600 flex items-center gap-2 font-medium"
      >
        ← Back to Inventory
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Add New Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title - Full Width */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Product Title
              </label>
              <input
                type="text"
                required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. Wireless Headphones"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Responsive Row: Stacks on mobile, side-by-side on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Price ($)
                </label>
                <input
                  type="number"
                  required
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="0.00"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  required
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. 50"
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Category - Full Width */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Category
              </label>
              <select
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="beauty">Beauty</option>
                <option value="groceries">Groceries</option>
              </select>
            </div>

            {/* Description - Full Width */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Description
              </label>
              <textarea
                rows="4"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Write something about the product..."
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
            </div>

            {/* Action Buttons: Stack on mobile, side-by-side on desktop */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
              >
                Save Product
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
