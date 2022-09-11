import { Link as StyledLink } from '@chakra-ui/react';
import Link from 'next/link';
import Logo, { LogoProps } from './Logo';

type LogoLinkProps = {
  href: string;
} & LogoProps;

function LogoLink({ href, ...logoProps }: LogoLinkProps): JSX.Element {
  return (
    <Link href={href} passHref>
      <StyledLink variant="noUnderline">
        <Logo {...logoProps} />
      </StyledLink>
    </Link>
  );
}

export default LogoLink;
