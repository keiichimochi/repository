import { Container, Title, TextInput, Textarea, Button, Select, MultiSelect, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useCreateItem } from '../hooks/useItems';
import { useNavigate } from 'react-router-dom';

export function CreateItem() {
  const navigate = useNavigate();
  const { mutate: createItem, isPending } = useCreateItem();

  const form = useForm({
    initialValues: {
      type: 'text',
      title: '',
      content: '',
      tags: [] as string[],
    },
    validate: {
      title: (value) => !value && 'タイトルは必須やけん！',
      content: (value) => !value && '内容は必須やけん！',
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    createItem(
      {
        type: values.type as 'text' | 'link' | 'file',
        title: values.title,
        content: values.content,
        tags: values.tags.join(','),
      },
      {
        onSuccess: () => {
          notifications.show({
            title: '成功！',
            message: 'データを作成したがやけん！',
            color: 'green',
          });
          navigate('/');
        },
        onError: (error) => {
          notifications.show({
            title: 'エラー！',
            message: error.message || 'データの作成に失敗したがやけん！',
            color: 'red',
          });
        },
      }
    );
  });

  return (
    <Container size="sm">
      <Title order={2} mb="md">新規データ作成</Title>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Select
            label="タイプ"
            data={[
              { value: 'text', label: 'テキスト' },
              { value: 'link', label: 'リンク' },
              { value: 'file', label: 'ファイル' },
            ]}
            {...form.getInputProps('type')}
          />
          <TextInput
            label="タイトル"
            placeholder="タイトルを入力するがやけん"
            required
            {...form.getInputProps('title')}
          />
          <Textarea
            label="内容"
            placeholder="内容を入力するがやけん"
            required
            minRows={4}
            {...form.getInputProps('content')}
          />
          <MultiSelect
            label="タグ"
            placeholder="タグを入力するがやけん"
            data={form.values.tags.map((tag) => tag)}
            searchable
            comboboxProps={{
              withinPortal: false,
              onOptionSubmit: (value: string) => {
                if (!form.values.tags.includes(value)) {
                  form.setFieldValue('tags', [...form.values.tags, value]);
                }
              },
            }}
            {...form.getInputProps('tags')}
          />
          <Button type="submit" loading={isPending}>
            作成
          </Button>
        </Stack>
      </form>
    </Container>
  );
} 