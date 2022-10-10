import { Center } from '@chakra-ui/react';
import Link from 'next/link';

function Login() {
  return (
    <Center width="100vw" height="100vh">
      <Link href="http://localhost:3001/auth/google">Google Login</Link>
    </Center>
  );
}

export default Login;
