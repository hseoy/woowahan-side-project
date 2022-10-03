import { Text } from '@chakra-ui/react';
import { serviceName } from '@/constants/service';

type LogoProps = {
  fontSize?: number;
};

function Logo({ fontSize = 22 }: LogoProps): JSX.Element {
  return (
    <Text fontFamily="logo" fontSize={fontSize} color="logo">
      {serviceName}
    </Text>
  );
}

export default Logo;
