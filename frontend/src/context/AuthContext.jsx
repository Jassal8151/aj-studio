import { createContext, useContext, useEffect, useState } from 'react';
import { getMe, loginAdmin, logoutAdmin } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const userData = await getMe();
          setAdmin(userData);
        } catch (error) {
          console.error('Failed to authenticate token:', error);
          localStorage.removeItem('adminToken');
        }
      }
      setLoading(false);
    };

    fetchAdmin();
  }, []);

  const login = async (credentials) => {
    const userData = await loginAdmin(credentials);
    setAdmin(userData);
  };

  const logout = () => {
    logoutAdmin();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
