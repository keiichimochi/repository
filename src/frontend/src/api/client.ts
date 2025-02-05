import { DataType } from '../../../workers/types';

const API_BASE_URL = 'http://localhost:8787';

export interface Item {
  id: string;
  type: DataType;
  title: string;
  content: string;
  file_key?: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  metadata?: {
    mime_type?: string;
    file_size?: number;
    width?: number;
    height?: number;
    duration?: number;
  };
}

export interface CreateItemRequest {
  type: DataType;
  title: string;
  content: string;
  tags?: string;
  file?: File;
}

export interface ListItemsResponse {
  items: Item[];
  total: number;
}

export const api = {
  items: {
    list: async (params?: { type?: string; tag?: string; limit?: number; offset?: number }): Promise<ListItemsResponse> => {
      const searchParams = new URLSearchParams();
      if (params?.type) searchParams.append('type', params.type);
      if (params?.tag) searchParams.append('tag', params.tag);
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.offset) searchParams.append('offset', params.offset.toString());

      const response = await fetch(`${API_BASE_URL}/items?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error('データの取得に失敗したがやけん！');
      }
      return response.json();
    },

    get: async (id: string): Promise<Item> => {
      const response = await fetch(`${API_BASE_URL}/items/${id}`);
      if (!response.ok) {
        throw new Error('データの取得に失敗したがやけん！');
      }
      return response.json();
    },

    create: async (data: CreateItemRequest): Promise<Item> => {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('データの作成に失敗したがやけん！');
      }
      return response.json();
    },
  },
}; 