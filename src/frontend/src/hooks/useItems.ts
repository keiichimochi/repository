import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, CreateItemRequest, Item, ListItemsResponse } from '../api/client';

export function useItems(params?: { type?: string; tag?: string; limit?: number; offset?: number }) {
  return useQuery<ListItemsResponse>({
    queryKey: ['items', params],
    queryFn: () => api.items.list(params),
  });
}

export function useItem(id: string) {
  return useQuery<Item>({
    queryKey: ['items', id],
    queryFn: () => api.items.get(id),
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateItemRequest) => api.items.create(data),
    onSuccess: () => {
      // データ作成後にキャッシュを更新
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
} 