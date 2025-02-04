import { Container, Title, Text, Stack, Card, Group, Badge } from '@mantine/core';
import { IconFile, IconLink, IconPhoto, IconVideo } from '@tabler/icons-react';

// 仮のデータ型定義
interface DataItem {
  id: string;
  title: string;
  type: 'url' | 'text' | 'image' | 'video';
  createdAt: string;
  tags: string[];
}

// 仮のデータ
const mockData: DataItem[] = [
  {
    id: '1',
    title: '面白いWebサイト',
    type: 'url',
    createdAt: '2024-03-20',
    tags: ['web', 'tech'],
  },
  {
    id: '2',
    title: '会議メモ',
    type: 'text',
    createdAt: '2024-03-19',
    tags: ['work', 'meeting'],
  },
];

const typeIcons = {
  url: IconLink,
  text: IconFile,
  image: IconPhoto,
  video: IconVideo,
};

export function DataListPage() {
  return (
    <Container size="lg">
      <Stack gap="xl">
        <div>
          <Title>データ一覧</Title>
          <Text c="dimmed" mt="md">
            保存したデータの一覧を表示するがやけん！
          </Text>
        </div>

        <Stack gap="md">
          {mockData.map((item) => {
            const Icon = typeIcons[item.type];
            return (
              <Card key={item.id} withBorder>
                <Group justify="space-between">
                  <Group>
                    <Icon size="1.5rem" />
                    <div>
                      <Text fw={500}>{item.title}</Text>
                      <Text size="sm" c="dimmed">
                        {item.createdAt}
                      </Text>
                    </div>
                  </Group>
                  <Group gap="xs">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="light">
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                </Group>
              </Card>
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
} 