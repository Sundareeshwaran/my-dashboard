import { useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const authenticate = async () => {
      try {
        const response = await api.get("/auth/me");

        if (!cancelled) {
          setUser(response.data.user);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    authenticate();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (userName, password) => {
    const response = await api.post("/auth/login", {
      user_name: userName,
      password,
    });

    setUser(response.data.user);

    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    return response.data;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await api.get("/auth/me");

      setUser(response.data.user);

      return response.data.user;
    } catch {
      setUser(null);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
