-- データアイテムテーブル
CREATE TABLE IF NOT EXISTS items (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN ('url', 'text', 'image', 'video')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  file_key TEXT,  -- R2のファイルキー（画像・動画の場合）
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- タグテーブル
CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- アイテムとタグの中間テーブル
CREATE TABLE IF NOT EXISTS item_tags (
  item_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (item_id, tag_id),
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- メタデータテーブル（画像・動画用）
CREATE TABLE IF NOT EXISTS metadata (
  item_id TEXT PRIMARY KEY,
  mime_type TEXT,
  file_size INTEGER,
  width INTEGER,  -- 画像・動画の幅
  height INTEGER,  -- 画像・動画の高さ
  duration INTEGER,  -- 動画の長さ（秒）
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

-- AIによる自動タグ付けの履歴
CREATE TABLE IF NOT EXISTS ai_tag_history (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  confidence REAL NOT NULL,  -- AIの確信度
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- インデックスの作成
CREATE INDEX IF NOT EXISTS idx_items_type ON items(type);
CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at);
CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);
CREATE INDEX IF NOT EXISTS idx_item_tags_item_id ON item_tags(item_id);
CREATE INDEX IF NOT EXISTS idx_item_tags_tag_id ON item_tags(tag_id);

-- トリガーの作成（updated_atの自動更新用）
CREATE TRIGGER IF NOT EXISTS update_items_timestamp 
AFTER UPDATE ON items
BEGIN
  UPDATE items SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
