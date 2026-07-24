import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPortfolioItems, createPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '../services/portfolioService';

export const usePortfolioList = (options = {}) => {
  return useQuery({
    queryKey: ['portfolio', options],
    queryFn: async () => {
      // getPortfolioItems could be modified to accept options like limit, sort, etc.
      // But for now it just returns all items, and the frontend will filter/slice if needed.
      const items = await getPortfolioItems();
      
      let filtered = items;
      
      // Basic client-side mock for the sort/limit since backend doesn't handle it currently
      if (options.sort === 'newest') {
        filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      
      if (options.limit) {
        filtered = filtered.slice(0, options.limit);
      }
      
      return { data: filtered, totalDocuments: items.length };
    },
  });
};

// Aliased for other parts of the app that might expect this
export const usePortfolioItems = () => {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolioItems,
  });
};

export const useCreatePortfolioItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPortfolioItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
};

export const useUpdatePortfolioItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePortfolioItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
};

export const useDeletePortfolioItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePortfolioItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
};

export const useCreatePortfolio = useCreatePortfolioItem;
export const useUpdatePortfolio = useUpdatePortfolioItem;
export const useDeletePortfolio = useDeletePortfolioItem;
