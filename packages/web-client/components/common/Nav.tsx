import { Flex, Text, Link as StyledLink } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { navItems } from '@/constants/nav';

function Nav(): JSX.Element {
  const router = useRouter();

  const isActiveLink = (path: string) => router.pathname === path;

  return (
    <Flex gap={50} fontSize="20px">
      {navItems.map(item => (
        <Link href={item.path} key={item.id} passHref>
          <StyledLink variant="noUnderline">
            <Text
              color={isActiveLink(item.path) ? 'brandAccent' : 'brandPrimary'}
              fontSize="20px"
            >
              {item.name}
            </Text>
          </StyledLink>
        </Link>
      ))}
    </Flex>
  );
}

export default Nav;
