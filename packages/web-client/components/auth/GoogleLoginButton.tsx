import { Button, Link } from '@chakra-ui/react';
import { config } from '@/config';

type LoginButtonProps = Omit<
  React.HTMLAttributes<HTMLButtonElement>,
  'children'
>;

function GoogleLoginButton({ ...props }: LoginButtonProps): JSX.Element {
  return (
    <Button
      {...props}
      as={Link}
      href={`${config.apiUrl}/auth/google`}
      fontWeight="normal"
      colorScheme="mint"
      _hover={{ textDecoration: 'none' }}
    >
      로그인
    </Button>
  );
}

export default GoogleLoginButton;
