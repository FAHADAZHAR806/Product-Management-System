import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api/auth"
      : "https://mongo-db-production-262b.up.railway.app/api/auth";

  // Check login status on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        // Agar data corrupt hai toh clear kar dein
        localStorage.removeItem("userInfo");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  };

  const logout = () => {
    localStorage.removeItem("userInfo");

    setUser(null);

    window.location.href = "/login";
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
