import axiosClient from '../api/axiosClient';

export const getPortfolioItems = async () => {
  const { data } = await axiosClient.get('/portfolio');
  return data.data;
};

export const createPortfolioItem = async (itemData) => {
  const { data } = await axiosClient.post('/portfolio', itemData);
  return data.data;
};

export const updatePortfolioItem = async ({ id, itemData }) => {
  const { data } = await axiosClient.put(`/portfolio/${id}`, itemData);
  return data.data;
};

export const deletePortfolioItem = async (id) => {
  const { data } = await axiosClient.delete(`/portfolio/${id}`);
  return data.data;
};
