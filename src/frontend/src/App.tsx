import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDatabase, IconHome, IconSettings } from '@tabler/icons-react';
import { MainNavbar } from './components/MainNavbar';
import { MainHeader } from './components/MainHeader';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { icon: IconHome, label: 'ホーム', link: '/' },
  { icon: IconDatabase, label: 'データ一覧', link: '/data' },
  { icon: IconSettings, label: '設定', link: '/settings' },
];

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (link: string) => {
    navigate(link);
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <MainHeader />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <MainNavbar 
          items={navItems} 
          activeLink={location.pathname}
          onItemClick={handleNavClick}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
