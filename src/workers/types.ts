import { z } from 'zod';

// データ型の定義
export const DataTypeSchema = z.enum(['url', 'text', 'image', 'video']);
export type DataType = z.infer<typeof DataTypeSchema>;

// 新規データ作成のリクエストスキーマ
export const CreateItemSchema = z.object({
  type: DataTypeSchema,
  title: z.string().min(1, 'タイトルは必須やけん！'),
  content: z.string().min(1, 'コンテンツは必須やけん！'),
  tags: z.string().optional(),
  file: z.any().optional(), // ファイルはHonoのファイル型で扱うため、anyで定義
});

export type CreateItemRequest = z.infer<typeof CreateItemSchema>;

// レスポンスの型定義
export interface ItemResponse {
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

// エラーレスポンスの型定義
export interface ErrorResponse {
  error: {
    message: string;
    code: string;
  };
} 