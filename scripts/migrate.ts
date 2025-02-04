import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

const DATABASE_NAME = 'repository-db';

async function main() {
  try {
    // マイグレーションファイルの読み込み
    const migrationPath = join(process.cwd(), 'migrations', '0000_initial.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');

    // SQLファイルを一時ファイルに保存
    const tempSQLPath = join(process.cwd(), 'temp_migration.sql');
    execSync(`echo "${migrationSQL}" > ${tempSQLPath}`);

    // マイグレーションの実行
    console.log('🚀 マイグレーションを実行するがやけん！');
    execSync(`wrangler d1 execute ${DATABASE_NAME} --file=${tempSQLPath}`, { stdio: 'inherit' });

    // 一時ファイルの削除
    execSync(`rm ${tempSQLPath}`);

    console.log('✨ マイグレーション完了したがやけん！');
  } catch (error) {
    console.error('❌ マイグレーション失敗したがやけん！', error);
    process.exit(1);
  }
}

main(); 