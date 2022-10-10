import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import BannerImage from '@/assets/banner.png';
import Banner from './Banner';

function WoowaBanner(): JSX.Element {
  return (
    <Banner>
      <Box
        color="lightGray"
        fontSize="15px"
        fontFamily="BMDOHYEON"
        textAlign="center"
        paddingTop="37px"
      >
        <Text>우아한사이드프로젝트는</Text>
        <Text>2022년 10월 26일까지 진행됩니다.</Text>
        <Text color="mediumLightGray" fontSize="12px">
          과연 완성할 수 있을까요...?
        </Text>
      </Box>

      <Flex position="absolute" bottom="0" right="0" zIndex={-1}>
        <Image src={BannerImage} alt="banner" />
      </Flex>
    </Banner>
  );
}

export default WoowaBanner;
