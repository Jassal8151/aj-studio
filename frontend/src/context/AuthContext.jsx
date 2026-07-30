import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe, loginAdmin, logoutAdmin } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    try {
      const userData = await loginAdmin(credentials);
      setAdmin(userData);
      return { success: true, data: userData };
    } catch (error) {
      const message = error?.response?.data?.message || 'Invalid admin credentials';
      return { success: false, message };
    }
  };

  const logout = () => {
    logoutAdmin();
    setAdmin(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
