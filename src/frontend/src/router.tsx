import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/home/HomePage';
import { DataListPage } from './pages/data/DataListPage';
import { NewDataPage } from './pages/data/NewDataPage';
import { SettingsPage } from './pages/settings/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'data',
        element: <DataListPage />,
      },
      {
        path: 'data/new',
        element: <NewDataPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
]); 