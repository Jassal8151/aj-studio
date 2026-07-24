import axiosClient from '../api/axiosClient';

export const loginAdmin = async (credentials) => {
  const { data } = await axiosClient.post('/auth/login', credentials);
  if (data.data.token) {
    localStorage.setItem('adminToken', data.data.token);
  }
  return data.data;
};

export const getMe = async () => {
  const { data } = await axiosClient.get('/auth/me');
  return data.data;
};

export const logoutAdmin = () => {
  localStorage.removeItem('adminToken');
};
