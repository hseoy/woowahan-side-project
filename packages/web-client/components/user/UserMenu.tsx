import {
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Text,
  Spinner,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/use-auth';
import useProjectItemModal from '@/hooks/use-project-item-modal';
import GoogleLoginButton from '../auth/GoogleLoginButton';
import zIndexes from '@/styles/zIndexes';

type UserMenuProps = {
  isLoading?: boolean;
};

function UserMenu({ isLoading }: UserMenuProps): JSX.Element {
  const { user, logout } = useAuth();
  const { openModal } = useProjectItemModal();
  const router = useRouter();

  const toProfile = () => router.push('/profile');

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <GoogleLoginButton />;
  }

  return (
    <Menu>
      <MenuButton>
        <Avatar
          src={user.profileImg}
          size="sm"
          referrerPolicy="no-referrer"
          boxShadow="rgb(0, 0, 0, 0.5) 0px 0px 8px"
        />
      </MenuButton>
      <MenuList zIndex={zIndexes.userMenu}>
        <MenuGroup title="Project">
          <MenuItem onClick={() => openModal()}>
            <Text fontFamily="body" fontSize="16px">
              프로젝트 추가
            </Text>
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="User">
          <MenuItem onClick={() => toProfile()}>
            {user.username} - {user.accountType}
          </MenuItem>
          <MenuItem onClick={logout}>
            <Text fontFamily="body" fontSize="16px">
              로그아웃
            </Text>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

export default UserMenu;
