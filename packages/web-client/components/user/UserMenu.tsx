import {
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import useAuth from '@/hooks/use-auth';
import useProjectItemModal from '@/hooks/use-project-item-modal';
import GoogleLoginButton from '../auth/GoogleLoginButton';

function UserMenu(): JSX.Element {
  const [isRequestedAuthInfo, setIsRequestedAuthInfo] = useState(false);
  const { user, refreshToken, getMe, logout } = useAuth();
  const { openModal } = useProjectItemModal();

  useEffect(() => {
    refreshToken()
      .then(getMe)
      .catch(() => null)
      .then(() => setIsRequestedAuthInfo(true));
  }, []);

  if (!isRequestedAuthInfo) {
    return <Spinner />;
  }

  if (!user) {
    return <GoogleLoginButton />;
  }

  return (
    <Menu>
      <MenuButton>
        <Avatar src={user.profileImg} size="sm" referrerPolicy="no-referrer" />
      </MenuButton>
      <MenuList>
        {user.accountType === 'woowahan' && (
          <MenuItem onClick={() => openModal()}>
            <Text fontFamily="body" fontSize="16px">
              프로젝트 추가
            </Text>
          </MenuItem>
        )}
        <MenuItem onClick={logout}>
          <Text fontFamily="body" fontSize="16px">
            로그아웃
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserMenu;
