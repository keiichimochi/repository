import { Container, Title, Card, Text, Group, Badge, Stack, Button } from '@mantine/core';
import { useItems } from '../hooks/useItems';
import { useNavigate } from 'react-router-dom';

export function ItemList() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useItems();

  if (isLoading) {
    return <div>データを読み込み中やけん！</div>;
  }

  if (error) {
    return <div>エラーが発生したがやけん！: {error.message}</div>;
  }

  return (
    <Container size="lg">
      <Group justify="space-between" mb="md">
        <Title order={2}>データ一覧</Title>
        <Button onClick={() => navigate('/create')}>新規作成</Button>
      </Group>
      <Stack>
        {data?.items.map((item) => (
          <Card key={item.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>{item.title}</Text>
              <Badge color="blue">{item.type}</Badge>
            </Group>
            <Text size="sm" c="dimmed">{item.content}</Text>
            <Group gap={4} mt="sm">
              {item.tags.map((tag) => (
                <Badge key={tag} size="sm" variant="light">{tag}</Badge>
              ))}
            </Group>
          </Card>
        ))}
      </Stack>
    </Container>
  );
} 