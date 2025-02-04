import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { zValidator } from '@hono/zod-validator';
import { D1Database, R2Bucket } from '@cloudflare/workers-types';
import { CreateItemSchema } from './types';
import { createItem, getItemById, listItems } from './db';

// 環境変数の型定義
interface Env {
  DB: D1Database;
  STORAGE: R2Bucket;
}

// APIの作成
const app = new Hono<{ Bindings: Env }>();

// CORSの設定
app.use('*', cors());

// エラーハンドリング
app.onError((err, c) => {
  console.error('エラーが発生したがやけん！', err);
  return c.json(
    {
      error: {
        message: 'サーバーエラーが発生したがやけん！',
        code: 'INTERNAL_SERVER_ERROR',
      },
    },
    500
  );
});

// ヘルスチェック
app.get('/', (c) => c.json({ message: 'APIサーバーは元気やけん！' }));

// データ一覧の取得
app.get('/items', async (c) => {
  const { type, tag } = c.req.query();
  const limit = parseInt(c.req.query('limit') || '20');
  const offset = parseInt(c.req.query('offset') || '0');

  const result = await listItems(c.env.DB, type, tag, limit, offset);
  return c.json(result);
});

// データの取得
app.get('/items/:id', async (c) => {
  const id = c.req.param('id');
  const item = await getItemById(c.env.DB, id);

  if (!item) {
    return c.json(
      {
        error: {
          message: '指定されたデータが見つからんがやけん！',
          code: 'NOT_FOUND',
        },
      },
      404
    );
  }

  return c.json(item);
});

// データの作成
app.post('/items', zValidator('json', CreateItemSchema), async (c) => {
  const data = c.req.valid('json');
  
  try {
    // TODO: ファイルアップロードの処理は後で実装するがやけん！
    const item = await createItem(c.env.DB, data);
    return c.json(item, 201);
  } catch (error) {
    console.error('データ作成中にエラーが発生したがやけん！', error);
    return c.json(
      {
        error: {
          message: 'データの作成に失敗したがやけん！',
          code: 'CREATE_FAILED',
        },
      },
      500
    );
  }
});

export default app; 