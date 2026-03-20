import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(localStorage.getItem("adminToken"));

  const isAuthenticated = !!token;

  const logout = useCallback(() => {
    localStorage.removeItem("adminToken");
    setToken(null);
    navigate("/admin/login");
  }, [navigate]);

  return { isAuthenticated, token, logout };
};
