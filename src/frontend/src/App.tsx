import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import { ItemList } from './pages/ItemList';
import { CreateItem } from './pages/CreateItem';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Notifications />
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/create" element={<CreateItem />} />
        </Routes>
      </MantineProvider>
    </QueryClientProvider>
  );
}
