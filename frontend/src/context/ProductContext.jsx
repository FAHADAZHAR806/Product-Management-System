import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductCtx = createContext();

const BASE_URL = "https://dummyjson.com/products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  /* ── Toast helper ── */
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  /* ── Fetch all products ── */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Axios automatically handles JSON conversion
      const response = await axios.get(`${BASE_URL}?limit=100`);
      setProducts(response.data.products || []);
    } catch (err) {
      setError(
        "Failed to load products. Please check your internet connection.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* ── Fetch single product ── */
  const getProduct = useCallback(async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch {
      return null;
    }
  }, []);

  /* ── Add product ── */
  const addProduct = useCallback(
    async (data) => {
      try {
        const response = await axios.post(`${BASE_URL}/add`, data);
        const newProduct = response.data;

        // DummyJSON returns id=101 every time, so we assign a local unique id
        setProducts((prev) => [{ ...newProduct, id: Date.now() }, ...prev]);
        showToast("Product added successfully!");
        navigate("/");
      } catch {
        showToast("Failed to add product.", "error");
      }
    },
    [navigate],
  );

  /* ── Update product ── */
  const updateProduct = useCallback(
    async (id, data) => {
      try {
        const response = await axios.put(`${BASE_URL}/${id}`, data);
        const updated = response.data;

        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...updated, id } : p)),
        );
        showToast("Product updated successfully!");
        navigate("/");
      } catch {
        showToast("Failed to update product.", "error");
      }
    },
    [navigate],
  );

  /* ── Delete product ── */
  const deleteProduct = useCallback(async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted.");
    } catch {
      showToast("Failed to delete product.", "error");
    }
  }, []);

  /* ── Filtered products (search) ── */
  const filteredProducts = searchTerm.trim()
    ? products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : products;

  return (
    <ProductCtx.Provider
      value={{
        products: filteredProducts,
        allProducts: products,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        fetchProducts,
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        toast,
      }}
    >
      {children}

      {/* Global toast using Tailwind CSS */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce">
          <div
            className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            <span className="font-bold">
              {toast.type === "success" ? "✓" : "✕"}
            </span>
            {toast.msg}
          </div>
        </div>
      )}
    </ProductCtx.Provider>
  );
}

export function useProducts() {
  return useContext(ProductCtx);
}
