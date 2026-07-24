import axiosClient from '../api/axiosClient';

export const submitContactForm = async (formData) => {
  const { data } = await axiosClient.post('/contact', formData);
  return data.data;
};

export const getContactInquiries = async () => {
  const { data } = await axiosClient.get('/contact');
  return data.data;
};

export const updateContactStatus = async ({ id, status }) => {
  const { data } = await axiosClient.put(`/contact/${id}`, { status });
  return data.data;
};
