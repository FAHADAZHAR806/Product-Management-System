import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  // State to toggle the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 1. LOGO SECTION */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">📦</span>
            <span className="font-extrabold text-xl tracking-tight text-gray-900">
              PRO<span className="text-blue-600">MGR</span>
            </span>
          </Link>

          {/* 2. MOBILE MENU BUTTON (Visible only on small screens) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            {isOpen ? "✕" : "☰"}
          </button>

          {/* 3. DESKTOP LINKS (Hidden on mobile, flex on md+) */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Inventory
            </Link>
            <button
              onClick={() => navigate("/add")}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
            >
              + Add Product
            </button>
          </div>
        </div>

        {/* 4. MOBILE DRAWER (Visible only when isOpen is true and on small screens) */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-4 animate-in slide-in-from-top duration-200">
            <hr className="border-gray-100" />
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-600 font-medium"
            >
              Inventory List
            </Link>
            <button
              onClick={() => {
                navigate("/add");
                setIsOpen(false);
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
            >
              + Add New Product
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
