import { Stack } from '@chakra-ui/react';

type SidebarProps = {
  children: React.ReactNode;
};

function Sidebar({ children }: SidebarProps): JSX.Element {
  return (
    <Stack
      width="300px"
      height="100%"
      borderLeftWidth="1px"
      borderLeftStyle="solid"
      borderLeftColor="brandPrimaryAlpha"
      padding="0 20px"
    >
      {children}
    </Stack>
  );
}

export default Sidebar;
