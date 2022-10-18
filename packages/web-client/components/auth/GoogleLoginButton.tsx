import { Button, ButtonProps, Link } from '@chakra-ui/react';
import { config } from '@/config';

type LoginButtonProps = Omit<ButtonProps, 'children'>;

function GoogleLoginButton({ ...props }: LoginButtonProps): JSX.Element {
  return (
    <Button
      as={Link}
      href={`${config.apiUrl}/auth/google`}
      fontWeight="normal"
      colorScheme="mint"
      _hover={{ textDecoration: 'none' }}
      {...props}
    >
      로그인
    </Button>
  );
}

export default GoogleLoginButton;
