import { Box, Button, Center, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Banner from './Banner';

function WoowaconBanner(): JSX.Element {
  const router = useRouter();

  const toHref = () => {
    router.push('https://woowacon.com/ko/detailVideo/21');
  };

  return (
    <Banner>
      <Box
        color="lightGray"
        fontSize="15px"
        fontFamily="BMDOHYEON"
        textAlign="center"
        paddingTop="37px"
      >
        <Text>배민시각시스템, 배시시</Text>
        <Text>10월 20일 목요일 우아콘에서 발표됩니다</Text>
      </Box>

      <Center paddingTop="20px">
        <Button
          onClick={toHref}
          backgroundColor="logo"
          color="white"
          width="250px"
        >
          Click
        </Button>
      </Center>
    </Banner>
  );
}

export default WoowaconBanner;
