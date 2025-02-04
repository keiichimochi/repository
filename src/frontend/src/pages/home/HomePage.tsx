import { Container, Title, Text, Stack, Button, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <Container size="lg">
      <Stack gap="xl">
        <div>
          <Title>ようこそ！データリポジトリへナリ！</Title>
          <Text c="dimmed" mt="md">
            気になるWebサイト、アイデア、写真、動画、音声など、あらゆるデータを雑に放り込めるプライベートリポジトリやけん！
          </Text>
        </div>

        <Group>
          <Button
            component={Link}
            to="/data/new"
            leftSection={<IconPlus size="1rem" />}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            新しいデータを追加
          </Button>
          <Button
            component={Link}
            to="/data"
            variant="light"
          >
            データ一覧を見る
          </Button>
        </Group>
      </Stack>
    </Container>
  );
} 