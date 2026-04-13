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
    thumbnail: "", // 1. Added thumbnail state
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Context handles the API call and the navigate("/")
    await addProduct(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
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
            {/* Title */}
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

            {/* 2. ADDED: Image URL Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Image URL
              </label>
              <input
                type="text"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="https://example.com/image.jpg"
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
              />
            </div>

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