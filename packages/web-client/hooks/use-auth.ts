import { atom, useRecoilState } from 'recoil';
import { requestGetMe, UserDto } from '@/apis/users';
import { requestLogout, requestRefreshToken } from '@/apis/auth';

const userAtom = atom<UserDto | null>({
  key: 'use-auth/user-state',
  default: null,
});

const useAuth = () => {
  const [userState, setUserState] = useRecoilState(userAtom);

  const refreshToken = () => requestRefreshToken();
  const logout = async () => {
    try {
      await requestLogout();
    } catch (e) {
      /* Do Not Anything */
    }
    setUserState(null);
  };
  const getMe = async () => {
    const response = await requestGetMe();
    setUserState(response.data);
  };

  return { user: userState, getMe, refreshToken, logout };
};

export default useAuth;
