import { D1Database } from '@cloudflare/workers-types';
import { CreateItemRequest, ItemResponse, DataType } from './types';

export async function createItem(
  db: D1Database,
  data: CreateItemRequest,
  fileKey?: string
): Promise<ItemResponse> {
  const id = crypto.randomUUID();
  const tags = data.tags ? data.tags.split(',').map(tag => tag.trim()) : [];

  try {
    // バッチ処理の準備
    const batch = [];

    // アイテムの作成
    batch.push(
      db.prepare(
        'INSERT INTO items (id, type, title, content, file_key) VALUES (?, ?, ?, ?, ?)'
      ).bind(id, data.type, data.title, data.content, fileKey || null)
    );

    // タグの作成と関連付け
    for (const tagName of tags) {
      if (!tagName) continue;

      // タグの取得
      const existingTag = await db
        .prepare('SELECT id FROM tags WHERE name = ?')
        .bind(tagName)
        .first<{ id: string }>();

      const tagId = existingTag?.id || crypto.randomUUID();

      if (!existingTag) {
        batch.push(
          db.prepare('INSERT INTO tags (id, name) VALUES (?, ?)')
            .bind(tagId, tagName)
        );
      }

      // アイテムとタグの関連付け
      batch.push(
        db.prepare('INSERT INTO item_tags (item_id, tag_id) VALUES (?, ?)')
          .bind(id, tagId)
      );
    }

    // バッチ実行
    await db.batch(batch);

    // 作成したアイテムを取得
    const item = await getItemById(db, id);
    if (!item) throw new Error('アイテムの作成に失敗したがやけん！');

    return item;
  } catch (error) {
    throw error;
  }
}

export async function getItemById(db: D1Database, id: string): Promise<ItemResponse | null> {
  // アイテムの基本情報を取得
  const item = await db
    .prepare(
      `SELECT i.*, GROUP_CONCAT(t.name) as tag_names
       FROM items i
       LEFT JOIN item_tags it ON i.id = it.item_id
       LEFT JOIN tags t ON it.tag_id = t.id
       WHERE i.id = ?
       GROUP BY i.id`
    )
    .bind(id)
    .first<{
      id: string;
      type: string;
      title: string;
      content: string;
      file_key: string | null;
      created_at: string;
      updated_at: string;
      tag_names: string | null;
    }>();

  if (!item) return null;

  // メタデータを取得
  const metadata = await db
    .prepare('SELECT * FROM metadata WHERE item_id = ?')
    .bind(id)
    .first<{
      mime_type: string | null;
      file_size: number | null;
      width: number | null;
      height: number | null;
      duration: number | null;
    }>();

  return {
    ...item,
    type: item.type as DataType,
    file_key: item.file_key || undefined,
    tags: item.tag_names ? item.tag_names.split(',') : [],
    metadata: metadata ? {
      mime_type: metadata.mime_type || undefined,
      file_size: metadata.file_size || undefined,
      width: metadata.width || undefined,
      height: metadata.height || undefined,
      duration: metadata.duration || undefined,
    } : undefined,
  };
}

export async function listItems(
  db: D1Database,
  type?: string,
  tag?: string,
  limit = 20,
  offset = 0
): Promise<{ items: ItemResponse[]; total: number }> {
  // WHERE句の構築
  const conditions: string[] = [];
  const params: any[] = [];
  if (type) {
    conditions.push('i.type = ?');
    params.push(type);
  }
  if (tag) {
    conditions.push('t.name = ?');
    params.push(tag);
  }
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // 総件数の取得
  const totalResult = await db
    .prepare(
      `SELECT COUNT(DISTINCT i.id) as total
       FROM items i
       LEFT JOIN item_tags it ON i.id = it.item_id
       LEFT JOIN tags t ON it.tag_id = t.id
       ${whereClause}`
    )
    .bind(...params)
    .first<{ total: number }>();

  // アイテムの取得
  const items = await db
    .prepare(
      `SELECT i.*, GROUP_CONCAT(t.name) as tag_names
       FROM items i
       LEFT JOIN item_tags it ON i.id = it.item_id
       LEFT JOIN tags t ON it.tag_id = t.id
       ${whereClause}
       GROUP BY i.id
       ORDER BY i.created_at DESC
       LIMIT ? OFFSET ?`
    )
    .bind(...params, limit, offset)
    .all<{
      id: string;
      type: string;
      title: string;
      content: string;
      file_key: string | null;
      created_at: string;
      updated_at: string;
      tag_names: string | null;
    }>();

  // メタデータの取得
  const itemsWithMetadata = await Promise.all(
    items.results.map(async (item) => {
      const metadata = await db
        .prepare('SELECT * FROM metadata WHERE item_id = ?')
        .bind(item.id)
        .first<{
          mime_type: string | null;
          file_size: number | null;
          width: number | null;
          height: number | null;
          duration: number | null;
        }>();

      return {
        ...item,
        type: item.type as DataType,
        file_key: item.file_key || undefined,
        tags: item.tag_names ? item.tag_names.split(',') : [],
        metadata: metadata ? {
          mime_type: metadata.mime_type || undefined,
          file_size: metadata.file_size || undefined,
          width: metadata.width || undefined,
          height: metadata.height || undefined,
          duration: metadata.duration || undefined,
        } : undefined,
      };
    })
  );

  return {
    items: itemsWithMetadata,
    total: totalResult?.total || 0,
  };
} 