import { Group, Title } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';

export function MainHeader() {
  return (
    <Group>
      <IconDatabase size={30} />
      <Title order={1} size="h3">雑多なデータリポジトリナリ！</Title>
    </Group>
  );
} 