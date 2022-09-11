type NavItem = {
  id: string | number;
  name: string;
  path: string;
};

export const navItems: NavItem[] = [
  { id: 0, name: '프로젝트들', path: '/' },
  { id: 1, name: '아이디어', path: '/idea' },
  { id: 2, name: '순위', path: '/ranking' },
];
