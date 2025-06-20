import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/axios';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  BusinessSettings: {
    tone: string;
    targetAudience: string;
    keywords: string[];
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  getBusinesses: () => Promise<Business[]>;
  createBusiness: (businessData: any) => Promise<Business>;
  updateBusiness: (id: number, businessData: any) => Promise<Business>;
  deleteBusiness: (id: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await api.get('/auth/profile');
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    };

    loadUser();
  }, [token]);

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      const { token: newToken, ...userData } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en el registro');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { token: newToken, ...userData } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error en el inicio de sesión');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const getBusinesses = async () => {
    try {
      const response = await api.get('/businesses');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener negocios');
    }
  };

  const createBusiness = async (businessData: any) => {
    try {
      const response = await api.post('/businesses', businessData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al crear negocio');
    }
  };

  const updateBusiness = async (id: number, businessData: any) => {
    try {
      const response = await api.put(`/businesses/${id}`, businessData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al actualizar negocio');
    }
  };

  const deleteBusiness = async (id: number) => {
    try {
      await api.delete(`/businesses/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al eliminar negocio');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        register,
        logout,
        getBusinesses,
        createBusiness,
        updateBusiness,
        deleteBusiness
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 