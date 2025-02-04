import { Container, Title, Text, Stack, TextInput, Select, FileInput, Button, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconFile, IconLink, IconPhoto, IconVideo } from '@tabler/icons-react';

interface NewDataForm {
  type: string;
  title: string;
  content: string;
  tags: string;
  file?: File;
}

const dataTypes = [
  { value: 'url', label: 'Webサイト', icon: IconLink },
  { value: 'text', label: 'テキスト', icon: IconFile },
  { value: 'image', label: '画像', icon: IconPhoto },
  { value: 'video', label: '動画', icon: IconVideo },
];

export function NewDataPage() {
  const form = useForm<NewDataForm>({
    initialValues: {
      type: 'url',
      title: '',
      content: '',
      tags: '',
    },
    validate: {
      title: (value) => (value.length < 1 ? 'タイトルは必須やけん！' : null),
      content: (value) => (value.length < 1 ? 'コンテンツは必須やけん！' : null),
    },
  });

  const handleSubmit = (values: NewDataForm) => {
    // TODO: APIを実装したら、ここでデータを送信するがやけん！
    console.log('送信されたデータ:', values);
  };

  return (
    <Container size="lg">
      <Stack gap="xl">
        <div>
          <Title>新しいデータを追加</Title>
          <Text c="dimmed" mt="md">
            追加したいデータの情報を入力するがやけん！
          </Text>
        </div>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <Select
              label="データの種類"
              description="追加するデータの種類を選択するがやけん！"
              data={dataTypes.map(type => ({
                value: type.value,
                label: type.label,
                leftSection: <type.icon size="1rem" />,
              }))}
              {...form.getInputProps('type')}
            />

            <TextInput
              label="タイトル"
              description="データの名前や概要を入力するがやけん！"
              placeholder="例: 面白いWebサイト"
              {...form.getInputProps('title')}
            />

            {form.values.type === 'url' ? (
              <TextInput
                label="URL"
                description="WebサイトのURLを入力するがやけん！"
                placeholder="https://example.com"
                {...form.getInputProps('content')}
              />
            ) : form.values.type === 'text' ? (
              <Textarea
                label="テキスト"
                description="メモやアイデアを入力するがやけん！"
                placeholder="ここにテキストを入力..."
                minRows={5}
                {...form.getInputProps('content')}
              />
            ) : (
              <FileInput
                label="ファイル"
                description={`${form.values.type === 'image' ? '画像' : '動画'}ファイルをアップロードするがやけん！`}
                placeholder="ファイルを選択..."
                accept={form.values.type === 'image' ? 'image/*' : 'video/*'}
                {...form.getInputProps('file')}
              />
            )}

            <TextInput
              label="タグ"
              description="カンマ区切りでタグを入力するがやけん！"
              placeholder="例: tech, web, idea"
              {...form.getInputProps('tags')}
            />

            <Button type="submit" mt="md">
              保存する
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
} 