import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { submitContactForm, getContactInquiries, updateContactStatus } from '../services/contactService';
export const useSubmitContact = () => {
  return useMutation({
    mutationFn: submitContactForm,
  });
};

export const useContactList = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: getContactInquiries,
  });
};

export const useContactInquiries = useContactList;

export const useUpdateContactStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateContactStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};
