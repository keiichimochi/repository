import { Container, Title, Text, Stack, Switch, TextInput, Button } from '@mantine/core';

export function SettingsPage() {
  return (
    <Container size="lg">
      <Stack gap="xl">
        <div>
          <Title>設定</Title>
          <Text c="dimmed" mt="md">
            アプリケーションの設定を変更できるがやけん！
          </Text>
        </div>

        <Stack gap="md">
          <Switch
            label="AIによる自動タグ付け"
            description="新しいデータを追加した時に、AIが自動でタグを提案するがやけん！"
          />

          <Switch
            label="データの自動バックアップ"
            description="1日1回、自動でデータをバックアップするがやけん！"
          />

          <TextInput
            label="OpenAI API Key"
            description="AIの機能を使うために必要なAPIキーやけん！"
            placeholder="sk-..."
            type="password"
          />

          <Button variant="light" color="blue" mt="md">
            設定を保存
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
} 