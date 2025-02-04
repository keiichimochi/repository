import { NavLink, Stack } from '@mantine/core';

interface NavItem {
  icon: React.ComponentType<any>;
  label: string;
  link: string;
}

interface MainNavbarProps {
  items: NavItem[];
  activeLink?: string;
  onItemClick?: (link: string) => void;
}

export function MainNavbar({ items, activeLink = '/', onItemClick }: MainNavbarProps) {
  return (
    <Stack gap="sm">
      {items.map((item) => (
        <NavLink
          key={item.link}
          label={item.label}
          leftSection={<item.icon size="1rem" stroke={1.5} />}
          active={activeLink === item.link}
          onClick={() => onItemClick?.(item.link)}
        />
      ))}
    </Stack>
  );
} 