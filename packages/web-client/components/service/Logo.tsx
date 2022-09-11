import { Center, Flex, Stack, Text } from '@chakra-ui/react';
import { serviceName } from '@/constants/service';

export type LogoProps = {
  withText?: boolean;
  otherFor?: string;
};

function Logo({ withText = false, otherFor = '' }: LogoProps): JSX.Element {
  return (
    <Flex gap={2}>
      {withText && (
        <Center fontWeight="light" fontSize="18px" lineHeight={1.2}>
          {otherFor ? (
            <Stack>
              <Text fontSize="14px">for {otherFor}</Text>
              <Text style={{ margin: 0 }}>{serviceName}</Text>
            </Stack>
          ) : (
            <Text>{serviceName}</Text>
          )}
        </Center>
      )}
    </Flex>
  );
}

export default Logo;
